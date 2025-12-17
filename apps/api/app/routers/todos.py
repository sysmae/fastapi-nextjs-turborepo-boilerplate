from typing import Annotated

from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select

from app.core.db import get_session
from app.schemas.todo import Todo, TodoCreate, TodoUpdate, Message

SessionDep = Annotated[Session, Depends(get_session)]

router = APIRouter(prefix="/todos", tags=["todos"])


@router.get("", response_model=list[Todo], operation_id="listTodos")
async def list_todos(session: SessionDep, skip: int = 0, limit: int = 100) -> list[Todo]:
    """Get all todos."""
    todos = session.exec(select(Todo).offset(skip).limit(limit)).all()
    return list(todos)


@router.get("/{todo_id}", response_model=Todo, operation_id="getTodo")
async def get_todo(todo_id: int, session: SessionDep) -> Todo:
    """Get a specific todo by ID."""
    todo = session.get(Todo, todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo


@router.post("", response_model=Todo, operation_id="createTodo", status_code=201)
async def create_todo(todo_data: TodoCreate, session: SessionDep) -> Todo:
    """Create a new todo."""
    todo = Todo.model_validate(todo_data)
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo


@router.patch("/{todo_id}", response_model=Todo, operation_id="updateTodo")
async def update_todo(todo_id: int, todo_data: TodoUpdate, session: SessionDep) -> Todo:
    """Update an existing todo."""
    todo = session.get(Todo, todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")

    update_data = todo_data.model_dump(exclude_unset=True)
    todo.sqlmodel_update(update_data)
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo


@router.delete("/{todo_id}", response_model=Message, operation_id="deleteTodo")
async def delete_todo(todo_id: int, session: SessionDep) -> Message:
    """Delete a todo."""
    todo = session.get(Todo, todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    session.delete(todo)
    session.commit()
    return Message(message=f"Todo {todo_id} deleted successfully")
