"use client";

import { useState, useMemo } from "react";
import type { MatchWithPrediction } from "@/domain/entities/match-with-prediction";
import type { MatchPrediction } from "@/domain/entities/match-prediction";
import { MatchPredictionCard } from "@/presentation/components/predictions/match-prediction-card";
import { Button } from "@/presentation/components/ui/button";
import { Badge } from "@/presentation/components/ui/badge";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { ButtonGroup } from "@/presentation/components/ui/button-group";
import {
  FieldSet,
  FieldLegend,
  FieldGroup,
} from "@/presentation/components/ui/field";
import { Save, Info, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/presentation/lib/utils";

interface GroupStagePredictionsProps {
  matches: MatchWithPrediction[];
  predictionId: string | null;
  leagueId: string | null;
  isLoading: boolean;
  error: string | null;
  onSave: (
    groupId: string,
    matchPredictions: MatchPrediction[]
  ) => Promise<void>;
  isSaving: boolean;
}

export function GroupStagePredictions({
  matches,
  predictionId,
  leagueId,
  isLoading,
  error,
  onSave,
  isSaving,
}: GroupStagePredictionsProps) {
  const [predictions, setPredictions] = useState<
    Record<string, { homeScore: string; awayScore: string }>
  >({});
  const [selectedGroup, setSelectedGroup] = useState<string>("A");

  // Group matches by group name
  const groupedMatches = useMemo(() => {
    const groups: Record<string, MatchWithPrediction[]> = {};

    matches.forEach((matchWithPrediction) => {
      const groupName = matchWithPrediction.match.group.name;
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(matchWithPrediction);
    });

    return groups;
  }, [matches]);

  // Get available groups sorted alphabetically
  const availableGroups = useMemo(() => {
    return Object.keys(groupedMatches).sort();
  }, [groupedMatches]);

  // Initialize predictions from API data with default 0-0
  useMemo(() => {
    const initialPredictions: Record<
      string,
      { homeScore: string; awayScore: string }
    > = {};

    matches.forEach((matchWithPrediction) => {
      const { match, userPrediction } = matchWithPrediction;

      // Set user prediction if exists, otherwise default to 0-0
      if (userPrediction.id !== null) {
        initialPredictions[match.id] = {
          homeScore: userPrediction.homeScore.toString(),
          awayScore: userPrediction.awayScore.toString(),
        };
      } else {
        // Default values: 0-0
        initialPredictions[match.id] = {
          homeScore: "0",
          awayScore: "0",
        };
      }
    });

    setPredictions(initialPredictions);
  }, [matches]);

  const handleScoreChange = (
    matchId: string,
    team: "homeScore" | "awayScore",
    value: string
  ) => {
    setPredictions((prev) => ({
      ...prev,
      [matchId]: {
        homeScore:
          team === "homeScore" ? value : prev[matchId]?.homeScore || "0",
        awayScore:
          team === "awayScore" ? value : prev[matchId]?.awayScore || "0",
      },
    }));
  };

  const handleSave = async () => {
    if (!leagueId) {
      toast.error("No se ha seleccionado una liga");
      return;
    }

    // Get the group ID for the selected group
    const currentMatches = groupedMatches[selectedGroup];
    if (!currentMatches || currentMatches.length === 0) {
      toast.error("No hay partidos en este grupo");
      return;
    }

    const groupId = currentMatches[0].match.group.id;

    // Prepare match predictions for the current group
    const matchPredictions: MatchPrediction[] = [];

    for (const matchWithPrediction of currentMatches) {
      const matchId = matchWithPrediction.match.id;
      const prediction = predictions[matchId];

      // Validate that all matches have predictions (should have defaults)
      if (!prediction) {
        toast.error(
          `Por favor, completa todas las predicciones del Grupo ${selectedGroup}`
        );
        return;
      }

      const homeScore = parseInt(prediction.homeScore, 10);
      const awayScore = parseInt(prediction.awayScore, 10);

      // Validate scores are valid numbers
      if (
        isNaN(homeScore) ||
        isNaN(awayScore) ||
        homeScore < 0 ||
        awayScore < 0
      ) {
        toast.error(
          "Los marcadores deben ser números válidos mayores o iguales a 0"
        );
        return;
      }

      matchPredictions.push({
        matchId,
        homeScore,
        awayScore,
        homeScoreET: null,
        awayScoreET: null,
        penaltiesWinner: null,
      });
    }

    // Validate we have exactly 6 predictions
    if (matchPredictions.length !== 6) {
      toast.error(
        `El Grupo ${selectedGroup} debe tener exactamente 6 partidos. Tiene ${matchPredictions.length}`
      );
      return;
    }

    try {
      await onSave(groupId, matchPredictions);
      toast.success(
        `Predicciones del Grupo ${selectedGroup} guardadas correctamente`
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error al guardar predicciones";
      toast.error(errorMessage);
    }
  };

  // Helper: Check if a match has a valid prediction
  const hasValidPrediction = (matchWithPrediction: MatchWithPrediction) => {
    // A prediction is valid only if the userPrediction has an id (was saved to DB)
    return matchWithPrediction.userPrediction.id !== null;
  };

  // Calculate statistics for current group
  const currentMatches = groupedMatches[selectedGroup] || [];
  const pendingCount = currentMatches.length;
  const predictedCount = currentMatches.filter(hasValidPrediction).length;

  // Calculate global statistics
  const allMatchesCount = matches.length;
  const allPredictedCount = matches.filter(hasValidPrediction).length;

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="rounded-xl border border-destructive bg-destructive/10 p-12 text-center">
        <p className="text-sm text-destructive">{error}</p>
      </div>
    );
  }

  // Empty state
  if (matches.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-12 text-center">
        <Info className="mx-auto mb-4 size-12 text-muted-foreground" />
        <h3 className="mb-2 text-lg font-semibold">
          No hay partidos disponibles
        </h3>
        <p className="text-sm text-muted-foreground">
          Los partidos de la fase de grupos aparecerán aquí próximamente.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Info Card */}
      <Card className="bg-gradient-primary border-primary/20">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start gap-2.5 sm:gap-3">
            <Info className="mt-0.5 size-4 shrink-0 text-primary sm:size-5" />
            <div className="space-y-1.5 sm:space-y-2">
              <p className="text-xs font-medium text-foreground sm:text-sm">
                Predice los resultados exactos de todos los partidos de la fase
                de grupos
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground sm:gap-x-4 sm:text-sm">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-secondary sm:size-4" />
                  <span>
                    Resultado exacto:{" "}
                    <strong className="text-secondary">3 pts</strong>
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-primary sm:size-4" />
                  <span>
                    Ganador/empate:{" "}
                    <strong className="text-primary">1 pt</strong>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Badge */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <Badge variant="outline" className="gap-1.5 text-xs sm:text-sm">
          <span className="text-muted-foreground">Progreso:</span>
          <span className="font-semibold text-foreground">
            {allPredictedCount}/{allMatchesCount}
          </span>
        </Badge>
      </div>

      {/* Group Selector - Grid on mobile, ButtonGroup on tablet+ */}
      <div className="grid grid-cols-4 gap-2 sm:hidden">
        {availableGroups.map((group) => {
          const groupMatches = groupedMatches[group] || [];
          const groupPredicted = groupMatches.filter(hasValidPrediction).length;
          const isComplete = groupPredicted === groupMatches.length;
          const isSelected = selectedGroup === group;

          return (
            <Button
              key={group}
              onClick={() => setSelectedGroup(group)}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              className={cn("relative", isSelected && "shadow-primary")}
            >
              <span>{group}</span>
              {isComplete && (
                <CheckCircle2 className="absolute right-0.5 top-0.5 size-3.5 rounded-full bg-secondary text-white shadow-sm" />
              )}
            </Button>
          );
        })}
      </div>

      <ButtonGroup className="hidden w-full sm:flex">
        {availableGroups.map((group) => {
          const groupMatches = groupedMatches[group] || [];
          const groupPredicted = groupMatches.filter(hasValidPrediction).length;
          const isComplete = groupPredicted === groupMatches.length;
          const isSelected = selectedGroup === group;

          return (
            <Button
              key={group}
              onClick={() => setSelectedGroup(group)}
              variant={isSelected ? "default" : "outline"}
              className={cn("relative flex-1", isSelected && "shadow-primary")}
            >
              <span>Grupo {group}</span>
              {isComplete && (
                <CheckCircle2 className="absolute right-0.5 top-0.5 size-4 rounded-full bg-secondary text-white shadow-sm" />
              )}
            </Button>
          );
        })}
      </ButtonGroup>

      {/* Current Group Stats */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <Badge variant="outline" className="gap-1.5 text-xs sm:text-sm">
          <span className="text-muted-foreground">Predichos:</span>
          <span className="font-semibold text-foreground">
            {predictedCount}/{pendingCount}
          </span>
        </Badge>
        {predictedCount === pendingCount && pendingCount > 0 && (
          <Badge variant="secondary" className="gap-1.5 text-xs sm:text-sm">
            <CheckCircle2 className="size-3 sm:size-3.5" />
            Grupo completado
          </Badge>
        )}
      </div>

      {/* Match Cards wrapped in FieldSet */}
      <FieldSet>
        <FieldLegend variant="legend">
          Grupo {selectedGroup} - Predicciones
        </FieldLegend>
        <FieldGroup className="space-y-2.5 sm:space-y-3">
          {currentMatches.map((matchWithPrediction) => (
            <MatchPredictionCard
              key={matchWithPrediction.match.id}
              matchWithPrediction={matchWithPrediction}
              prediction={predictions[matchWithPrediction.match.id]}
              onScoreChange={handleScoreChange}
            />
          ))}
        </FieldGroup>
      </FieldSet>

      {/* Save Button */}
      <div className="sticky bottom-4 flex justify-center pt-4 sm:bottom-6">
        <Button
          onClick={handleSave}
          size="lg"
          className="gap-2 shadow-primary w-full sm:w-auto"
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span className="hidden sm:inline">Guardando...</span>
              <span className="sm:hidden">Guardando...</span>
            </>
          ) : (
            <>
              <Save className="size-4" />
              <span className="hidden sm:inline">Guardar predicciones</span>
              <span className="sm:hidden">Guardar</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
