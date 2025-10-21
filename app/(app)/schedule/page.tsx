import { useMatchCalendar } from "@/presentation/hooks/matches/use-match-calendar";
import { SchedulePageContent } from "@/presentation/components/schedule/schedule-page-content";

/**
 * Schedule Page (Server Component)
 * Fetches and displays the complete match calendar using Clean Architecture pattern
 *
 * Architecture Flow:
 * Page (Server) → Custom Hook → Use Case → Repository → HTTP Client → API
 *                     ↓
 *              SchedulePageContent (Client) - For sidebar toggle
 *
 * Design:
 * - Modern, minimalist UI with shadcn/ui components
 * - Responsive layout with match cards grouped by phase
 * - Header with summary statistics
 * - Match cards with team info, scores, stadium, and time
 * - Color-coded phase headers and status badges
 * - Sidebar toggle in header
 */
export default async function SchedulePage() {
  const { calendar, error } = await useMatchCalendar();

  return <SchedulePageContent calendar={calendar} error={error} />;
}
