import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";

interface TagsEditorProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

export function TagsEditor({ tags = [], onChange }: TagsEditorProps) {
  const handleRemove = (tag: string) => onChange(tags.filter((t) => t !== tag));
  return (
    <div className="flex flex-wrap gap-2">
      {tags.length === 0 ? (
        <span className="text-sm text-muted-foreground">No tags added.</span>
      ) : (
        tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="flex items-center gap-1"
          >
            #{tag}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleRemove(tag)}
              className="p-0.5 cursor-pointer"
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))
      )}
    </div>
  );
}
