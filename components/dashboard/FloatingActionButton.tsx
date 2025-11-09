"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function FloatingActionButton() {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        size="icon"
        className="rounded-full h-10 w-10 shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
}
