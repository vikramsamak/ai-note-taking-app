import { Skeleton } from "@/components/ui/skeleton";

export function AiLoader({ label }: { label: string }) {
  return (
    <div className="space-y-3 p-4">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/4" />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
