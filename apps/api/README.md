# 🐍 FastAPI Backend

FastAPI Backend configured with the latest **Modern Python** stack.
It uses **`uv`** and **`pyproject.toml`** instead of `pip` and `requirements.txt`, providing a pleasant development experience similar to Node.js.

[🇰🇷 한국어 가이드 (Korean Guide)](./README_KO.md)

## 🛠️ Tech Stack

- **Framework**: FastAPI
- **Language**: Python 3.12+
- **Database**: SQLite (SQLModel ORM)
- **Package Manager**: uv
- **Server**: Uvicorn (via `fastapi-cli`)

## 📂 Structure

```bash
apps/api/
├── app/
│   ├── core/           # ⚙️ Settings (DB, Config)
│   ├── routers/        # 🛣️ API Endpoints (Controllers)
│   ├── schemas/        # 📦 Data Models (DB Tables & Pydantic)
│   └── main.py         # 🏁 Entrypoint & Lifespan
├── database.db         # 🗄️ SQLite Database (Auto-generated)
├── pyproject.toml      # 📦 Dependencies and Project Config
└── uv.lock             # 🔒 Dependency Lock File
```

## 🚀 Development Guide

### 1. Run Server

Running `pnpm dev` at the Root starts it automatically, but if you want to work on the backend separately:

```bash
# In apps/api folder
uv run fastapi dev app/main.py
```

### 2. How to Add New APIs

1. **Define Model**: Add a new model (table) in `app/schemas/`.
2. **Create Router**: Create a new router file in `app/routers/` (e.g., `posts.py`).
3. **Register Router**: Add `app.include_router(...)` in `app/main.py`.
4. **Update SDK**: Run `pnpm gen` at Root to propagate changes to the frontend.

### 3. Database (SQLite)

- **Config**: `app/core/db.py`
- **Table Creation**: Automatically created at app startup via `lifespan` function in `app/main.py` (`create_db_and_tables`).
- **DB Reset**: To clear data, simply delete the `database.db` file and restart the server.

### 4. Package Management (`uv` cheatsheet)

| Task            | Command            | Description                            |
| --------------- | ------------------ | -------------------------------------- |
| Install Package | `uv add <name>`    | Same as `npm install`                  |
| Remove Package  | `uv remove <name>` | Same as `npm uninstall`                |
| Install All     | `uv sync`          | `npm install` (sync based on lockfile) |
| Run Script      | `uv run <command>` | Run command inside virtualenv          |

---

## ✅ Key Concepts

- **SQLModel**: Defines Pydantic models and SQLAlchemy tables in a single class. (Distinguished by `table=True` option)
- **Dependency Injection**: DB sessions are injected via `SessionDep`. (`auth` can be implemented similarly)
- **Auto Docs**: Access `/docs` (Swagger UI) or `/redoc` after starting the server to view documentation.
