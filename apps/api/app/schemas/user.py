from sqlmodel import SQLModel, Field
from enum import Enum
from pydantic import EmailStr, BaseModel


class UserRole(str, Enum):
    ADMIN = "admin"
    USER = "user"
    GUEST = "guest"


class UserBase(SQLModel):
    name: str = Field(index=True)
    email: str = Field(unique=True, index=True) # EmailStr causes issues with SQLModel sometimes, usually str is safer for DB
    is_active: bool = Field(default=True)
    role: UserRole = Field(default=UserRole.USER)


class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)


class UserCreate(UserBase):
    pass


class UserUpdate(SQLModel):
    name: str | None = None
    email: str | None = None
    is_active: bool | None = None
    role: UserRole | None = None


class Message(BaseModel):
    message: str
