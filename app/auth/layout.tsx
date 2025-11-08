// app/auth/layout.tsx
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative px-4">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* App Title */}
      <div className="flex flex-col items-center space-y-2 mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">📝 AI Notes</h1>
        <p className="text-sm text-muted-foreground">
          Smart note-taking powered by AI ✨
        </p>
      </div>

      {/* Form Card (injected via children) */}
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
