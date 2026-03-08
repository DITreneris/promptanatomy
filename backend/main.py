"""
Minimal FastAPI backend for Promptų Anatomija home page.
- GET /health: health check for load balancers / monitoring.
- GET /api/success-redirect: return magic-link redirect URL for paid session (training app).
- POST /api/create-checkout-session: create Stripe Checkout Session, return URL.
- POST /api/webhooks/stripe: Stripe webhook (raw body, signature verification).
- POST /api/validate-token-limit: validate text against token limit (for future AI endpoints).
"""
import base64
import hashlib
import hmac
import json
import logging
import time
from contextlib import asynccontextmanager

import stripe
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Literal
from pydantic import BaseModel, EmailStr, Field, ValidationError
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from core.config import init_settings, get_settings
from limits import check_token_limit
from db import get_user_access, upsert_user_access

settings = init_settings()
if settings.stripe_secret_key:
    stripe.api_key = settings.stripe_secret_key.get_secret_value()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    if not settings.stripe_secret_key or not settings.has_any_plan_configured():
        logger.warning("STRIPE_SECRET_KEY or no STRIPE_PRICE_ID_PLAN_* set; checkout will fail")
    yield


app = FastAPI(title="Promptų Anatomija Home API", lifespan=lifespan)
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

origins = [
    o for o in (
        settings.frontend_origin_stripped(),
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    )
    if o
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)


@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    """Add security headers to all responses."""
    response = await call_next(request)
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    return response


class CreateCheckoutBody(BaseModel):
    plan_id: Literal["1", "2"] = Field(..., description="Pricing plan 1 or 2 (Phase 1: 1–3 mod / 1–6 mod)")
    customer_email: EmailStr | None = Field(default=None, max_length=254)


class ValidateTokenLimitBody(BaseModel):
    text: str = Field(default="", max_length=50_000)


class AccessQuery(BaseModel):
    """Query params for GET /api/access; email validated with EmailStr."""
    email: EmailStr


def _build_magic_link_token(access_tier: int, expires: int, secret: str) -> str:
    """Build HMAC-SHA256 token (base64url) for payload access_tier:expires."""
    payload = f"{access_tier}:{expires}"
    signature = hmac.new(
        secret.encode() if isinstance(secret, str) else secret,
        payload.encode(),
        hashlib.sha256,
    ).digest()
    token = base64.urlsafe_b64encode(signature).rstrip(b"=").replace(b"+", b"-").replace(b"/", b"_").decode()
    return token


@app.get("/health")
async def health():
    """Health check for load balancers and monitoring."""
    return {"status": "ok"}


@app.get("/api/success-redirect")
@limiter.limit("30/minute")
async def success_redirect(request: Request, session_id: str = ""):
    """
    Return redirect_url for magic-link to training app (access_tier, expires, token).
    Requires paid Stripe Checkout session; ACCESS_TOKEN_SECRET must be set.
    """
    if not settings.access_token_secret:
        raise HTTPException(status_code=503, detail="Redirect not configured")
    raw = (session_id or "").strip()
    if not raw:
        raise HTTPException(status_code=400, detail="session_id required")
    try:
        session = stripe.checkout.Session.retrieve(raw)
    except stripe.error.StripeError:
        logger.warning("Success-redirect: Stripe retrieve failed for session_id=%s", raw[:20])
        raise HTTPException(status_code=400, detail="Invalid or unpaid session")
    if session.get("payment_status") != "paid":
        raise HTTPException(status_code=400, detail="Invalid or unpaid session")
    metadata = session.get("metadata") or {}
    plan_str = metadata.get("plan")
    if not plan_str:
        raise HTTPException(status_code=400, detail="Invalid or unpaid session")
    try:
        access_tier = int(plan_str)
    except (TypeError, ValueError):
        raise HTTPException(status_code=400, detail="Invalid or unpaid session")
    if access_tier not in settings.PHASE1_PLAN_VALUES:
        raise HTTPException(status_code=400, detail="Invalid or unpaid session")
    expires = int(time.time()) + (settings.access_token_expiry_days * 86400)
    secret = settings.access_token_secret.get_secret_value()
    token = _build_magic_link_token(access_tier, expires, secret)
    base_url = settings.training_redirect_base.rstrip("/")
    redirect_url = f"{base_url}/?access_tier={access_tier}&expires={expires}&token={token}"
    return {"redirect_url": redirect_url}


@app.get("/api/access")
@limiter.limit("60/minute")
async def get_access(request: Request, email: str = ""):
    """
    Return access for the given email: highest_plan, allowed_modules, can_upgrade_to.
    Email required; if Supabase not configured returns 503.
    """
    raw = (email or "").strip()
    try:
        q = AccessQuery(email=raw)
        email = q.email
    except ValidationError:
        raise HTTPException(status_code=400, detail="Valid email required")
    if not settings.is_supabase_configured():
        raise HTTPException(status_code=503, detail="Access check not configured")
    access = get_user_access(email)
    highest_plan = (access["highest_plan"] if access else 0) or 0
    allowed_modules = list(range(1, highest_plan + 1)) if highest_plan > 0 else []
    # Phase 1: only offer upgrade to 3 or 6 (docs/phase-1-scope.md).
    can_upgrade_to = [p for p in settings.PHASE1_PLAN_VALUES if p > highest_plan]
    return {
        "highest_plan": highest_plan,
        "allowed_modules": allowed_modules,
        "can_upgrade_to": can_upgrade_to,
    }


@app.post("/api/validate-token-limit")
@limiter.limit("60/minute")
async def validate_token_limit(request: Request, body: ValidateTokenLimitBody):
    """
    Check if text is within token limit. Returns token count or 429 if exceeded.
    Use for testing or before calling future AI endpoints.
    """
    count = check_token_limit(body.text)
    return {"ok": True, "tokens": count}


@app.post("/api/create-checkout-session")
@limiter.limit("30/minute")
async def create_checkout_session(request: Request, body: CreateCheckoutBody):
    """Create a Stripe Checkout Session for one-time payment. Returns redirect URL."""
    if not settings.stripe_secret_key:
        raise HTTPException(status_code=503, detail="Checkout not configured")
    price_id = settings.get_price_id_for_plan(body.plan_id)
    if not price_id:
        raise HTTPException(status_code=400, detail=f"Plan {body.plan_id} not configured")
    plan_value = settings.plan_id_to_value(body.plan_id)
    if plan_value is None:
        raise HTTPException(status_code=400, detail=f"Invalid plan_id {body.plan_id}")

    if settings.is_supabase_configured() and body.customer_email:
        access = get_user_access(body.customer_email)
        current = (access["highest_plan"] if access else 0) or 0
        if current >= plan_value:
            raise HTTPException(
                status_code=409,
                detail="Already purchased this plan or higher",
            )

    try:
        session_params = {
            "mode": "payment",
            "line_items": [
                {
                    "price": price_id,
                    "quantity": 1,
                }
            ],
            "success_url": f"{settings.frontend_origin_stripped()}/success?session_id={{CHECKOUT_SESSION_ID}}",
            "cancel_url": f"{settings.frontend_origin_stripped()}/cancel",
            "customer_creation": "always",
            "metadata": {"plan": str(plan_value)},
        }
        if body.customer_email:
            session_params["customer_email"] = body.customer_email
            session_params["client_reference_id"] = body.customer_email
        session = stripe.checkout.Session.create(**session_params)
        return {"url": session.url}
    except stripe.error.StripeError:
        logger.exception("Stripe error creating checkout session")
        raise HTTPException(status_code=502, detail="Payment provider error")


def _get_email_from_session(session: dict) -> str | None:
    """Extract email from Stripe checkout session."""
    details = session.get("customer_details") or {}
    if details.get("email"):
        return details["email"]
    if session.get("customer_email"):
        return session["customer_email"]
    if session.get("client_reference_id"):
        return session["client_reference_id"]
    return None


def handle_checkout_completed(session: dict) -> None:
    """
    Process checkout.session.completed: upsert user_access in Supabase.
    Email from customer_details or client_reference_id; plan from metadata.plan.
    """
    logger.info(
        "Checkout completed: session_id=%s customer_email=%s",
        session.get("id"),
        session.get("customer_email"),
    )
    email = _get_email_from_session(session)
    if not email:
        logger.warning("Checkout completed but no email in session %s", session.get("id"))
        return
    metadata = session.get("metadata") or {}
    plan_str = metadata.get("plan")
    if not plan_str:
        logger.warning("Checkout completed but no metadata.plan in session %s", session.get("id"))
        return
    try:
        purchased_plan = int(plan_str)
    except (TypeError, ValueError):
        logger.warning("Invalid metadata.plan=%s in session %s", plan_str, session.get("id"))
        return
    if purchased_plan not in settings.PLAN_VALUES:
        logger.warning("Unknown plan value %s in session %s", purchased_plan, session.get("id"))
        return
    if not settings.is_supabase_configured():
        logger.info("Supabase not configured; skipping user_access upsert")
        return
    access = get_user_access(email)
    current = (access["highest_plan"] if access else 0) or 0
    new_highest = max(current, purchased_plan)
    stripe_customer_id = session.get("customer")
    if upsert_user_access(email, new_highest, stripe_customer_id):
        logger.info("user_access upserted: email=%s highest_plan=%s", email, new_highest)
    else:
        logger.warning("user_access upsert failed for email=%s", email)


@app.post("/api/webhooks/stripe")
async def stripe_webhook(request: Request):
    """Stripe webhook: raw body required for signature verification."""
    payload = await request.body()
    sig_header = request.headers.get("Stripe-Signature", "")
    webhook_secret = settings.stripe_webhook_secret.get_secret_value() if settings.stripe_webhook_secret else None

    if not webhook_secret:
        if settings.allow_webhook_without_secret:
            logger.warning(
                "STRIPE_WEBHOOK_SECRET not set; webhook verification skipped (dev only). "
                "Signature not verified – do not use in production."
            )
            try:
                event = json.loads(payload)
            except json.JSONDecodeError as e:
                logger.warning("Webhook dev: invalid JSON payload: %s", e)
                raise HTTPException(status_code=400, detail="Invalid payload")
            if event.get("type") == "checkout.session.completed":
                obj = event.get("data", {}).get("object")
                if obj:
                    handle_checkout_completed(obj)
                else:
                    logger.warning("Webhook dev: checkout.session.completed missing data.object")
            return {"received": True}
        raise HTTPException(status_code=503, detail="Webhook not configured")

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, webhook_secret)
    except ValueError as e:
        logger.warning("Webhook invalid payload: %s", e)
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.SignatureVerificationError as e:
        logger.warning("Webhook signature verification failed: %s", e)
        raise HTTPException(status_code=400, detail="Invalid signature")

    if event["type"] == "checkout.session.completed":
        handle_checkout_completed(event["data"]["object"])

    return {"received": True}
