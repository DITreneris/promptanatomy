"""API endpoint tests."""
from types import SimpleNamespace
from unittest.mock import patch

import pytest
from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


class TestCreateCheckoutSession:
    def test_invalid_customer_email_returns_422(self):
        """EmailStr validation: invalid format returns 422."""
        r = client.post(
            "/api/create-checkout-session",
            json={"plan_id": "2", "customer_email": "not-an-email"},
        )
        assert r.status_code == 422

    def test_missing_plan_id_returns_422(self):
        """Missing required plan_id returns 422."""
        r = client.post("/api/create-checkout-session", json={})
        assert r.status_code == 422

    def test_invalid_plan_id_returns_422(self):
        """plan_id must be '1','2','3','4'; '0' or '5' returns 422."""
        r = client.post("/api/create-checkout-session", json={"plan_id": "0"})
        assert r.status_code == 422
        r = client.post("/api/create-checkout-session", json={"plan_id": "5"})
        assert r.status_code == 422

    def test_checkout_not_configured_returns_503(self, monkeypatch):
        """When Stripe is not configured (no secret or no plan prices), returns 503."""
        monkeypatch.setattr(
            "main.settings",
            SimpleNamespace(
                stripe_secret_key=None,
                has_any_plan_configured=lambda: False,
                get_price_id_for_plan=lambda p: None,
            ),
        )
        r = client.post("/api/create-checkout-session", json={"plan_id": "2"})
        assert r.status_code == 503
        assert "not configured" in r.json().get("detail", "").lower()

    def test_plan_not_configured_returns_400(self, monkeypatch):
        """When the selected plan has no Price ID set, returns 400."""
        monkeypatch.setattr(
            "main.settings",
            SimpleNamespace(
                stripe_secret_key="sk_test_fake",
                frontend_origin_stripped=lambda: "http://localhost:5173",
                get_price_id_for_plan=lambda p: None,
                plan_id_to_value=lambda p: {"1": 3, "2": 6, "3": 12, "4": 15}.get(p),
                is_supabase_configured=lambda: False,
            ),
        )
        r = client.post("/api/create-checkout-session", json={"plan_id": "1"})
        assert r.status_code == 400
        assert "not configured" in r.json().get("detail", "").lower()

    def test_already_purchased_returns_409(self, monkeypatch):
        """When Supabase is configured and user already has plan >= requested, returns 409."""
        monkeypatch.setattr(
            "main.settings",
            SimpleNamespace(
                stripe_secret_key="sk_test_fake",
                frontend_origin_stripped=lambda: "http://localhost:5173",
                get_price_id_for_plan=lambda p: "price_xxx" if p else None,
                plan_id_to_value=lambda p: {"1": 3, "2": 6, "3": 12, "4": 15}.get(p),
                is_supabase_configured=lambda: True,
            ),
        )
        with patch("main.get_user_access", return_value={"highest_plan": 6, "stripe_customer_id": None}):
            r = client.post(
                "/api/create-checkout-session",
                json={"plan_id": "2", "customer_email": "user@example.com"},
            )
        assert r.status_code == 409
        assert "already" in r.json().get("detail", "").lower()


class TestGetAccess:
    def test_missing_email_returns_400(self):
        r = client.get("/api/access")
        assert r.status_code == 400
        assert "email" in r.json().get("detail", "").lower()

    def test_invalid_email_returns_400(self):
        r = client.get("/api/access?email=no-at-sign")
        assert r.status_code == 400

    def test_access_not_configured_returns_503(self, monkeypatch):
        monkeypatch.setattr("main.settings", SimpleNamespace(is_supabase_configured=lambda: False))
        r = client.get("/api/access?email=user@example.com")
        assert r.status_code == 503
        assert "not configured" in r.json().get("detail", "").lower()

    def test_returns_access_shape_when_configured(self, monkeypatch):
        monkeypatch.setattr("main.settings", SimpleNamespace(
            is_supabase_configured=lambda: True,
            PLAN_VALUES=(3, 6, 12, 15),
        ))
        with patch("main.get_user_access", return_value={"highest_plan": 6, "stripe_customer_id": None}):
            r = client.get("/api/access?email=user@example.com")
        assert r.status_code == 200
        data = r.json()
        assert data["highest_plan"] == 6
        assert data["allowed_modules"] == [1, 2, 3, 4, 5, 6]
        assert data["can_upgrade_to"] == [12, 15]

    def test_returns_empty_access_when_user_unknown(self, monkeypatch):
        monkeypatch.setattr("main.settings", SimpleNamespace(
            is_supabase_configured=lambda: True,
            PLAN_VALUES=(3, 6, 12, 15),
        ))
        with patch("main.get_user_access", return_value=None):
            r = client.get("/api/access?email=new@example.com")
        assert r.status_code == 200
        data = r.json()
        assert data["highest_plan"] == 0
        assert data["allowed_modules"] == []
        assert data["can_upgrade_to"] == [3, 6, 12, 15]


class TestHealth:
    def test_health_returns_200_and_ok(self):
        r = client.get("/health")
        assert r.status_code == 200
        assert r.json() == {"status": "ok"}


class TestValidateTokenLimit:
    def test_valid_text_returns_200_and_tokens(self):
        r = client.post("/api/validate-token-limit", json={"text": "short"})
        assert r.status_code == 200
        data = r.json()
        assert data["ok"] is True
        assert "tokens" in data
        assert data["tokens"] >= 1

    def test_empty_text_returns_200_zero_tokens(self):
        r = client.post("/api/validate-token-limit", json={"text": ""})
        assert r.status_code == 200
        assert r.json() == {"ok": True, "tokens": 0}

    def test_text_over_limit_returns_429(self, monkeypatch):
        # Lower limit so we don't send a huge body
        monkeypatch.setattr("limits.get_max_tokens_per_request", lambda: 2)
        r = client.post("/api/validate-token-limit", json={"text": "hello world enough to exceed two tokens"})
        assert r.status_code == 429
        assert "Token limit exceeded" in r.json().get("detail", "")

    def test_text_over_max_length_returns_422(self):
        """Body max length 50_000 chars; over returns 422."""
        r = client.post("/api/validate-token-limit", json={"text": "x" * 50_001})
        assert r.status_code == 422
