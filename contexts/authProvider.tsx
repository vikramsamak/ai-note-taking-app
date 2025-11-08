"use client";

import React, { createContext } from "react";
import { createAuthClient } from "better-auth/react";

const { signIn, signUp, signOut, useSession } = createAuthClient();

interface AuthContextValue {
  session: ReturnType<typeof useSession>["data"];
  signIn: typeof signIn;
  signUp: typeof signUp;
  signOut: typeof signOut;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  const value: AuthContextValue = {
    session,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
