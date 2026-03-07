"""Unit tests for limits module."""
import pytest
from fastapi import HTTPException

from limits import (
    estimate_tokens,
    get_max_tokens_per_request,
    check_token_limit,
)


class TestEstimateTokens:
    def test_empty_string_returns_zero(self):
        assert estimate_tokens("") == 0
        assert estimate_tokens("   ") == 0

    def test_short_text_returns_at_least_one(self):
        assert estimate_tokens("a") == 1
        assert estimate_tokens("hello") == 2  # 5 chars -> (5+3)//4 = 2

    def test_heuristic_chars_per_token(self):
        # ~4 chars per token
        assert estimate_tokens("abcd") == 1
        assert estimate_tokens("abcdefgh") == 2


class TestGetMaxTokensPerRequest:
    def test_default_when_no_env(self):
        # conftest resets _settings; no MAX_TOKENS_PER_REQUEST set
        n = get_max_tokens_per_request()
        assert n >= 1
        assert n == 4096  # default from Settings

    def test_reads_from_env(self, monkeypatch):
        monkeypatch.setenv("MAX_TOKENS_PER_REQUEST", "100")
        import core.config as config_module
        config_module._settings = None  # force reload so env is read
        n = get_max_tokens_per_request()
        assert n == 100


class TestCheckTokenLimit:
    def test_under_limit_returns_count(self):
        count = check_token_limit("hello")
        assert count == estimate_tokens("hello")

    def test_at_limit_returns_count(self):
        count = check_token_limit("x" * 16, max_tokens=4)  # 16 chars -> 4 tokens
        assert count == 4

    def test_over_limit_raises_429(self):
        with pytest.raises(HTTPException) as exc_info:
            check_token_limit("x" * 20, max_tokens=2)
        assert exc_info.value.status_code == 429
        assert "Token limit exceeded" in exc_info.value.detail
