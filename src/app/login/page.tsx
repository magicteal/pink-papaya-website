"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      // Cancel any in-flight request when unmounting
      abortRef.current?.abort();
    };
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        signal: controller.signal,
      });

      // Try to parse JSON safely
      let data: any = null;
      try {
        data = await res.json();
      } catch {
        // Non-JSON response
      }

      if (!res.ok) {
        // Prefer server-provided error message, fallback to status text
        const msg =
          data?.error ?? data?.message ?? res.statusText ?? "Login failed";
        throw new Error(msg);
      }

      // If server returns a token, you may want to store it (cookie/HttpOnly cookie via server, or localStorage)
      // const token = data?.token;

      const next = params?.get("next") ?? "/admin/stays";
      // use replace so back button won't go back to login
      router.replace(next);
    } catch (err: any) {
      if (err?.name === "AbortError") {
        // request was aborted — ignore or set error if you want
        setError("Request cancelled");
      } else {
        setError(err?.message ?? "Login failed");
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-4 border rounded-lg p-6 shadow-sm bg-white"
        aria-busy={loading}
      >
        <div>
          <h1 className="text-2xl font-semibold">Admin Login</h1>
          <p className="text-sm text-gray-500">
            Use your credentials to access the admin panel.
          </p>
        </div>

        {error && (
          <div role="alert" className="text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            placeholder="admin"
            autoComplete="username"
            autoFocus
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white rounded py-2 disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
