"use client";

import { useMatchCalendar } from "@/presentation/hooks/matches/use-match-calendar-client";
import { SchedulePageContent } from "@/presentation/components/schedule/schedule-page-content";
import { Spinner } from "@/presentation/components/ui/spinner";

/**
 * Schedule Page (Client Component)
 * Fetches and displays the complete match calendar using Clean Architecture pattern
 *
 * Architecture Flow:
 * Page (Client) → useMatchCalendar Hook → Use Case → Repository → HTTP Client → API
 *                                                                       ↓
 *                                                  Browser sends cookies automatically
 *
 * Design:
 * - Modern, minimalist UI with shadcn/ui components
 * - Responsive layout with match cards grouped by phase
 * - Header with summary statistics
 * - Match cards with team info, scores, stadium, and time
 * - Color-coded phase headers and status badges
 * - Sidebar toggle in header
 *
 * IMPORTANT: Now a Client Component
 * - Requests are made from the BROWSER (not Next.js server)
 * - Cookies are sent automatically (authentication works correctly)
 * - HTTP client interceptor adds Authorization header
 */
export default function SchedulePage() {
  const { calendar, isLoading, error } = useMatchCalendar();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return <SchedulePageContent calendar={calendar} error={error} />;
}
