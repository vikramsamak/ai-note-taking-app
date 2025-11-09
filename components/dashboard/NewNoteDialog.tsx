"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FloatingActionButton } from "./FloatingActionButton";

export function NewNoteDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <FloatingActionButton />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Note</DialogTitle>
          <DialogDescription>
            Fill in the details to create your note.
          </DialogDescription>
        </DialogHeader>
        {/* Form will go here later */}
      </DialogContent>
    </Dialog>
  );
}
