"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SerializedEditorState } from "lexical";
import { Editor } from "@/components/blocks/editor-00/editor";
import { newNoteSchema } from "@/lib/validations/note-schema";
import z from "zod";

interface NewNoteFormProps {
  onSubmit: (values: z.infer<typeof newNoteSchema>) => void;
  isLoading?: boolean;
}

export function NewNoteForm({ onSubmit, isLoading = false }: NewNoteFormProps) {
  const form = useForm({
    resolver: zodResolver(newNoteSchema),
    defaultValues: {
      title: "",
      content: null,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(values))}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter note title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Editor
                  editorSerializedState={field.value as SerializedEditorState}
                  onSerializedChange={
                    field.onChange as (value: SerializedEditorState) => void
                  }
                  
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading}
            className="disabled:cursor-not-allowed"
          >
            Create Note
          </Button>
        </div>
      </form>
    </Form>
  );
}
