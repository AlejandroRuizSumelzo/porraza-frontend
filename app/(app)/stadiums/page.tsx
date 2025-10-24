"use client";

import { useStadiums } from "@/presentation/hooks/stadiums/use-stadiums-client";
import { StadiumPageContent } from "@/presentation/components/stadiums";

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
 * IMPORTANT: Client Component
 * - Requests are made from the BROWSER (not Next.js server)
 * - Cookies are sent automatically (authentication works correctly)
 * - HTTP client interceptor adds Authorization header
 * - Loading state is handled by loading.tsx (shows skeleton UI)
 */
export default function StadiumsPage() {
  const { stadiums, error } = useStadiums();

  return <StadiumPageContent stadiums={stadiums} error={error} />;
}
