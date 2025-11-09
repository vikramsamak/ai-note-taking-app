"use client";

import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 p-2">
    
      <div className="flex flex-col items-center gap-4 mt-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.image || undefined} alt={user.name || ""} />
          <AvatarFallback>
            {user.name?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>

        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            {user.name || "Unnamed User"}
          </h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <Separator />


      <div className="space-y-5 text-sm">
        <div className="flex justify-between border-b pb-3">
          <span className="text-muted-foreground">Full Name</span>
          <span className="font-medium">{user.name || "—"}</span>
        </div>

        <div className="flex justify-between border-b pb-3">
          <span className="text-muted-foreground">Email Address</span>
          <span className="font-medium">{user.email}</span>
        </div>

        {user.image && (
          <div className="flex justify-between border-b pb-3">
            <span className="text-muted-foreground">Profile Picture</span>
            <span className="font-medium text-primary">Uploaded</span>
          </div>
        )}
      </div>
    </div>
  );
}
