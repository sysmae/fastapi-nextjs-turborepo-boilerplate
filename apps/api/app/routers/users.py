from typing import Annotated

from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select

from app.core.db import get_session
from app.schemas.user import User, UserCreate, UserUpdate, Message

SessionDep = Annotated[Session, Depends(get_session)]

router = APIRouter(prefix="/users", tags=["users"])


@router.get("", response_model=list[User], operation_id="listUsers")
async def list_users(session: SessionDep, skip: int = 0, limit: int = 100) -> list[User]:
    """Get all users."""
    users = session.exec(select(User).offset(skip).limit(limit)).all()
    return list(users)


@router.get("/{user_id}", response_model=User, operation_id="getUser")
async def get_user(user_id: int, session: SessionDep) -> User:
    """Get a specific user by ID."""
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.post("", response_model=User, operation_id="createUser", status_code=201)
async def create_user(user_data: UserCreate, session: SessionDep) -> User:
    """Create a new user."""
    # Check if email exists
    statement = select(User).where(User.email == user_data.email)
    existing_user = session.exec(statement).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
        
    user = User.model_validate(user_data)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@router.patch("/{user_id}", response_model=User, operation_id="updateUser")
async def update_user(user_id: int, user_data: UserUpdate, session: SessionDep) -> User:
    """Update an existing user."""
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    update_data = user_data.model_dump(exclude_unset=True)
    user.sqlmodel_update(update_data)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@router.delete("/{user_id}", response_model=Message, operation_id="deleteUser")
async def delete_user(user_id: int, session: SessionDep) -> Message:
    """Delete a user."""
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    session.delete(user)
    session.commit()
    return Message(message=f"User {user_id} deleted successfully")
