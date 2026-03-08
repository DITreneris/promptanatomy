"""
Supabase access for user_access table. Used for upgrade MVP: highest_plan, upsert on webhook.
All email lookups/inserts use lowercased email for consistency.
"""
import logging
from typing import Any

from core.config import get_settings

logger = logging.getLogger(__name__)


def _client():
    """Return Supabase client or None if not configured."""
    s = get_settings()
    if not s.is_supabase_configured():
        return None
    try:
        from supabase import create_client
        return create_client(
            s.supabase_url,
            s.supabase_service_role_key.get_secret_value(),
        )
    except Exception as e:
        logger.warning("Supabase client init failed: %s", e)
        return None


def get_user_access(email: str) -> dict[str, Any] | None:
    """
    Get user_access row by email (lowercased). Returns dict with highest_plan (int), or None if not found.
    """
    client = _client()
    if not client:
        return None
    normalized = email.strip().lower()
    if not normalized:
        return None
    try:
        r = (
            client.table("user_access")
            .select("highest_plan, stripe_customer_id")
            .eq("email", normalized)
            .limit(1)
            .execute()
        )
        rows = r.data if isinstance(r.data, list) else ([r.data] if r.data else [])
        if rows and isinstance(rows[0], dict):
            row = rows[0]
            return {"highest_plan": row.get("highest_plan", 0), "stripe_customer_id": row.get("stripe_customer_id")}
        return None
    except Exception as e:
        logger.exception("get_user_access failed: %s", e)
        return None


def upsert_user_access(
    email: str,
    highest_plan: int,
    stripe_customer_id: str | None = None,
) -> bool:
    """
    Upsert user_access by email (lowercased). On conflict, set highest_plan and updated_at;
    stripe_customer_id updated only if provided.
    """
    client = _client()
    if not client:
        return False
    normalized = email.strip().lower()
    if not normalized:
        return False
    try:
        row: dict[str, Any] = {
            "email": normalized,
            "highest_plan": highest_plan,
        }
        if stripe_customer_id:
            row["stripe_customer_id"] = stripe_customer_id
        client.table("user_access").upsert(row, on_conflict="email").execute()
        return True
    except Exception as e:
        logger.exception("upsert_user_access failed: %s", e)
        return False
