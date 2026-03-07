"""
Pytest configuration. Resets config singleton so tests can override env.
"""
import pytest

# Reset core.config singleton before each test so env overrides take effect
@pytest.fixture(autouse=True)
def reset_settings(monkeypatch):
    import core.config as config_module
    monkeypatch.setattr(config_module, "_settings", None)
