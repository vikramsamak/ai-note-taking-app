"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FloatingActionButton } from "../dashboard/floating-action-button";
import { NoteForm } from "./note-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { Note } from "@/types";
import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { noteSchema } from "@/lib/validations/note-schema";

export function NewNoteDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof noteSchema>>({
    defaultValues: {
      title: "",
      content: "",
      summary: "",
      tags: [],
    },
  });

  const { mutate, isPending } = useMutation<
    Note | undefined,
    Error,
    z.infer<typeof noteSchema>
  >({
    mutationFn: async ({ title, content, summary, tags }) =>
      createNote({ title, content, summary, tags }),
    onSuccess: () => {
      setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
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
        <NoteForm
          form={form}
          onSubmit={(values) => mutate(values)}
          isLoading={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
