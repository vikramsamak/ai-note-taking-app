"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 wfull mx-auto">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          📝 AI Notes
        </Link>

        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/auth/signin">Sign In</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
