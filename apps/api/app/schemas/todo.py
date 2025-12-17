from sqlmodel import SQLModel, Field
from pydantic import BaseModel


class TodoBase(SQLModel):
    title: str = Field(index=True)
    completed: bool = Field(default=False)


class Todo(TodoBase, table=True):
    id: int | None = Field(default=None, primary_key=True)


class TodoCreate(TodoBase):
    pass


class TodoUpdate(SQLModel):
    title: str | None = None
    completed: bool | None = None


class Message(BaseModel):
    message: str
