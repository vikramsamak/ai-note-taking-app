"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Sheet, SheetTrigger, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left: Logo */}
        <Link href="/" className="text-lg font-semibold tracking-tight">
          📝 AI Notes
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="#features" className="hover:text-primary">Features</Link>
          <Link href="#contact" className="hover:text-primary">Contact</Link>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button asChild variant="outline" size="sm">
            <Link href="/auth/signin">Sign In</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/auth/signup">Get Started</Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-60 p-4">
              <SheetHeader className="mb-4 text-lg font-semibold">AI Notes</SheetHeader>
              <nav className="flex flex-col gap-3 text-sm font-medium">
                <Link href="#features">Features</Link>
                <Link href="#contact">Contact</Link>
                <Link href="/auth/signin" className="text-primary mt-3">Sign In</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
