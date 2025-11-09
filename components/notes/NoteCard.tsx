"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteNote } from "@/lib/api";
import { EditNoteDialog } from "./EditNoteDialog";
import { Note } from "@/types";

const getTextFromHTML = (html: string) => {
  if (!html) return "";
  if (typeof window === "undefined") return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

export function NoteCard({
  id,
  title,
  content,
  summary,
  tags = [],
  createdAt,
}: Note) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("notes"),
      });
      toast.success("Note deleted successfully!");
    },
    onError: () => {
      toast.error("Error deleting note.");
    },
  });

  return (
    <EditNoteDialog note={{ id, title, content, summary, tags, createdAt }}>
      <Card className="group rounded-xl border border-border transition-all hover:shadow-md hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring cursor-pointer">
        <div>
          <CardHeader>
            <CardTitle className="truncate text-lg font-semibold group-hover:text-primary">
              {title}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p className="line-clamp-3 text-foreground/90">
              {getTextFromHTML(content)}
            </p>

            <p className="line-clamp-4 text-foreground/90 text-sm">
              {summary || "No summary available."}
            </p>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs capitalize"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            <p className="pt-2 text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
            </p>
          </CardContent>
        </div>
        <CardFooter className="flex justify-end gap-2 border-t">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="destructive">
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this note?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. The note will be permanently
                  deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    e.stopPropagation();
                    mutate(id);
                  }}
                  disabled={isPending}
                >
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </EditNoteDialog>
  );
}
