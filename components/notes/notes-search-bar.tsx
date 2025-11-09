"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface NotesSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function NotesSearchBar({ value, onChange }: NotesSearchBarProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search notes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9"
      />
    </div>
  );
}
