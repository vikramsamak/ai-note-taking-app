import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => handleRemove(tag)}
            />
          </Badge>
        ))
      )}
    </div>
  );
}
