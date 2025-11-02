"use client";

import { selectSelectedLeagueId } from "@/infrastructure/store/selectors";
import { usePrediction } from "@/presentation/hooks/predictions/use-prediction-client";
import { PredictionsPageContent } from "@/presentation/components/predictions/predictions-page-content";

/**
 * Predictions Page (Client Component)
 * Fetches and displays user predictions using Clean Architecture pattern
 *
 * Architecture Flow:
 * Page (Client) → usePrediction Hook → Use Cases → Repositories → HTTP Client → API
 *                                                                       ↓
 *                                                  Browser sends cookies automatically
 *
 * Design:
 * - Modern, minimalist UI with shadcn/ui components
 * - Tabbed interface: Group Stage, Knockout, Awards
 * - Group Stage: Match prediction cards with score inputs
 * - Real-time validation and save functionality
 * - Progress tracking with badges
 * - Color-coded completion status
 * - Sidebar toggle in header
 *
 * IMPORTANT: Client Component
 * - Requests are made from the BROWSER (not Next.js server)
 * - Cookies are sent automatically (authentication works correctly)
 * - HTTP client interceptor adds Authorization header
 * - Loading state is handled by loading.tsx (shows skeleton UI)
 *
 * Clean Architecture:
 * - Page component is THIN - only data fetching
 * - UI logic delegated to PredictionsPageContent
 * - Business logic in use cases
 * - HTTP logic in repositories
 */
export default function PredictionsPage() {
  const selectedLeagueId = selectSelectedLeagueId();

  const {
    prediction,
    matches,
    isLoading,
    error,
    saveGroupPredictions,
    saveKnockoutPredictions,
    isSaving,
    bestThirdPlaces,
    roundOf32Matches,
    knockoutPredictions,
  } = usePrediction(selectedLeagueId);

  return (
    <PredictionsPageContent
      prediction={prediction}
      matches={matches}
      isLoading={isLoading}
      error={error}
      selectedLeagueId={selectedLeagueId}
      saveGroupPredictions={saveGroupPredictions}
      saveKnockoutPredictions={saveKnockoutPredictions}
      isSaving={isSaving}
      bestThirdPlaces={bestThirdPlaces}
      roundOf32Matches={roundOf32Matches}
      knockoutPredictions={knockoutPredictions}
    />
  );
}
