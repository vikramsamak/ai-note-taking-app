"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { NoteForm } from "../dashboard";
import { Note } from "@/types";
import { updateNote } from "@/lib/api";

interface EditNoteDialogProps {
  note: Note;
  children: React.ReactNode;
}

export function EditNoteDialog({ note, children }: EditNoteDialogProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: { title: string; content: string }) =>
      updateNote(note.id, values),
    onSuccess: () => {
      toast.success("Note updated successfully!");
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("notes"),
      });
      setOpen(false);
    },
    onError: () => {
      toast.error("Failed to update note.");
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>
          <DialogDescription>
            Modify your note below and save changes.
          </DialogDescription>
        </DialogHeader>

        <NoteForm
          onSubmit={(values) => mutate(values)}
          isLoading={isPending}
          defaultValues={{
            title: note.title,
            content: note.content,
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
