"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/notes";
import { NoteCard } from "@/components/notes/NoteCard";
import { NoteCardSkeleton } from "@/components/notes/NoteCardSkeleton";
import { NotesSearchBar } from "@/components/notes/NotesSearchBar";
import { useMemo, useState } from "react";
import { Note } from "@/types";
import { useAuth } from "@/hooks";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function NotesPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");

  const {
    data: notes = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notes", user?.id],
    queryFn: fetchNotes,
  });

  const filteredNotes = useMemo(() => {
    return notes.filter((note: Note) =>
      note.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [notes, search]);

  const showEmpty = !isLoading && !isError && filteredNotes.length === 0;

  return (
    <div className="flex flex-col gap-6">
      <NotesSearchBar value={search} onChange={setSearch} />

      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <NoteCardSkeleton key={i} />
          ))}
        </div>
      )}

      {isError && (
        <div className="flex h-[60vh] flex-col items-center justify-center text-red-500">
          <p className="font-medium">Failed to load notes</p>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : "Unknown error occurred"}
          </p>
        </div>
      )}

      {showEmpty && (
        <div className="flex h-[60vh] items-center justify-center text-muted-foreground">
          No notes found.
        </div>
      )}

      {!isLoading && !isError && filteredNotes.length > 0 && (
        <ScrollArea className="flex-1 min-h-0 p-2 rounded-md border border-border">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNotes.map((note: Note) => (
              <NoteCard
                key={note.id}
                {...note}
                onClick={(id) => console.log("Clicked Note:", id)}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
