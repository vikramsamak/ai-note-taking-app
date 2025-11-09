"use server";

import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { notes } from "@/lib/db/schema";
import { geminiAIClient } from "./index";

type TaskType = "summary" | "tags" | "improve";

export async function analyzeNote(task: TaskType, noteId: string) {
  try {
    const [note] = await db
      .select()
      .from(notes)
      .where(eq(notes.id, Number(noteId)));

    if (!note) {
      throw new Error("Note not found");
    }

    const content =
      typeof note.content === "string"
        ? note.content
        : JSON.stringify(note.content);

    const systemPrompt = `
        You are Gemini AI integrated inside an AI Note-Taking App.
        Your role is to help users manage their notes by performing one of the following tasks:
        1. Generate a concise and meaningful summary of their note.
        2. Suggest 3–7 short and relevant hashtags (tags).
        3. Improve the clarity, readability, and flow of the note content.

        Please output only plain text or a minimal JSON depending on the task.
        Use a professional, helpful, and neutral tone.
        `;

    let userPrompt = "";

    switch (task) {
      case "summary":
        userPrompt = `
        Generate a short, clear, and informative summary for the following note.
        Keep it under 100 words. 
        Note content:
        ${content}
        `;
        break;

      case "tags":
        userPrompt = `
        Analyze the following note and suggest 3–7 highly relevant hashtags that summarize its key topics.
        Output only a JSON array of strings like:
        ["AI", "Productivity", "NoteTaking"]
        Note content:
        ${content}
        `;
        break;

      case "improve":
        userPrompt = `
        Improve the following note’s clarity, tone, and sentence flow.
        Make it more engaging but retain the original meaning. 
        Output the improved note content as clean and valid HTML only — no markdown or plain text.
        Note content:
        ${content}
        `;
        break;
    }

    const model = "gemini-2.5-flash";

    const result = await geminiAIClient.models.generateContent({
      model,
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${systemPrompt}\n\n${userPrompt}`,
            },
          ],
        },
      ],
    });

    const response = result.text?.trim() || "";

    if (task === "tags") {
      try {
        const parsed = JSON.parse(response);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        return response
          .replace(/[\[\]#"]/g, "")
          .split(",")
          .map((tag: string) => tag.trim())
          .filter(Boolean);
      }
    }

    return response;
  } catch (error) {
    console.error("[GeminiAI Error]", error);
    throw new Error("Failed to analyze note");
  }
}
