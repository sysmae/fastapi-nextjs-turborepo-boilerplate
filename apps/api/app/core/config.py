from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings with environment variable support."""
    
    # App
    app_name: str = "FastAPI Backend"
    debug: bool = False
    
    # CORS
    cors_origins: list[str] = ["http://localhost:3000"]
    
    # API
    api_v1_prefix: str = "/api/v1"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache
def get_settings() -> Settings:
    """Cached settings instance."""
    return Settings()
