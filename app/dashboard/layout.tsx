"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { NewNoteDialog } from "@/components/notes";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname?.includes("/dashboard/profile")) return "My Profile";
    if (pathname?.includes("/dashboard/notes")) return "My Notes";
    return "Dashboard";
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex h-screen flex-col flex-1 p-4 relative">
        <header className="flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold tracking-tight">
              {getPageTitle()}
            </h1>
          </div>
        </header>
        <section className="flex-1 min-h-0 border rounded-md p-2 mt-2 bg-muted/5">
          {children}
        </section>
      </main>
      <NewNoteDialog />
    </SidebarProvider>
  );
}
