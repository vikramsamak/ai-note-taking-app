import "./globals.css";
import { ThemeProvider } from "@/contexts/themeProvider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Notes – Smart Note-Taking with Gemini AI",
  description: "Simplify your ideas with AI-powered summaries and tags.",
  keywords: ["AI Notes", "Gemini AI", "Note-taking", "Next.js", "shadcn"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}