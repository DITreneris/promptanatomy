"""
Minimal FastAPI backend for Promptų Anatomija home page.
- GET /health: health check for load balancers / monitoring.
- POST /api/create-checkout-session: create Stripe Checkout Session, return URL.
- POST /api/webhooks/stripe: Stripe webhook (raw body, signature verification).
- POST /api/validate-token-limit: validate text against token limit (for future AI endpoints).
"""
import logging
from contextlib import asynccontextmanager

import stripe
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Literal
from pydantic import BaseModel, EmailStr, Field
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from core.config import init_settings, get_settings
from limits import check_token_limit

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
    settings.frontend_origin_stripped(),
    "http://localhost:5173",
    "http://127.0.0.1:5173",
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
    plan_id: Literal["1", "2", "3", "4"] = Field(..., description="Pricing plan 1–4 (1–3 mod / 1–6 / 1–12 / 1–15)")
    customer_email: EmailStr | None = Field(default=None, max_length=254)


class ValidateTokenLimitBody(BaseModel):
    text: str = Field(default="", max_length=50_000)


@app.get("/health")
async def health():
    """Health check for load balancers and monitoring."""
    return {"status": "ok"}


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
        }
        if body.customer_email:
            session_params["customer_email"] = body.customer_email
        session = stripe.checkout.Session.create(**session_params)
        return {"url": session.url}
    except stripe.error.StripeError:
        logger.exception("Stripe error creating checkout session")
        raise HTTPException(status_code=502, detail="Payment provider error")


def handle_checkout_completed(session: dict) -> None:
    """
    Process checkout.session.completed webhook event.
    Stub: log and prepare for future DB/email (Supabase, etc.).
    """
    logger.info(
        "Checkout completed: session_id=%s customer_email=%s",
        session.get("id"),
        session.get("customer_email"),
    )
    # TODO: create entitlement, send email, update DB


@app.post("/api/webhooks/stripe")
async def stripe_webhook(request: Request):
    """Stripe webhook: raw body required for signature verification."""
    payload = await request.body()
    sig_header = request.headers.get("Stripe-Signature", "")
    webhook_secret = settings.stripe_webhook_secret.get_secret_value() if settings.stripe_webhook_secret else None

    if not webhook_secret:
        if settings.allow_webhook_without_secret:
            logger.warning("STRIPE_WEBHOOK_SECRET not set; webhook verification skipped (dev)")
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
