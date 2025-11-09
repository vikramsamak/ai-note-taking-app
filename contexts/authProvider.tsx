"use client";

import React, { createContext } from "react";
import { createAuthClient } from "better-auth/react";

const { signIn, signUp, signOut, useSession } = createAuthClient();

interface AuthContextValue {
  session: NonNullable<ReturnType<typeof useSession>["data"]>["session"] | null;
  user: NonNullable<ReturnType<typeof useSession>["data"]>["user"] | null;
  signIn: typeof signIn;
  signUp: typeof signUp;
  signOut: typeof signOut;
  isPending: ReturnType<typeof useSession>["isPending"];
  isRefetching: ReturnType<typeof useSession>["isRefetching"];
  error: ReturnType<typeof useSession>["error"];
  refetch: ReturnType<typeof useSession>["refetch"];
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isPending, isRefetching, error, refetch } = useSession();

  const value: AuthContextValue = {
    session: data?.session || null,
    user: data?.user || null,
    signIn,
    signUp,
    isPending,
    isRefetching,
    error,
    refetch,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
