"""
Configuration loader for backend settings.
"""

def load_config():
    """Load config from .env or config files."""
    return {
        'MODEL_PATH': None,
        'SERVER_PORT': 8765,
        'LOG_LEVEL': 'info',
    } 