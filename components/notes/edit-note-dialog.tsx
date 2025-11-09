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
import { AiActionsDropdown } from "./ai-actions-dropdown";
import { AiLoader } from "./ai-loader";
import { TagsEditor } from "./tags-editor";
import { Textarea } from "@/components/ui/textarea";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { noteSchema } from "@/lib/validations/note-schema";
import { ScrollArea } from "../ui/scroll-area";

interface EditNoteDialogProps {
  note: Note;
  children: React.ReactNode;
}

export function EditNoteDialog({ note, children }: EditNoteDialogProps) {
  const [open, setOpen] = useState(false);
  const [isAIPending, setIsAIPending] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof noteSchema>>({
    defaultValues: {
      title: note.title,
      content: note.content,
      summary: note.summary || "",
      tags: note.tags || [],
    },
  });

  const { mutate: saveNote, isPending: isSaving } = useMutation({
    mutationFn: async (values: z.infer<typeof noteSchema>) => {
      const payload: Partial<Note> = {
        title: values.title,
        content: values.content,
      };
      if (values.summary) payload.summary = values.summary;
      if (values.tags) payload.tags = values.tags;
      return updateNote(note.id, payload);
    },
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

  const handleAIActionSuccess = (
    task: "summary" | "tags" | "improve",
    data: string | string[]
  ) => {
    if (task === "summary") form.setValue("summary", data as string);
    if (task === "tags") form.setValue("tags", data as string[]);
    if (task === "improve") form.setValue("content", data as string);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <DialogTitle>Edit Note</DialogTitle>
            <DialogDescription>
              Modify your note below and save changes.
            </DialogDescription>
          </div>
          <AiActionsDropdown
            noteId={note.id}
            onActionSuccess={handleAIActionSuccess}
            isPending={isAIPending}
            setIsPending={setIsAIPending}
          />
        </DialogHeader>

        {isAIPending ? (
          <AiLoader label="Generating AI content..." />
        ) : (
          <NoteForm
            form={form}
            onSubmit={saveNote}
            isLoading={isSaving}
            defaultValues={{
              title: note.title,
              content: note.content,
              summary: note.summary || "",
              tags: note.tags || [],
            }}
          >
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="AI-generated summary will appear here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <TagsEditor
                      tags={field.value || []}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </NoteForm>
        )}
      </DialogContent>
    </Dialog>
  );
}
