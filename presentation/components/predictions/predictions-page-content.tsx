"use client";

import { useEffect, useState } from "react";
import {
  SidebarTrigger,
  useSidebar,
} from "@/presentation/components/ui/sidebar";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/presentation/components/ui/tabs";
import { GroupStagePredictions } from "@/presentation/components/predictions/group-stage-predictions";
import { KnockoutBracket } from "@/presentation/components/predictions/knockout-bracket";
import { Trophy, Target, Award, Lock } from "lucide-react";
import type { MatchWithPrediction } from "@/domain/entities/match-with-prediction";
import type { Prediction } from "@/domain/entities/prediction";
import type { MatchPrediction } from "@/domain/entities/match-prediction";
import type { GroupStanding } from "@/domain/entities/group-standing";
import type { BestThirdPlace } from "@/domain/entities/best-third-place";
import type { RoundOf32Match } from "@/domain/entities/round-of-32-match";
import { cn } from "@/presentation/lib/utils";

interface PredictionsPageContentProps {
  prediction: Prediction | null;
  matches: MatchWithPrediction[];
  isLoading: boolean;
  error: string | null;
  selectedLeagueId: string | null;
  saveGroupPredictions: (
    groupId: string,
    matchPredictions: MatchPrediction[],
    groupStandings: GroupStanding[]
  ) => Promise<void>;
  isSaving: boolean;
  bestThirdPlaces: BestThirdPlace[] | null;
  roundOf32Matches: RoundOf32Match[] | null;
}

/**
 * Predictions Page Content Component (Client Component)
 * Wrapper component that handles sidebar state and renders predictions content
 *
 * This needs to be a Client Component because:
 * - Uses useSidebar hook from shadcn/ui
 * - Handles client-side sidebar toggle state
 * - Manages tabs navigation
 *
 * The actual data fetching is done via custom hooks in the parent component
 *
 * Architecture:
 * - Receives prediction data and handlers from parent
 * - Manages UI state (sidebar, tabs)
 * - Delegates to specialized components (GroupStagePredictions)
 */
export function PredictionsPageContent({
  prediction,
  matches,
  isLoading,
  error,
  selectedLeagueId,
  saveGroupPredictions,
  isSaving,
  bestThirdPlaces,
  roundOf32Matches,
}: PredictionsPageContentProps) {
  const { open, isMobile } = useSidebar();
  const [activeTab, setActiveTab] = useState("groups");

  // Handler to navigate to knockout tab
  const handleNavigateToKnockout = () => {
    setActiveTab("knockout");
  };

  // Calculate if all group stage predictions are completed
  const allGroupPredictionsCompleted = matches.every(
    (m) => m.userPrediction.id !== null
  );
  const totalMatches = matches.length;
  const completedMatches = matches.filter(
    (m) => m.userPrediction.id !== null
  ).length;

  // Debug logging
  useEffect(() => {
    console.log(
      "[PredictionsPageContent] Selected League ID:",
      selectedLeagueId
    );
  }, [selectedLeagueId]);

  useEffect(() => {
    if (prediction) {
      console.log("[PredictionsPageContent] Prediction data:", prediction);
    }
  }, [prediction]);

  useEffect(() => {
    if (matches.length > 0) {
      console.log(
        "[PredictionsPageContent] Matches with predictions:",
        matches
      );
      console.log("[PredictionsPageContent] Total matches:", matches.length);
    }
  }, [matches]);

  useEffect(() => {
    if (error) {
      console.error("[PredictionsPageContent] Error:", error);
    }
  }, [error]);

  useEffect(() => {
    console.log("[PredictionsPageContent] Loading state:", isLoading);
  }, [isLoading]);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        {(isMobile || !open) && <SidebarTrigger />}
        <h1 className="text-xl font-semibold">Predicciones</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-5xl">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-6 w-full justify-start">
              <TabsTrigger value="groups" className="gap-2">
                <Target className="size-4" />
                Fase de grupos
              </TabsTrigger>
              <TabsTrigger
                value="knockout"
                className="gap-2"
                disabled={!allGroupPredictionsCompleted}
              >
                {!allGroupPredictionsCompleted && <Lock className="size-3.5" />}
                {allGroupPredictionsCompleted && <Trophy className="size-4" />}
                Eliminatorias
              </TabsTrigger>
              <TabsTrigger
                value="awards"
                className="gap-2"
                disabled={!allGroupPredictionsCompleted}
              >
                {!allGroupPredictionsCompleted && <Lock className="size-3.5" />}
                {allGroupPredictionsCompleted && <Award className="size-4" />}
                Premios
              </TabsTrigger>
            </TabsList>

            <TabsContent value="groups">
              <GroupStagePredictions
                matches={matches}
                predictionId={prediction?.id || null}
                leagueId={selectedLeagueId}
                isLoading={isLoading}
                error={error}
                onSave={saveGroupPredictions}
                isSaving={isSaving}
                bestThirdPlaces={bestThirdPlaces}
                onNavigateToKnockout={handleNavigateToKnockout}
              />
            </TabsContent>

            <TabsContent value="knockout">
              {!allGroupPredictionsCompleted ? (
                <div className="rounded-xl border bg-card p-12 text-center">
                  <Lock className="mx-auto mb-4 size-12 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-semibold">Eliminatorias</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Completa todas las predicciones de la fase de grupos para
                    desbloquear las eliminatorias.
                  </p>
                  <p className="text-xs font-semibold text-foreground">
                    Progreso: {completedMatches}/{totalMatches} predicciones
                  </p>
                </div>
              ) : roundOf32Matches && roundOf32Matches.length > 0 ? (
                <KnockoutBracket matches={roundOf32Matches} />
              ) : (
                <div className="rounded-xl border bg-card p-12 text-center">
                  <Lock className="mx-auto mb-4 size-12 text-secondary" />
                  <h3 className="mb-2 text-lg font-semibold">Eliminatorias</h3>
                  <p className="text-sm text-muted-foreground">
                    Los emparejamientos de 16avos de final se mostrarán cuando
                    se completen todos los grupos.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="awards">
              <div className="rounded-xl border bg-card p-12 text-center">
                <Lock
                  className={cn(
                    "mx-auto mb-4 size-12",
                    allGroupPredictionsCompleted
                      ? "text-secondary"
                      : "text-muted-foreground"
                  )}
                />
                <h3 className="mb-2 text-lg font-semibold">
                  Premios individuales
                </h3>
                {!allGroupPredictionsCompleted ? (
                  <>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Completa todas las predicciones de la fase de grupos para
                      desbloquear los premios individuales.
                    </p>
                    <p className="text-xs font-semibold text-foreground">
                      Progreso: {completedMatches}/{totalMatches} predicciones
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Podrás predecir el ganador de premios individuales (Bota de
                    Oro, Mejor jugador, etc.) próximamente.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
