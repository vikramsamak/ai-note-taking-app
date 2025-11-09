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
import { newNoteSchema } from "@/lib/validations/note-schema";
import { MinimalTiptap } from "@/components/ui/shadcn-io/minimal-tiptap";
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
      content: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(values))}
        className="space-y-6 w-full"
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
                <MinimalTiptap
                  content={field.value as string}
                  onChange={field.onChange as (content: string) => void}
                  placeholder="Start typing your content here..."
                  className="min-h-[400px]"
                  editable={!isLoading}
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
