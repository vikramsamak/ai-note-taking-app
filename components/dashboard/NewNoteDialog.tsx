"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FloatingActionButton } from "./FloatingActionButton";
import { NewNoteForm } from "./NewNoteForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { Note } from "@/types";
import { toast } from "sonner";

export function NewNoteDialog() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<
    Note | undefined,
    Error,
    { title: string; content: string }
  >({
    mutationFn: ({ title, content }) => createNote({ title, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("notes"),
      });
      toast.success("Note created successfully!");
    },
    onError: () => {
      toast.error("Failed to create note. Please try again.");
    },
  });

  return (
    <Dialog>
      <DialogTrigger>
        <FloatingActionButton />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Note</DialogTitle>
          <DialogDescription>
            Fill in the details to create your note.
          </DialogDescription>
        </DialogHeader>
        <NewNoteForm
          onSubmit={(values) => mutate(values)}
          isLoading={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
