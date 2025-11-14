"use client";

import {
  SidebarTrigger,
  useSidebar,
} from "@/presentation/components/ui/sidebar";
import type { Stadium } from "@/domain/entities/stadium";
import { StadiumHeader } from "@/presentation/components/stadiums/stadium-header";
import { StadiumGrid } from "@/presentation/components/stadiums/stadium-grid";
import { StadiumEmptyState } from "@/presentation/components/stadiums/stadium-empty-state";
import { useTranslations } from "next-intl";

interface StadiumPageContentProps {
  stadiums: Stadium[] | null;
  error: string | null;
}

/**
 * Stadium Page Content (Client Component)
 * Wrapper component to handle sidebar toggle and display stadiums
 */
export function StadiumPageContent({
  stadiums,
  error,
}: StadiumPageContentProps) {
  const { open, isMobile } = useSidebar();
  const t = useTranslations();

  return (
    <div className="flex h-full flex-col">
      {/* Header with Sidebar Toggle */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        {/* Show trigger always on mobile, or when collapsed on desktop */}
        {(isMobile || !open) && <SidebarTrigger />}
        <h1 className="text-xl font-semibold">{t("stadiums.header.title")}</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Error State */}
          {error && <StadiumEmptyState type="error" message={error} />}

          {/* Empty State */}
          {!error && stadiums && stadiums.length === 0 && (
            <StadiumEmptyState type="empty" />
          )}

          {/* Success State */}
          {!error && stadiums && stadiums.length > 0 && (
            <>
              {/* Header with Stats */}
              <StadiumHeader stadiums={stadiums} />

              {/* Stadium Grid */}
              <StadiumGrid stadiums={stadiums} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
