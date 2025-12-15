"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  listUsersOptions,
  createUserMutation,
  deleteUserMutation,
  listUsersQueryKey,
} from "@acme/sdk/react-query";
import type { User, UserCreate } from "@acme/sdk";

export default function Home() {
  const queryClient = useQueryClient();

  // TanStack Query hooks - generated from SDK!
  const { data: users = [], isLoading, error } = useQuery(listUsersOptions());

  const createMutation = useMutation({
    ...createUserMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: listUsersQueryKey() });
      setName("");
      setEmail("");
    },
  });

  const deleteMutation = useMutation({
    ...deleteUserMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: listUsersQueryKey() });
    },
  });

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newUser: UserCreate = {
      name,
      email,
      is_active: true,
      role: "user",
    };
    createMutation.mutate({ body: newUser });
  };

  const handleDeleteUser = (userId: number) => {
    deleteMutation.mutate({ path: { user_id: userId } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">
            Type-Safe Fullstack
          </h1>
          <p className="text-lg text-purple-200">
            FastAPI + Next.js + TanStack Query
          </p>
        </div>

        {/* Create User Form */}
        <div className="mb-8 rounded-2xl bg-white/10 p-6 backdrop-blur-lg">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Create New User
          </h2>
          <form onSubmit={handleCreateUser} className="flex gap-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 rounded-lg bg-white/20 px-4 py-3 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-lg bg-white/20 px-4 py-3 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="rounded-lg bg-purple-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-600 disabled:opacity-50"
            >
              {createMutation.isPending ? "Adding..." : "Add User"}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-500/20 p-4 text-red-200">
            {error.message}
          </div>
        )}

        {/* Users List */}
        <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-lg">
          <h2 className="mb-4 text-xl font-semibold text-white">Users</h2>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-400 border-t-transparent"></div>
            </div>
          ) : users.length === 0 ? (
            <p className="py-8 text-center text-white/60">No users found</p>
          ) : (
            <div className="space-y-3">
              {users.map((user: User) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between rounded-lg bg-white/10 p-4"
                >
                  <div>
                    <p className="font-medium text-white">{user.name}</p>
                    <p className="text-sm text-purple-200">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        user.is_active
                          ? "bg-green-500/20 text-green-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {user.is_active ? "Active" : "Inactive"}
                    </span>
                    <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-300">
                      {user.role}
                    </span>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      disabled={deleteMutation.isPending}
                      className="rounded-lg bg-red-500/20 p-2 text-red-300 transition-colors hover:bg-red-500/40 disabled:opacity-50"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-white/40">
          <p>
            Using{" "}
            <a
              href="https://tanstack.com/query"
              className="text-purple-400 hover:underline"
            >
              TanStack Query
            </a>{" "}
            with{" "}
            <a
              href="https://heyapi.dev/"
              className="text-purple-400 hover:underline"
            >
              hey-api
            </a>{" "}
            SDK
          </p>
        </div>
      </div>
    </div>
  );
}
