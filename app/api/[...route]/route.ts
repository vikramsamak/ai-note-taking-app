import { auth } from "@/lib/better-auth";
import { db } from "@/lib/db";
import { notes } from "@/lib/db/schema";
import { User } from "better-auth/types";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { z } from "zod";

type AppContext = {
  Variables: {
    user: User;
  };
};

const app = new Hono<AppContext>().basePath("/api");

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (session?.user) c.set("user", session.user);
  await next();
});

app.get("/notes", async (c) => {
  const user = c.get("user");

  if (!user) return c.json({ error: "Unauthorized" }, 401);

  try {
    const userNotes = await db
      .select()
      .from(notes)
      .where(eq(notes.userId, user.id));

    return c.json({ notes: userNotes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return c.json({ error: "Failed to fetch notes" }, 500);
  }
});

app.post("/notes", async (c) => {
  try {
    const user = c.get("user");

    if (!user) return c.json({ error: "Unauthorized" }, 401);

    const schema = z.object({
      title: z.string().min(1, "Title is required"),
      content: z.string().min(1, { message: "Content cannot be empty" }),
    });

    const body = await c.req.json();

    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return c.json(
        {
          error: "Validation failed",
          details: parsed.error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        },
        400
      );
    }

    const { title, content } = parsed.data;

    const newNote = await db
      .insert(notes)
      .values({
        title,
        content,
        userId: user.id,
      })
      .returning();

    return c.json(newNote[0]);
  } catch (error) {
    console.error("Error creating note:", error);
    return c.json({ error: "Failed to create note" }, 500);
  }
});

app.put("/notes/:id", async (c) => {
  try {
    const user = c.get("user");

    if (!user) return c.json({ error: "Unauthorized" }, 401);

    const { id } = c.req.param();

    if (!id) return c.json({ error: "Invalid note ID" }, 400);

    const body = await c.req.json();

    const schema = z.object({
      title: z.string().min(1, { message: "Title is required" }),
      content: z.string().min(1, { message: "Content cannot be empty" }),
      summary: z.string().optional(),
      tags: z.union([z.string(), z.array(z.string())]).optional(),
    });

    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return c.json(
        {
          error: "Validation failed",
          details: parsed.error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        },
        400
      );
    }

    const { title, content, summary, tags } = parsed.data;

    const updatedNote = await db
      .update(notes)
      .set({
        title,
        content,
        summary,
        tags: tags ? (Array.isArray(tags) ? tags : [tags]) : undefined,
      })
      .where(eq(notes.id, Number(id)))
      .returning();

    if (updatedNote.length === 0) {
      return c.json({ error: "Note not found or unauthorized" }, 404);
    }

    return c.json(updatedNote[0]);
  } catch (error) {
    console.error("Error updating note:", error);
    return c.json({ error: "Failed to update note" }, 500);
  }
});

app.patch("/notes/:id", async (c) => {
  try {
    const user = c.get("user");

    if (!user) return c.json({ error: "Unauthorized" }, 401);

    const { id } = c.req.param();

    if (!id) return c.json({ error: "Invalid note ID" }, 400);

    const body = await c.req.json();

    const schema = z.object({
      title: z.string().min(1, { message: "Title cannot be empty" }).optional(),
      content: z
        .string()
        .min(1, { message: "Content cannot be empty" })
        .optional(),
      summary: z.string().optional(),
      tags: z.union([z.string(), z.array(z.string())]).optional(),
    });

    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return c.json(
        {
          error: "Validation failed",
          details: parsed.error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        },
        400
      );
    }

    const updatedNote = await db
      .update(notes)
      .set({
        ...parsed.data,
        tags: parsed.data.tags
          ? Array.isArray(parsed.data.tags)
            ? parsed.data.tags
            : [parsed.data.tags]
          : undefined,
      })
      .where(eq(notes.id, Number(id)))
      .returning();

    if (updatedNote.length === 0) {
      return c.json({ error: "Note not found or unauthorized" }, 404);
    }

    return c.json(updatedNote[0]);
  } catch (error) {
    console.error("Error updating note:", error);
    return c.json({ error: "Failed to update note" }, 500);
  }
});

app.delete("/notes/:id", async (c) => {
  try {
    const user = c.get("user");

    if (!user) return c.json({ error: "Unauthorized" }, 401);
    const { id } = c.req.param();

    const deletedCount = await db
      .delete(notes)
      .where(eq(notes.id, Number(id)))
      .returning();

    if (deletedCount.length === 0) {
      return c.json({ error: "Note not found or unauthorized" }, 404);
    }

    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting note:", error);
    return c.json({ error: "Failed to delete note" }, 500);
  }
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
