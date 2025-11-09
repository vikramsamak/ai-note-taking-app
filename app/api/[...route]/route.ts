import { auth } from "@/lib/better-auth";
import { db } from "@/lib/db";
import { notes } from "@/lib/db/schema";
import { User } from "better-auth/types";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { handle } from "hono/vercel";

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

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
