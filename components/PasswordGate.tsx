"use client";

import { useState } from "react";
import { setStoredToken, type AuthGate } from "@/lib/auth";

type PasswordGateProps = {
  gate: AuthGate;
  onSuccess: () => void;
  title?: string;
  description?: string;
};

const DEFAULT_COPY: Record<AuthGate, { title: string; description: string }> = {
  personal: {
    title: "Access personal area",
    description: "Enter the password you were given to view this section.",
  },
  employer: {
    title: "Access employer area",
    description:
      "Enter the password to view my CV and professional background.",
  },
};

export function PasswordGate({
  gate,
  onSuccess,
  title,
  description,
}: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const displayTitle = title ?? DEFAULT_COPY[gate].title;
  const displayDescription = description ?? DEFAULT_COPY[gate].description;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, gate }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Invalid password");
        return;
      }
      if (data.token) {
        setStoredToken(data.token, gate);
        onSuccess();
      } else {
        setError("Invalid response");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-2xl font-bold text-foreground">{displayTitle}</h1>
      <p className="mt-2 text-foreground-muted">{displayDescription}</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            autoComplete="current-password"
            className="w-full rounded-lg border border-white/20 bg-background-section px-4 py-3 text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
            disabled={loading}
          />
        </div>
        {error && (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-accent px-4 py-3 font-medium text-white transition-colors hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50"
        >
          {loading ? "Checking…" : "Unlock"}
        </button>
      </form>
    </div>
  );
}
