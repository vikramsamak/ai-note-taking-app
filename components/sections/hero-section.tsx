"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export  function HeroSection() {
  return (
    <section className="w-full py-28 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Organize your thoughts with{" "}
          <span className="text-primary">AI Notes</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Summarize and tag your notes automatically with AI — simple, fast, and
          smart.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/auth/signup">Get Started Free</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
