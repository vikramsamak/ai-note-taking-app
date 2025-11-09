import { notesService } from "@/services";
import { Note } from "@/types";

export async function fetchNotes() {
  try {
    return await notesService.get<{ notes: Note[] }>();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function createNote(data: { title: string; content: string }) {
  try {
    return await notesService.post<Note>({ data });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function updateNote(
  id: string,
  data: { title?: string; content?: string; ummary?: string; tags?: string[] }
) {
  try {
    return await notesService.put<Note>({ id, data });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function deleteNote(id: string) {
  try {
    return await notesService.delete<{ success: boolean }>({ id });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
