# 🚀 FastAPI + Next.js Type-Safe Boilerplate

이 프로젝트는 **FastAPI (Backend)**와 **Next.js (Frontend)**를 **Type-Safe**하게 연결한 풀스택 모노레포 보일러플레이트입니다.
Backend의 변경사항이 Frontend에 **타입 에러**로 즉시 반영되도록 설계되어 있습니다.

## ✨ 주요 기능 (Key Features)

- **완벽한 타입 안전성 (End-to-End Type Safety)**

  - FastAPI의 Pydantic 모델이 TypeScript 타입으로 자동 변환됩니다.
  - API 스펙 변경 시 프론트엔드 빌드가 실패하여 런타임 에러를 방지합니다.

- **모던 백엔드 스택 (Modern Backend Stack)**

  - **FastAPI**: 초고속 Python 웹 프레임워크
  - **uv**: Rust로 작성된 초고속 Python 패키지 매니저 (pip 대체)
  - **SQLModel**: Pydantic과 SQLAlchemy가 결합된 최신 ORM
  - **SQLite**: 설정이 필요 없는 파일 기반 경량 DB

- **강력한 프론트엔드 스택 (Powerful Frontend Stack)**

  - **Next.js 16 (App Router)**: 최신 React 프레임워크
  - **TanStack Query v5**: 서버 상태 관리 및 캐싱 (자동생성된 훅 사용)
  - **Turbopack**: 초고속 개발 서버 HMR
  - **Tailwind CSS**: 유틸리티 퍼스트 스타일링

- **효율적인 모노레포 (Optimized Monorepo)**
  - **Turborepo**: 지능형 빌드 시스템 및 태스크 오케스트레이션
  - **pnpm**: 고효율 패키지 매니저 (Workspace 기능 활용)

---

## � 프로젝트 구조 (Project Structure)

```bash
.
├── apps/
│   ├── api/            # 🐍 FastAPI 백엔드 (Port: 8000)
│   └── web/            # ⚛️ Next.js 프론트엔드 (Port: 3000)
├── packages/
│   └── sdk/            # 🛠️ 자동 생성된 TypeScript SDK (@acme/sdk)
├── turbo.json          # Turborepo 설정
└── package.json        # Root 설정
```

---

## � 시작하기 (Getting Started)

### 1. 필수 요구사항

- Node.js 20+
- Python 3.12+ (uv가 자동으로 설치 관리해줍니다)
- pnpm (10.x 권장)

### 2. 설치 (Install)

```bash
# 의존성 설치 (Root, API, Web, SDK 모두 포함)
pnpm install
```

### 3. 동시 실행 (Run All)

백엔드와 프론트엔드를 동시에 실행합니다.

```bash
pnpm dev
```

- **Web**: [http://localhost:3000](http://localhost:3000)
- **API**: [http://localhost:8000](http://localhost:8000)
- **API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🛠️ 개발 워크플로우 (Development Flow)

API가 변경되었을 때 프론트엔드에 반영하는 과정입니다.

1. **백엔드 변경**: `apps/api`에서 엔드포인트나 모델 수정
2. **서버 실행 중 유지**: 백엔드 서버가 켜져 있어야 OpenAPI 스펙을 읽을 수 있습니다.
3. **SDK 재생성**:
   ```bash
   pnpm gen
   ```
4. **프론트엔드 자동 반영**: 이제 `apps/web`에서 새로운 타입과 훅을 즉시 사용할 수 있습니다.

---

## � 패키지 추가 (Dependency Management)

### Backend (Python)

```bash
cd apps/api
uv add <패키지명>  # 예: uv add numpy
```

### Frontend (Node.js)

```bash
cd apps/web
pnpm add <패키지명>  # 예: pnpm add framer-motion
```

---

## 🐛 문제 해결 (Troubleshooting)

**Q. `pnpm dev` 실행 시 포트 충돌이 발생해요.**

> 기존에 실행 중인 프로세스가 제대로 종료되지 않았을 수 있습니다. 아래 명령어로 정리하세요.

```bash
lsof -ti:3000,8000 | xargs kill -9
```

**Q. SDK 생성(`pnpm gen`)이 안 돼요.**

> 백엔드 서버(`http://localhost:8000`)가 켜져 있는지 확인하세요. SDK 생성기는 실행 중인 서버의 OpenAPI 스펙을 다운로드 받아 작동합니다.
