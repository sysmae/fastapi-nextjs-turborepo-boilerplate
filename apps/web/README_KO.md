# ⚛️ Next.js Frontend

타입 안전성이 보장된 **Next.js 16** 프론트엔드 애플리케이션입니다.
백엔드 API 호출을 위해 자동 생성된 **TanStack Query Hooks**를 사용합니다.

## 🛠️ 기술 스택 (Tech Stack)

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State/Fetching**: TanStack Query v5
- **Bundler**: Turbopack

## 📂 폴더 구조 (Structure)

```bash
apps/web/
├── src/
│   ├── app/            # 📁 App Router 페이지
│   │   ├── page.tsx    # 🏠 메인 페이지 (Demo)
│   │   ├── layout.tsx  # 🖼️ 레이아웃 (Providers 포함)
│   │   └── providers.tsx # 🧩 QueryClientProvider 설정
│   └── lib/            # 📚 공통 유틸리티
│       └── sdk.ts      # 🔌 SDK 클라이언트 설정 (BaseURL 등)
├── next.config.ts      # ⚙️ Next.js 설정
└── package.json
```

## 🚀 개발 가이드 (Development Guide)

### 1. API 통신 방법 (가장 중요! ⭐)

직접 `fetch`나 `axios`를 쓰지 않습니다. **`@acme/sdk/react-query`**에서 가져온 훅을 사용하세요.

```tsx
"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import {
  listUsersOptions, // GET 요청용 옵션
  createUserMutation, // POST 요청용 옵션
  listUsersQueryKey, // 캐시 무효화용 키 생성 함수
} from "@acme/sdk/react-query";

export default function UsersList() {
  // 1. 데이터 조회 (GET)
  const { data: users, isLoading } = useQuery(listUsersOptions());

  // 2. 데이터 수정 (POST/PUT/DELETE)
  const createMutation = useMutation({
    ...createUserMutation(),
    onSuccess: () => {
      // 3. 캐시 갱신 (자동 새로고침 효과)
      queryClient.invalidateQueries({ queryKey: listUsersQueryKey() });
    },
  });

  return (
    <div>
      {users?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### 2. 환경 변수 설정

`.env.local` 파일에서 API 주소를 설정할 수 있습니다. (기본값: `http://localhost:8000`)

### 3. 스타일링

Tailwind CSS를 사용합니다. `src/app/globals.css`에 전역 스타일이 정의되어 있습니다.

---

## 🧩 문제 해결 (Troubleshooting)

**Q. `@acme/sdk` 모듈을 찾을 수 없대요.**

> `pnpm install`을 다시 실행해보세요. 워크스페이스 심볼릭 링크가 깨졌을 수 있습니다.

**Q. 새로운 API를 만들었는데 프론트에서 안 보여요.**

> 1. 백엔드 서버가 켜져 있는지 확인
> 2. Root 경로에서 `pnpm gen` 명령어를 실행하여 SDK를 갱신했는지 확인
