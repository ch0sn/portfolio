"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getStoredToken,
  isTokenValid,
} from "@/lib/auth";
import { PasswordGate } from "@/components/PasswordGate";
import { PersonalContent } from "@/components/PersonalContent";

export default function PersonalPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  const checkAuth = useCallback(() => {
    const token = getStoredToken("personal");
    if (token && isTokenValid(token, "personal")) {
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
      <PasswordGate gate="personal" onSuccess={checkAuth} />
    );
  }

  return <PersonalContent gate="personal" onLogout={checkAuth} />;
}
