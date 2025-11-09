"use client";

import React, { createContext, useEffect, useState, useCallback } from "react";
import { createAuthClient } from "better-auth/react";
import { useRouter } from "next/navigation";

const { signIn, signUp, signOut, useSession } = createAuthClient();

export type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
};

export type Session = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  expiresAt: Date;
  token: string;
  ipAddress?: string | null | undefined;
  userAgent?: string | null | undefined;
};

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  signIn: typeof signIn;
  signUp: typeof signUp;
  signOut: () => Promise<void>;
  isPending: boolean;
  isRefetching: boolean;
  error: unknown;
  refetch: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isPending, isRefetching, error, refetch } = useSession();
  const { push } = useRouter();

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("ai_notes_user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const [session, setSession] = useState<Session | null>(() => {
    if (typeof window !== "undefined") {
      const storedSession = localStorage.getItem("ai_notes_session");
      return storedSession ? JSON.parse(storedSession) : null;
    }
    return null;
  });

  useEffect(() => {
    if (data?.user && data?.session) {
      const storedUser = localStorage.getItem("ai_notes_user");
      const storedSession = localStorage.getItem("ai_notes_session");

      const currentUser = storedUser ? JSON.parse(storedUser) : null;
      const currentSession = storedSession ? JSON.parse(storedSession) : null;

      const userChanged =
        JSON.stringify(currentUser) !== JSON.stringify(data.user);
      const sessionChanged =
        JSON.stringify(currentSession) !== JSON.stringify(data.session);

      if (userChanged || sessionChanged) {
        setUser(data.user);
        setSession(data.session);
        localStorage.setItem("ai_notes_user", JSON.stringify(data.user));
        localStorage.setItem("ai_notes_session", JSON.stringify(data.session));
      }
    }
  }, [data?.user, data?.session]);

  const handleSignOut = useCallback(async () => {
    await signOut();
    localStorage.removeItem("ai_notes_user");
    localStorage.removeItem("ai_notes_session");
    setUser(null);
    setSession(null);
    push("/auth/signin");
  }, [push]);

  const value: AuthContextValue = {
    session,
    user,
    signIn,
    signUp,
    signOut: handleSignOut,
    isPending,
    isRefetching,
    error,
    refetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
