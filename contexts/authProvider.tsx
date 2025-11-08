"use client";

import React, { createContext, useContext } from "react";
import { createAuthClient } from "better-auth/react";

const { signIn, signUp, signOut, useSession } = createAuthClient();

interface AuthContextValue {
  session: ReturnType<typeof useSession>["data"];
  signIn: typeof signIn;
  signUp: typeof signUp;
  signOut: typeof signOut;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

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

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth() must be used within an <AuthProvider>");
  }
  return context;
}
