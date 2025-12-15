# 🛠️ Generated SDK (`@acme/sdk`)

FastAPI의 OpenAPI 스펙(`openapi.json`)을 기반으로 자동 생성된 **TypeScript, Axios, TanStack Query** 라이브러리입니다.
이 패키지는 **수동으로 수정하지 마세요.** 명령어를 통해 자동으로 덮어씌워집니다.

## 📦 포함된 내용 (Contents)

- **`types.gen.ts`**: FastAPI의 Pydantic 모델과 정확히 일치하는 TypeScript 인터페이스
- **`client.gen.ts`**: API 호출을 위한 Axios 베이스 클라이언트
- **`sdk.gen.ts`**: 기본적인 API 호출 함수들 (비동기)
- **`@tanstack/react-query.gen.ts`**: 리액트 쿼리용 `queryOptions`, `mutationOptions`, `queryKey` 함수들

## 🔄 SDK 갱신 방법 (How to Update)

백엔드 코드가 수정될 때마다 다음 명령어를 실행하면 이 폴더의 내용이 갱신됩니다.

```bash
# 프로젝트 Root 또는 이 폴더 내부에서
pnpm gen
```

> **주의**: 이 명령어가 성공하려면 **백엔드 서버(`localhost:8000`)가 실행 중**이어야 합니다.

## ⚙️ 설정 (`openapi-ts.config.ts`)

이 SDK가 어떻게 생성될지 정의하는 설정 파일입니다.

```typescript
export default defineConfig({
  client: "@hey-api/client-axios", // Axios 기반 클라이언트 사용
  input: "http://localhost:8000/openapi.json", // 백엔드 스펙 주소
  output: "src", // 생성 위치
  plugins: [
    "@tanstack/react-query", // 리액트 쿼리 플러그인 활성화
    // ...
  ],
});
```

## 🐛 트러블슈팅

**Q. `Module not found` 에러가 발생해요.**

> 생성된 파일들이 꼬였을 수 있습니다. `src/` 폴더 내부를 깨끗이 비우고 다시 `pnpm gen`을 실행하세요.

```bash
rm -rf packages/sdk/src/*
pnpm gen
```
