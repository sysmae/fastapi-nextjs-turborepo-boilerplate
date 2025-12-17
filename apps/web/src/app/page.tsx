"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  listTodosOptions,
  createTodoMutation,
  deleteTodoMutation,
  updateTodoMutation,
  listTodosQueryKey,
} from "@acme/sdk/react-query";
import type { Todo, TodoCreate, TodoUpdate } from "@acme/sdk";

export default function Home() {
  const queryClient = useQueryClient();

  // TanStack Query hooks
  const { data: todos = [], isLoading, error } = useQuery(listTodosOptions());

  const createMutation = useMutation({
    ...createTodoMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: listTodosQueryKey() });
      setTitle("");
    },
  });

  const updateMutation = useMutation({
    ...updateTodoMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: listTodosQueryKey() });
    },
  });

  const deleteMutation = useMutation({
    ...deleteTodoMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: listTodosQueryKey() });
    },
  });

  // Form state
  const [title, setTitle] = useState("");

  const handleCreateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newTodo: TodoCreate = {
      title,
      completed: false,
    };
    createMutation.mutate({ body: newTodo });
  };

  const handleToggleTodo = (todo: Todo) => {
    const updateData: TodoUpdate = {
      title: todo.title, // Required by some implementations or optional? Checking schema: title is optional in Update.
      // Actually the SDK might expect just the fields to update.
      // Let's check schema/todo.py: TodoUpdate has title | None, completed | bool | None.
      completed: !todo.completed,
    };
    updateMutation.mutate({
      path: { todo_id: todo.id! },
      body: updateData,
    });
  };

  const handleDeleteTodo = (todoId: number) => {
    deleteMutation.mutate({ path: { todo_id: todoId } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">
            FastAPI + Next.js Todo
          </h1>
          <p className="text-lg text-purple-200">
            Type-Safe Monorepo Boilerplate
          </p>
        </div>

        {/* Create Todo Form */}
        <div className="mb-8 rounded-2xl bg-white/10 p-6 backdrop-blur-lg">
          <form onSubmit={handleCreateTodo} className="flex gap-4">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 rounded-lg bg-white/20 px-4 py-3 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="rounded-lg bg-purple-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-600 disabled:opacity-50"
            >
              {createMutation.isPending ? "Adding..." : "Add"}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-500/20 p-4 text-red-200">
            {(error as Error).message || "An error occurred"}
          </div>
        )}

        {/* Todo List */}
        <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-lg">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Tasks ({todos.length})
          </h2>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-400 border-t-transparent"></div>
            </div>
          ) : todos.length === 0 ? (
            <p className="py-8 text-center text-white/60">
              No tasks yet. Add one above!
            </p>
          ) : (
            <div className="space-y-3">
              {todos.map((todo: Todo) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between rounded-lg bg-white/10 p-4 transition-all hover:bg-white/20"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleTodo(todo)}
                      className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors ${
                        todo.completed
                          ? "border-green-400 bg-green-400"
                          : "border-purple-300 hover:border-purple-200"
                      }`}
                    >
                      {todo.completed && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-slate-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                    <span
                      className={`text-lg transition-all ${
                        todo.completed
                          ? "text-white/40 line-through"
                          : "text-white"
                      }`}
                    >
                      {todo.title}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDeleteTodo(todo.id!)}
                    disabled={deleteMutation.isPending}
                    className="ml-4 rounded-lg p-2 text-white/40 hover:bg-red-500/20 hover:text-red-300 transition-colors"
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
