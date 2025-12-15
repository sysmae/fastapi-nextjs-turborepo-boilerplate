# ⚛️ Next.js Frontend

Type-safe **Next.js 16** frontend application.
It uses automatically generated **TanStack Query Hooks** for backend API calls.

[🇰🇷 한국어 가이드 (Korean Guide)](./README_KO.md)

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State/Fetching**: TanStack Query v5
- **Bundler**: Turbopack

## 📂 Structure

```bash
apps/web/
├── src/
│   ├── app/            # 📁 App Router Pages
│   │   ├── page.tsx    # 🏠 Main Page (Demo)
│   │   ├── layout.tsx  # 🖼️ Layout (Includes Providers)
│   │   └── providers.tsx # 🧩 QueryClientProvider Setup
│   └── lib/            # 📚 Common Utilities
│       └── sdk.ts      # 🔌 SDK Client Config (BaseURL etc.)
├── next.config.ts      # ⚙️ Next.js Config
└── package.json
```

## 🚀 Development Guide

### 1. How to Communicate with API (Most Important! ⭐)

Do not use `fetch` or `axios` directly. Use hooks from **`@acme/sdk/react-query`**.

```tsx
"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import {
  listUsersOptions, // Options for GET request
  createUserMutation, // Options for POST request
  listUsersQueryKey, // Key generation function for cache invalidation
} from "@acme/sdk/react-query";

export default function UsersList() {
  // 1. Fetch Data (GET)
  const { data: users, isLoading } = useQuery(listUsersOptions());

  // 2. Modify Data (POST/PUT/DELETE)
  const createMutation = useMutation({
    ...createUserMutation(),
    onSuccess: () => {
      // 3. Refresh Cache (Auto-refresh effect)
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

### 2. Environment Variables

You can configure the API address in `.env.local`. (Default: `http://localhost:8000`)

### 3. Styling

Uses Tailwind CSS. Global styles are defined in `src/app/globals.css`.

---

## 🧩 Troubleshooting

**Q. Cannot find `@acme/sdk` module.**

> Try running `pnpm install` again. Workspace symlinks might be broken.

**Q. Created a new API but can't see it in frontend.**

> 1. Check if the backend server is running.
> 2. Check if you ran `pnpm gen` command in the Root path to update the SDK.
