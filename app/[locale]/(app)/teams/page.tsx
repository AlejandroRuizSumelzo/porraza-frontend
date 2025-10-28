"use client";

import { useTeams } from "@/presentation/hooks/teams/use-teams-client";
import { TeamPageContent } from "@/presentation/components/teams/team-page-content";

/**
 * Teams Page (Client Component)
 * Fetches and displays all national teams using Clean Architecture pattern
 *
 * Architecture Flow:
 * Page (Client) → useTeams Hook → Use Case → Repository → HTTP Client → API
 *                                                                 ↓
 *                                            Browser sends cookies automatically
 *
 * Design:
 * - Modern, minimalist UI with shadcn/ui components
 * - Responsive grid for displaying teams
 * - Team cards with flags and information
 * - Header with summary statistics
 * - Sidebar toggle in header
 *
 * IMPORTANT: Client Component
 * - Requests are made from the BROWSER (not Next.js server)
 * - Cookies are sent automatically (authentication works correctly)
 * - HTTP client interceptor adds Authorization header
 * - Loading state is handled by loading.tsx (shows skeleton UI)
 */
export default function TeamsPage() {
  const { teams, error } = useTeams();

  return <TeamPageContent teams={teams} error={error} />;
}
