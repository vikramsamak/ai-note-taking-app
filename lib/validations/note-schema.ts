import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content cannot be empty" }),
  summary: z.string().optional(),
  tags: z.array(z.string()).optional(),
});
