import { z } from "zod";

export const newNoteSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z
    .any()
    .refine((val) => val !== null && typeof val === "object", {
      message: "Invalid content.",
    }),
});
