"use client";

import { useMatchCalendar } from "@/presentation/hooks/matches/use-match-calendar-client";
import { SchedulePageContent } from "@/presentation/components/schedule/schedule-page-content";

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
 * IMPORTANT: Client Component
 * - Requests are made from the BROWSER (not Next.js server)
 * - Cookies are sent automatically (authentication works correctly)
 * - HTTP client interceptor adds Authorization header
 * - Loading state is handled by loading.tsx (shows skeleton UI)
 */
export default function SchedulePage() {
  const { calendar, error } = useMatchCalendar();

  return <SchedulePageContent calendar={calendar} error={error} />;
}
