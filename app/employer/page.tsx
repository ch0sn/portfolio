"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getStoredToken,
  isTokenValid,
} from "@/lib/auth";
import { PasswordGate } from "@/components/PasswordGate";
import { EmployerContent } from "@/components/EmployerContent";

export default function EmployerPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  const checkAuth = useCallback(() => {
    const token = getStoredToken("employer");
    if (token && isTokenValid(token, "employer")) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (authenticated === null) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-foreground-muted">Loading…</p>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <PasswordGate gate="employer" onSuccess={checkAuth} />
    );
  }

  return <EmployerContent gate="employer" onLogout={checkAuth} />;
}
