# 🚀 FastAPI + Next.js Type-Safe Boilerplate

This is a **Type-Safe** full-stack monorepo boilerplate connecting **FastAPI (Backend)** and **Next.js (Frontend)**.
It is designed so that changes in the Backend are immediately reflected as **type errors** in the Frontend.

[🇰🇷 한국어 가이드 (Korean Guide)](./README_KO.md)

## ✨ Key Features

- **End-to-End Type Safety**

  - FastAPI Pydantic models are automatically converted to TypeScript types.
  - Frontend builds fail if API specs change, preventing runtime errors.

- **Modern Backend Stack**

  - **FastAPI**: High-performance Python web framework.
  - **uv**: Blazing fast Python package manager written in Rust (replacing pip).
  - **SQLModel**: Modern ORM combining Pydantic and SQLAlchemy.
  - **SQLite**: Zero-configuration file-based lightweight DB.

- **Powerful Frontend Stack**

  - **Next.js 16 (App Router)**: Latest React framework.
  - **TanStack Query v5**: Server state management and caching (using auto-generated hooks).
  - **Turbopack**: Fast development server HMR.
  - **Tailwind CSS**: Utility-first styling.

- **Optimized Monorepo**
  - **Turborepo**: Intelligent build system and task orchestration.
  - **pnpm**: High-efficiency package manager (utilizing Workspaces).

---

## 📂 Project Structure

```bash
.
├── apps/
│   ├── api/            # 🐍 FastAPI Backend (Port: 8000)
│   └── web/            # ⚛️ Next.js Frontend (Port: 3000)
├── packages/
│   └── sdk/            # 🛠️ Auto-generated TypeScript SDK (@acme/sdk)
├── turbo.json          # Turborepo configuration
└── package.json        # Root configuration
```

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js 20+
- Python 3.12+ (managed automatically by uv)
- pnpm (10.x recommended)

### 2. Install

```bash
# Install dependencies (Root, API, Web, SDK)
pnpm install
```

### 3. Run All

Run both Backend and Frontend concurrently.

```bash
pnpm dev
```

- **Web**: [http://localhost:3000](http://localhost:3000)
- **API**: [http://localhost:8000](http://localhost:8000)
- **API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🛠️ Development Workflow

Process for reflecting API changes in the Frontend:

1. **Backend Change**: Modify endpoints or models in `apps/api`.
2. **Keep Server Running**: The backend server must be running to read the OpenAPI spec.
3. **Regenerate SDK**:
   ```bash
   pnpm gen
   ```
4. **Auto-reflect in Frontend**: You can now immediately use the new types and hooks in `apps/web`.

---

## 📦 Dependency Management

### Backend (Python)

```bash
cd apps/api
uv add <package_name>  # e.g., uv add numpy
```

### Frontend (Node.js)

```bash
cd apps/web
pnpm add <package_name>  # e.g., pnpm add framer-motion
```

---

## 🐛 Troubleshooting

**Q. Port conflict occurs when running `pnpm dev`.**

> Existing processes might not have terminated correctly. Clean them up with the command below:

```bash
lsof -ti:3000,8000 | xargs kill -9
```

**Q. SDK generation (`pnpm gen`) fails.**

> Ensure the backend server (`http://localhost:8000`) is running. The SDK generator works by downloading the OpenAPI spec from the running server.
