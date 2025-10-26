"use client";

import { useEffect } from "react";
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
import { Trophy, Target, Award } from "lucide-react";
import { selectSelectedLeagueId } from "@/infrastructure/store/selectors";
import { usePrediction } from "@/presentation/hooks/predictions/use-prediction-client";

export default function PredictionsPage() {
  const { open, isMobile } = useSidebar();
  const selectedLeagueId = selectSelectedLeagueId();

  const {
    prediction,
    matches,
    isLoading,
    error,
    saveGroupPredictions,
    isSaving,
  } = usePrediction(selectedLeagueId);

  useEffect(() => {
    console.log("[PredictionsPage] Selected League ID:", selectedLeagueId);
  }, [selectedLeagueId]);

  useEffect(() => {
    if (prediction) {
      console.log("[PredictionsPage] Prediction data:", prediction);
    }
  }, [prediction]);

  useEffect(() => {
    if (matches.length > 0) {
      console.log("[PredictionsPage] Matches with predictions:", matches);
      console.log("[PredictionsPage] Total matches:", matches.length);
    }
  }, [matches]);

  useEffect(() => {
    if (error) {
      console.error("[PredictionsPage] Error:", error);
    }
  }, [error]);

  useEffect(() => {
    console.log("[PredictionsPage] Loading state:", isLoading);
  }, [isLoading]);

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        {(isMobile || !open) && <SidebarTrigger />}
        <h1 className="text-xl font-semibold">Predicciones</h1>
      </header>
      <main className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-5xl">
          <Tabs defaultValue="groups" className="w-full">
            <TabsList className="mb-6 w-full justify-start">
              <TabsTrigger value="groups" className="gap-2">
                <Target className="size-4" />
                Fase de grupos
              </TabsTrigger>
              <TabsTrigger value="knockout" className="gap-2">
                <Trophy className="size-4" />
                Eliminatorias
              </TabsTrigger>
              <TabsTrigger value="awards" className="gap-2">
                <Award className="size-4" />
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
              />
            </TabsContent>

            <TabsContent value="knockout">
              <div className="rounded-xl border bg-card p-12 text-center">
                <Trophy className="mx-auto mb-4 size-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">Eliminatorias</h3>
                <p className="text-sm text-muted-foreground">
                  Las predicciones para la fase eliminatoria estarán disponibles
                  una vez completes la fase de grupos.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="awards">
              <div className="rounded-xl border bg-card p-12 text-center">
                <Trophy className="mx-auto mb-4 size-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">
                  Premios individuales
                </h3>
                <p className="text-sm text-muted-foreground">
                  Podrás predecir el ganador de premios individuales (Bota de
                  Oro, Mejor jugador, etc.).
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
