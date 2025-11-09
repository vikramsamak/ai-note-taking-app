"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";

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
      <main className="flex min-h-screen flex-col flex-1 p-6">
        <header
          className={cn(
            "flex items-center justify-between border-b border-border pb-3 mb-6"
          )}
        >
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold tracking-tight">
              {getPageTitle()}
            </h1>
          </div>
        </header>
        <section className="flex-1">{children}</section>
      </main>
    </SidebarProvider>
  );
}
