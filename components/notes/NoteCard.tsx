"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface NoteCardProps {
  id: string;
  title: string;
  summary?: string;
  tags?: string[];
  createdAt: string;
  onClick?: (id: string) => void;
}

export function NoteCard({
  id,
  title,
  summary,
  tags = [],
  createdAt,
  onClick,
}: NoteCardProps) {
  return (
    <Card
      onClick={() => onClick?.(id)}
      className="group cursor-pointer rounded-xl border border-border transition-all hover:shadow-md hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring"
    >
      <CardHeader>
        <CardTitle className="truncate text-lg font-semibold group-hover:text-primary">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 text-sm text-muted-foreground">
        {summary && (
          <p className="line-clamp-3 text-foreground/90">{summary}</p>
        )}

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
    </Card>
  );
}
