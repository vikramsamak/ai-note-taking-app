"use client";
import { NoteCard } from "@/components/notes/NoteCard";

export default function NotesPage() {
  const notes = [
    {
      id: "1",
      title: "AI Integration Notes",
      summary: "Exploring how Gemini AI can generate contextual tags...",
      tags: ["AI", "Gemini", "Next.js"],
      createdAt: "2025-11-08T10:00:00Z",
    },
    {
      id: "1",
      title: "AI Integration Notes",
      summary: "Exploring how Gemini AI can generate contextual tags...",
      tags: ["AI", "Gemini", "Next.js"],
      createdAt: "2025-11-08T10:00:00Z",
    },
    {
      id: "1",
      title: "AI Integration Notes",
      summary: "Exploring how Gemini AI can generate contextual tags...",
      tags: ["AI", "Gemini", "Next.js"],
      createdAt: "2025-11-08T10:00:00Z",
    },
    {
      id: "1",
      title: "AI Integration Notes",
      summary: "Exploring how Gemini AI can generate contextual tags...",
      tags: ["AI", "Gemini", "Next.js"],
      createdAt: "2025-11-08T10:00:00Z",
    },
    {
      id: "1",
      title: "AI Integration Notes",
      summary: "Exploring how Gemini AI can generate contextual tags...",
      tags: ["AI", "Gemini", "Next.js"],
      createdAt: "2025-11-08T10:00:00Z",
    },
    {
      id: "1",
      title: "AI Integration Notes",
      summary: "Exploring how Gemini AI can generate contextual tags...",
      tags: ["AI", "Gemini", "Next.js"],
      createdAt: "2025-11-08T10:00:00Z",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          {...note}
          onClick={(id) => console.log("Clicked Note:", id)}
        />
      ))}
    </div>
  );
}
