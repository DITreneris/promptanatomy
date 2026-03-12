"""
Token limit utilities for API requests. Use for future AI/token-counted endpoints.
Config: max_tokens_per_request from core.config (Settings).
"""
from fastapi import HTTPException

from core.config import get_settings


def get_max_tokens_per_request() -> int:
    """Read max tokens from settings (Pydantic Settings, env MAX_TOKENS_PER_REQUEST)."""
    return get_settings().max_tokens_per_request


def estimate_tokens(text: str) -> int:
    """
    Estimate token count from text (no external deps).
    Heuristic: ~4 chars per token for English.
    """
    if not text or not text.strip():
        return 0
    return max(1, (len(text) + 3) // 4)


def check_token_limit(
    content: str,
    max_tokens: int | None = None,
) -> int:
    """
    Return estimated token count for content. If over max_tokens, raise HTTPException 429.
    Use in route handlers or before calling AI APIs.
    """
    if max_tokens is None:
        max_tokens = get_max_tokens_per_request()
    count = estimate_tokens(content)
    if count > max_tokens:
        raise HTTPException(
            status_code=429,
            detail=f"Token limit exceeded: {count} > {max_tokens}",
        )
    return count
