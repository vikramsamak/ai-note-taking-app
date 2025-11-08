"use client";

import { useAuth } from "@/hooks";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = useAuth();

  if (!session) {
    redirect("/auth/signin");
  }

  return <section>{children}</section>;
}
