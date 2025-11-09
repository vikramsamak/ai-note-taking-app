"use client";

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
import { noteSchema } from "@/lib/validations/note-schema";
import { MinimalTiptap } from "@/components/ui/shadcn-io/minimal-tiptap";
import z from "zod";
import { UseFormReturn } from "react-hook-form";
import { ScrollArea } from "../ui/scroll-area";

interface NoteFormProps {
  form: UseFormReturn<z.infer<typeof noteSchema>>;
  onSubmit: (values: z.infer<typeof noteSchema>) => void;
  isLoading?: boolean;
  children?: React.ReactNode;
  defaultValues?: {
    title: string;
    content: string;
    summary?: string;
    tags?: string[];
  };
}

export function NoteForm({
  form,
  onSubmit,
  isLoading = false,
  children,
}: NoteFormProps) {
  return (
    <ScrollArea className="h-[70vh] p-2">
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

          {children}

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="disabled:cursor-not-allowed"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </ScrollArea>
  );
}
