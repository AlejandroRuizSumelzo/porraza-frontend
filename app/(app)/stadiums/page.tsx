import { useStadiums } from "@/presentation/hooks/stadiums/use-stadiums";
import { StadiumPageContent } from "@/presentation/components/stadiums";

/**
 * Stadiums Page (Server Component)
 * Fetches and displays all stadiums using Clean Architecture pattern
 *
 * Architecture Flow:
 * Page (Server) → Custom Hook → Use Case → Repository → HTTP Client → API
 *                     ↓
 *              StadiumPageContent (Client) - For sidebar toggle
 *
 * Design:
 * - Modern, minimalist UI with shadcn/ui components
 * - Responsive grid: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
 * - Stadium cards with images and gradient overlays
 * - Header with summary statistics
 * - Sidebar toggle in header
 */
export default async function StadiumsPage() {
  // Use custom hook to fetch stadiums (encapsulates business logic)
  const { stadiums, error } = await useStadiums();

  // Console log for debugging
  console.log("[StadiumsPage] Stadiums from custom hook:", stadiums);
  console.log("[StadiumsPage] Total stadiums:", stadiums?.length || 0);

  return <StadiumPageContent stadiums={stadiums} error={error} />;
}
