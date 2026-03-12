"""
Application settings via Pydantic Settings. All config from env / .env.
Secrets use SecretStr so they are not logged or displayed.
"""
from typing import ClassVar

from pydantic import Field, SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    stripe_secret_key: SecretStr | None = Field(default=None, description="Stripe secret API key")
    stripe_webhook_secret: SecretStr | None = Field(default=None, description="Stripe webhook signing secret (whsec_...)")
    stripe_price_id_plan_1: str | None = Field(default=None, description="Stripe Price ID for plan 1 (1–3 mod, 39 EUR)")
    stripe_price_id_plan_2: str | None = Field(default=None, description="Stripe Price ID for plan 2 (1–6 mod, 99 EUR)")
    stripe_price_id_plan_3: str | None = Field(default=None, description="Stripe Price ID for plan 3 (1–12 mod, 149 EUR)")
    stripe_price_id_plan_4: str | None = Field(default=None, description="Stripe Price ID for plan 4 (1–15 mod, 199 EUR)")
    frontend_origin: str = Field(
        default="http://localhost:5173",
        description="Frontend URL for CORS and redirects (no trailing slash)",
    )
    max_tokens_per_request: int = Field(
        default=4096,
        ge=1,
        description="Max tokens per request for token-limited endpoints",
    )
    allow_webhook_without_secret: bool = Field(
        default=False,
        description="If True, webhook accepts requests without STRIPE_WEBHOOK_SECRET (dev only)",
    )
    supabase_url: str | None = Field(default=None, description="Supabase project URL")
    supabase_service_role_key: SecretStr | None = Field(
        default=None,
        description="Supabase service role key (server-side only)",
    )
    access_token_secret: SecretStr | None = Field(
        default=None,
        description="Shared secret for magic-link token (HMAC); same value in training app env",
    )
    training_redirect_base: str = Field(
        default="https://www.promptanatomy.app/anatomija",
        description="Base URL to redirect to after payment (no trailing slash); training app",
    )
    access_token_expiry_days: int = Field(
        default=30,
        ge=1,
        description="Days until magic-link expires (from now)",
    )

    PLAN_VALUES: ClassVar[tuple[int, ...]] = (3, 6, 12, 15)
    PHASE1_PLAN_IDS: ClassVar[tuple[str, ...]] = ("1", "2")
    PHASE1_PLAN_VALUES: ClassVar[tuple[int, ...]] = (3, 6)
    PLAN_ID_TO_VALUE: ClassVar[dict[str, int]] = {"1": 3, "2": 6, "3": 12, "4": 15}

    def frontend_origin_stripped(self) -> str:
        return self.frontend_origin.rstrip("/")

    def get_price_id_for_plan(self, plan_id: str) -> str | None:
        """Return Stripe Price ID for plan_id '1'..'4', or None if not configured."""
        return getattr(self, f"stripe_price_id_plan_{plan_id}", None)

    def has_any_plan_configured(self) -> bool:
        """True if at least one plan has a Stripe Price ID set."""
        return any(
            self.get_price_id_for_plan(p) for p in ("1", "2", "3", "4")
        )

    def plan_id_to_value(self, plan_id: str) -> int | None:
        """Return plan_value (3,6,12,15) for plan_id '1'..'4', or None."""
        return self.PLAN_ID_TO_VALUE.get(plan_id)

    def is_supabase_configured(self) -> bool:
        """True if Supabase URL and key are set (access check and webhook upsert enabled)."""
        return bool(self.supabase_url and self.supabase_service_role_key)


_settings: Settings | None = None


def get_settings() -> Settings:
    """Return application settings singleton (lazy-init)."""
    global _settings
    if _settings is None:
        _settings = Settings()
    return _settings


def init_settings() -> Settings:
    """Ensure settings are loaded (e.g. at app startup)."""
    return get_settings()
