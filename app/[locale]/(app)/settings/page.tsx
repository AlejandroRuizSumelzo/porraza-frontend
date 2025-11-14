"use client";

import {
  SidebarTrigger,
  useSidebar,
} from "@/presentation/components/ui/sidebar";
import { SettingsPageContent } from "@/presentation/components/settings/settings-page-content";

export default function SettingsPage() {
  const { open, isMobile } = useSidebar();

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        {(isMobile || !open) && <SidebarTrigger />}
        <h1 className="text-xl font-semibold">Configuración</h1>
      </header>
      <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
        <SettingsPageContent />
      </main>
    </div>
  );
}
