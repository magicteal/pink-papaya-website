"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginInner() {
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
      const redirect = params.get("redirect") || "/";

      // ⚡ keep your existing login logic here
      // (API call, validation, etc.)

      router.push(redirect);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    // ⚡ your existing design stays untouched below
    <form onSubmit={onSubmit}>
      {/* keep all your inputs, buttons, styling exactly as in your original */}
    </form>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading login...</div>}>
      <LoginInner />
    </Suspense>
  );
}
