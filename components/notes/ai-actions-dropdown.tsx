import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { analyzeNote } from "@/lib/geminiai/analyze-note";
import { toast } from "sonner";

interface AiActionsDropdownProps {
  noteId: string;
  onActionSuccess: (
    task: "summary" | "tags" | "improve",
    data: string | string[]
  ) => void;
  isPending: boolean;
  setIsPending: (pending: boolean) => void;
}

export function AiActionsDropdown({
  noteId,
  onActionSuccess,
  isPending,
  setIsPending,
}: AiActionsDropdownProps) {
  const { mutate: runAIAction } = useMutation({
    mutationFn: async (task: "summary" | "tags" | "improve") => {
      setIsPending(true);
      return analyzeNote(task, noteId);
    },
    onSuccess: (data, task) => {
      onActionSuccess(task, data);
      toast.success(`AI ${task} generated successfully!`);
      setIsPending(false);
    },
    onError: () => {
      toast.error("Failed to generate AI content. Try again.");
      setIsPending(false);
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon" disabled={isPending}>
          <Sparkles className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => runAIAction("summary")}>
          ✨ Generate Summary
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => runAIAction("tags")}>
          🏷️ Generate Tags
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => runAIAction("improve")}>
          💡 Improve Content
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
