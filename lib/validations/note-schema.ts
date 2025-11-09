import { z } from "zod";

export const newNoteSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content cannot be empty" }),
});
