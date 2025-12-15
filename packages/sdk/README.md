# 🛠️ Generated SDK (`@acme/sdk`)

**TypeScript, Axios, and TanStack Query** library automatically generated based on FastAPI's OpenAPI spec (`openapi.json`).
**Do not manually modify** this package. It is automatically overwritten via commands.

[🇰🇷 한국어 가이드 (Korean Guide)](./README_KO.md)

## 📦 Contents

- **`types.gen.ts`**: TypeScript interfaces exactly matching FastAPI's Pydantic models.
- **`client.gen.ts`**: Axios base client for API calls.
- **`sdk.gen.ts`**: Basic API call functions (Async).
- **`@tanstack/react-query.gen.ts`**: `queryOptions`, `mutationOptions`, `queryKey` functions for React Query.

## 🔄 How to Update

Whenever backend code is modified, run the following command to update the contents of this folder.

```bash
# Run from Project Root or inside this folder
pnpm gen
```

> **Warning**: The **backend server (`localhost:8000`) must be running** for this command to succeed.

## ⚙️ Configuration (`openapi-ts.config.ts`)

Configuration file defining how this SDK is generated.

```typescript
export default defineConfig({
  client: "@hey-api/client-axios", // Use Axios-based client
  input: "http://localhost:8000/openapi.json", // Backend spec URL
  output: "src", // Output location
  plugins: [
    "@tanstack/react-query", // Activate React Query plugin
    // ...
  ],
});
```

## 🐛 Troubleshooting

**Q. `Module not found` error occurs.**

> Generated files might be corrupted. Clear the `src/` folder and run `pnpm gen` again.

```bash
rm -rf packages/sdk/src/*
pnpm gen
```
