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

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", user?.id],
    queryFn: fetchNotes,
  });

  const filteredNotes = useMemo(() => {
    const notes = data?.notes ?? [];
    if (notes.length === 0) return [];

    return notes.filter((note: Note) =>
      note.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const showEmpty = !isLoading && !isError && filteredNotes.length === 0;

  return (
    <div className="flex h-full flex-col gap-4">
      <NotesSearchBar value={search} onChange={setSearch} />

      <div className="relative flex-1 min-h-0 border rounded-md">
        <ScrollArea className="h-full w-full p-4">
          {isLoading && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <NoteCardSkeleton key={i} />
              ))}
            </div>
          )}

          {isError && (
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="font-medium text-muted-foreground">
                Failed to load notes
              </p>
              <p className="text-sm text-muted-foreground">
                {error instanceof Error
                  ? error.message
                  : "Unknown error occurred"}
              </p>
            </div>
          )}

          {showEmpty && (
            <div className="flex items-center justify-center text-muted-foreground">
              No notes found.
            </div>
          )}

          {!isLoading && !isError && filteredNotes.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredNotes.map((note: Note) => (
                <NoteCard
                  key={note.id}
                  {...note}
                  onClick={(id) => console.log("Clicked Note:", id)}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
