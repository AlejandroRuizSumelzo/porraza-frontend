"use client";

import { LeaguePageContent } from "@/presentation/components/leagues/league-page-content";

/**
 * Leagues Page (Client Component)
 * Manages league creation, joining, and viewing
 *
 * Architecture Flow:
 * Page (Client) → LeaguePageContent → Hooks → Use Cases → Repository → HTTP Client → API
 *                                                                          ↓
 *                                                     Browser sends cookies automatically
 *
 * Design:
 * - Clean, modular structure with reusable components
 * - Brand colors: Blue (public), Red (private), Green (admin)
 * - Responsive tabs with shadcn/ui components
 * - Loading states handled by loading.tsx
 *
 * IMPORTANT: Client Component
 * - Requests are made from the BROWSER (not Next.js server)
 * - Cookies are sent automatically (authentication works correctly)
 * - HTTP client interceptor adds Authorization header
 */
export default function LeaguesPage() {
  return <LeaguePageContent />;
}
