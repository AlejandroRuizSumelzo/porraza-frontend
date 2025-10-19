"use client";

import {
  SidebarProvider,
  SidebarInset,
} from "@/presentation/components/ui/sidebar";
import { AppSidebar } from "@/presentation/components/app-sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
