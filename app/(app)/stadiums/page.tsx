"use client";

import { useStadiums } from "@/presentation/hooks/stadiums/use-stadiums-client";
import { StadiumPageContent } from "@/presentation/components/stadiums";
import { Spinner } from "@/presentation/components/ui/spinner";

/**
 * Stadiums Page (Client Component)
 * Fetches and displays all stadiums using Clean Architecture pattern
 *
 * Architecture Flow:
 * Page (Client) → useStadiums Hook → Use Case → Repository → HTTP Client → API
 *                                                                 ↓
 *                                            Browser sends cookies automatically
 *
 * Design:
 * - Modern, minimalist UI with shadcn/ui components
 * - Responsive grid: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
 * - Stadium cards with images and gradient overlays
 * - Header with summary statistics
 * - Sidebar toggle in header
 *
 * IMPORTANT: Now a Client Component
 * - Requests are made from the BROWSER (not Next.js server)
 * - Cookies are sent automatically (authentication works correctly)
 * - HTTP client interceptor adds Authorization header
 */
export default function StadiumsPage() {
  const { stadiums, isLoading, error } = useStadiums();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return <StadiumPageContent stadiums={stadiums} error={error} />;
}
