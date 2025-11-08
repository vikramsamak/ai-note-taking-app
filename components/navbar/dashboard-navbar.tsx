"use client";

import Link from "next/link";
import { Menu, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Separator } from "@/components/ui/separator";

export function DashboardNavbar() {
  // Placeholder user data
  const user = {
    name: "User",
    email: "user@example.com",
    image: "/user.jpg", // Placeholder image
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-14 items-center justify-between px-4 sm:px-6">
        {/* Left: Logo */}
        <Link href="/dashboard" className="text-lg font-semibold">
          📝 AI Notes
        </Link>

        {/* Right: Controls */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Avatar Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu (Sheet) */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-60 p-4">
                <SheetHeader>
                  <SheetTitle className="text-lg font-semibold">
                    AI Notes
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-4 flex flex-col gap-3">
                  <Link
                    href="/dashboard"
                    className="rounded-md px-3 py-2 text-sm hover:bg-accent"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/notes"
                    className="rounded-md px-3 py-2 text-sm hover:bg-accent"
                  >
                    My Notes
                  </Link>
                  <Separator className="my-2" />
                  <Button variant="ghost" size="sm" className="justify-start">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
