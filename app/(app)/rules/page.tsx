"use client";

import { SidebarTrigger, useSidebar } from "@/presentation/components/ui/sidebar";

export default function RulesPage() {
  const { open } = useSidebar();

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        {!open && <SidebarTrigger />}
        <h1 className="text-xl font-semibold">Reglas</h1>
      </header>
      <main className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-7xl">
          <p className="text-muted-foreground">
            Conoce las reglas del juego y el sistema de puntuación.
          </p>
        </div>
      </main>
    </div>
  );
}
