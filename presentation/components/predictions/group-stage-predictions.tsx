"use client";

import { useState } from "react";
import { MatchPredictionCard } from "@/presentation/components/predictions/match-prediction-card";
import { Button } from "@/presentation/components/ui/button";
import { Badge } from "@/presentation/components/ui/badge";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { ButtonGroup } from "@/presentation/components/ui/button-group";
import { Save, Info, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/presentation/lib/utils";

const groups = {
  A: [
    {
      id: 1,
      team1: "Qatar",
      team2: "Ecuador",
      flag1: "QA",
      flag2: "EC",
      date: "20 nov",
      time: "14:00",
      stadium: "Al Bayt Stadium",
      status: "pending" as const,
    },
    {
      id: 2,
      team1: "Senegal",
      team2: "Netherlands",
      flag1: "SN",
      flag2: "NL",
      date: "21 nov",
      time: "11:00",
      stadium: "Al Thumama Stadium",
      status: "pending" as const,
    },
    {
      id: 3,
      team1: "Qatar",
      team2: "Senegal",
      flag1: "QA",
      flag2: "SN",
      date: "25 nov",
      time: "14:00",
      stadium: "Al Thumama Stadium",
      status: "pending" as const,
    },
    {
      id: 4,
      team1: "Netherlands",
      team2: "Ecuador",
      flag1: "NL",
      flag2: "EC",
      date: "25 nov",
      time: "17:00",
      stadium: "Khalifa International Stadium",
      status: "pending" as const,
    },
    {
      id: 5,
      team1: "Netherlands",
      team2: "Qatar",
      flag1: "NL",
      flag2: "QA",
      date: "29 nov",
      time: "16:00",
      stadium: "Al Bayt Stadium",
      status: "pending" as const,
    },
    {
      id: 6,
      team1: "Ecuador",
      team2: "Senegal",
      flag1: "EC",
      flag2: "SN",
      date: "29 nov",
      time: "16:00",
      stadium: "Khalifa International Stadium",
      status: "pending" as const,
    },
  ],
  B: [
    {
      id: 7,
      team1: "England",
      team2: "Iran",
      flag1: "GB-ENG",
      flag2: "IR",
      date: "21 nov",
      time: "14:00",
      stadium: "Khalifa International Stadium",
      status: "pending" as const,
    },
    {
      id: 8,
      team1: "USA",
      team2: "Wales",
      flag1: "US",
      flag2: "GB-WLS",
      date: "21 nov",
      time: "20:00",
      stadium: "Ahmad Bin Ali Stadium",
      status: "pending" as const,
    },
    {
      id: 9,
      team1: "Wales",
      team2: "Iran",
      flag1: "GB-WLS",
      flag2: "IR",
      date: "25 nov",
      time: "11:00",
      stadium: "Ahmad Bin Ali Stadium",
      status: "pending" as const,
    },
    {
      id: 10,
      team1: "England",
      team2: "USA",
      flag1: "GB-ENG",
      flag2: "US",
      date: "25 nov",
      time: "20:00",
      stadium: "Al Bayt Stadium",
      status: "pending" as const,
    },
    {
      id: 11,
      team1: "Wales",
      team2: "England",
      flag1: "GB-WLS",
      flag2: "GB-ENG",
      date: "29 nov",
      time: "20:00",
      stadium: "Ahmad Bin Ali Stadium",
      status: "pending" as const,
    },
    {
      id: 12,
      team1: "Iran",
      team2: "USA",
      flag1: "IR",
      flag2: "US",
      date: "29 nov",
      time: "20:00",
      stadium: "Al Thumama Stadium",
      status: "pending" as const,
    },
  ],
  C: [
    {
      id: 13,
      team1: "Argentina",
      team2: "Saudi Arabia",
      flag1: "AR",
      flag2: "SA",
      date: "22 nov",
      time: "11:00",
      stadium: "Lusail Stadium",
      status: "pending" as const,
    },
    {
      id: 14,
      team1: "Mexico",
      team2: "Poland",
      flag1: "MX",
      flag2: "PL",
      date: "22 nov",
      time: "17:00",
      stadium: "Stadium 974",
      status: "pending" as const,
    },
    {
      id: 15,
      team1: "Poland",
      team2: "Saudi Arabia",
      flag1: "PL",
      flag2: "SA",
      date: "26 nov",
      time: "14:00",
      stadium: "Education City Stadium",
      status: "pending" as const,
    },
    {
      id: 16,
      team1: "Argentina",
      team2: "Mexico",
      flag1: "AR",
      flag2: "MX",
      date: "26 nov",
      time: "20:00",
      stadium: "Lusail Stadium",
      status: "pending" as const,
    },
    {
      id: 17,
      team1: "Poland",
      team2: "Argentina",
      flag1: "PL",
      flag2: "AR",
      date: "30 nov",
      time: "20:00",
      stadium: "Stadium 974",
      status: "pending" as const,
    },
    {
      id: 18,
      team1: "Saudi Arabia",
      team2: "Mexico",
      flag1: "SA",
      flag2: "MX",
      date: "30 nov",
      time: "20:00",
      stadium: "Lusail Stadium",
      status: "pending" as const,
    },
  ],
  D: [
    {
      id: 19,
      team1: "France",
      team2: "Australia",
      flag1: "FR",
      flag2: "AU",
      date: "22 nov",
      time: "20:00",
      stadium: "Al Janoub Stadium",
      status: "pending" as const,
    },
    {
      id: 20,
      team1: "Denmark",
      team2: "Tunisia",
      flag1: "DK",
      flag2: "TN",
      date: "22 nov",
      time: "14:00",
      stadium: "Education City Stadium",
      status: "pending" as const,
    },
    {
      id: 21,
      team1: "Tunisia",
      team2: "Australia",
      flag1: "TN",
      flag2: "AU",
      date: "26 nov",
      time: "11:00",
      stadium: "Al Janoub Stadium",
      status: "pending" as const,
    },
    {
      id: 22,
      team1: "France",
      team2: "Denmark",
      flag1: "FR",
      flag2: "DK",
      date: "26 nov",
      time: "17:00",
      stadium: "Stadium 974",
      status: "pending" as const,
    },
    {
      id: 23,
      team1: "Tunisia",
      team2: "France",
      flag1: "TN",
      flag2: "FR",
      date: "30 nov",
      time: "16:00",
      stadium: "Education City Stadium",
      status: "pending" as const,
    },
    {
      id: 24,
      team1: "Australia",
      team2: "Denmark",
      flag1: "AU",
      flag2: "DK",
      date: "30 nov",
      time: "16:00",
      stadium: "Al Janoub Stadium",
      status: "pending" as const,
    },
  ],
  E: [
    {
      id: 25,
      team1: "Germany",
      team2: "Japan",
      flag1: "DE",
      flag2: "JP",
      date: "23 nov",
      time: "14:00",
      stadium: "Khalifa International Stadium",
      status: "pending" as const,
    },
    {
      id: 26,
      team1: "Spain",
      team2: "Costa Rica",
      flag1: "ES",
      flag2: "CR",
      date: "23 nov",
      time: "17:00",
      stadium: "Al Thumama Stadium",
      status: "pending" as const,
    },
    {
      id: 27,
      team1: "Japan",
      team2: "Costa Rica",
      flag1: "JP",
      flag2: "CR",
      date: "27 nov",
      time: "11:00",
      stadium: "Ahmad Bin Ali Stadium",
      status: "pending" as const,
    },
    {
      id: 28,
      team1: "Spain",
      team2: "Germany",
      flag1: "ES",
      flag2: "DE",
      date: "27 nov",
      time: "20:00",
      stadium: "Al Bayt Stadium",
      status: "pending" as const,
    },
    {
      id: 29,
      team1: "Japan",
      team2: "Spain",
      flag1: "JP",
      flag2: "ES",
      date: "01 dic",
      time: "20:00",
      stadium: "Khalifa International Stadium",
      status: "pending" as const,
    },
    {
      id: 30,
      team1: "Costa Rica",
      team2: "Germany",
      flag1: "CR",
      flag2: "DE",
      date: "01 dic",
      time: "20:00",
      stadium: "Al Bayt Stadium",
      status: "pending" as const,
    },
  ],
  F: [
    {
      id: 31,
      team1: "Morocco",
      team2: "Croatia",
      flag1: "MA",
      flag2: "HR",
      date: "23 nov",
      time: "11:00",
      stadium: "Al Bayt Stadium",
      status: "pending" as const,
    },
    {
      id: 32,
      team1: "Belgium",
      team2: "Canada",
      flag1: "BE",
      flag2: "CA",
      date: "23 nov",
      time: "20:00",
      stadium: "Ahmad Bin Ali Stadium",
      status: "pending" as const,
    },
    {
      id: 33,
      team1: "Belgium",
      team2: "Morocco",
      flag1: "BE",
      flag2: "MA",
      date: "27 nov",
      time: "14:00",
      stadium: "Al Thumama Stadium",
      status: "pending" as const,
    },
    {
      id: 34,
      team1: "Croatia",
      team2: "Canada",
      flag1: "HR",
      flag2: "CA",
      date: "27 nov",
      time: "17:00",
      stadium: "Khalifa International Stadium",
      status: "pending" as const,
    },
    {
      id: 35,
      team1: "Croatia",
      team2: "Belgium",
      flag1: "HR",
      flag2: "BE",
      date: "01 dic",
      time: "16:00",
      stadium: "Ahmad Bin Ali Stadium",
      status: "pending" as const,
    },
    {
      id: 36,
      team1: "Canada",
      team2: "Morocco",
      flag1: "CA",
      flag2: "MA",
      date: "01 dic",
      time: "16:00",
      stadium: "Al Thumama Stadium",
      status: "pending" as const,
    },
  ],
  G: [
    {
      id: 37,
      team1: "Switzerland",
      team2: "Cameroon",
      flag1: "CH",
      flag2: "CM",
      date: "24 nov",
      time: "11:00",
      stadium: "Al Janoub Stadium",
      status: "pending" as const,
    },
    {
      id: 38,
      team1: "Brazil",
      team2: "Serbia",
      flag1: "BR",
      flag2: "RS",
      date: "24 nov",
      time: "20:00",
      stadium: "Lusail Stadium",
      status: "pending" as const,
    },
    {
      id: 39,
      team1: "Cameroon",
      team2: "Serbia",
      flag1: "CM",
      flag2: "RS",
      date: "28 nov",
      time: "11:00",
      stadium: "Al Janoub Stadium",
      status: "pending" as const,
    },
    {
      id: 40,
      team1: "Brazil",
      team2: "Switzerland",
      flag1: "BR",
      flag2: "CH",
      date: "28 nov",
      time: "17:00",
      stadium: "Stadium 974",
      status: "pending" as const,
    },
    {
      id: 41,
      team1: "Serbia",
      team2: "Switzerland",
      flag1: "RS",
      flag2: "CH",
      date: "02 dic",
      time: "20:00",
      stadium: "Stadium 974",
      status: "pending" as const,
    },
    {
      id: 42,
      team1: "Cameroon",
      team2: "Brazil",
      flag1: "CM",
      flag2: "BR",
      date: "02 dic",
      time: "20:00",
      stadium: "Lusail Stadium",
      status: "pending" as const,
    },
  ],
  H: [
    {
      id: 43,
      team1: "Uruguay",
      team2: "South Korea",
      flag1: "UY",
      flag2: "KR",
      date: "24 nov",
      time: "14:00",
      stadium: "Education City Stadium",
      status: "pending" as const,
    },
    {
      id: 44,
      team1: "Portugal",
      team2: "Ghana",
      flag1: "PT",
      flag2: "GH",
      date: "24 nov",
      time: "17:00",
      stadium: "Stadium 974",
      status: "pending" as const,
    },
    {
      id: 45,
      team1: "South Korea",
      team2: "Ghana",
      flag1: "KR",
      flag2: "GH",
      date: "28 nov",
      time: "14:00",
      stadium: "Education City Stadium",
      status: "pending" as const,
    },
    {
      id: 46,
      team1: "Portugal",
      team2: "Uruguay",
      flag1: "PT",
      flag2: "UY",
      date: "28 nov",
      time: "20:00",
      stadium: "Lusail Stadium",
      status: "pending" as const,
    },
    {
      id: 47,
      team1: "Ghana",
      team2: "Uruguay",
      flag1: "GH",
      flag2: "UY",
      date: "02 dic",
      time: "16:00",
      stadium: "Al Janoub Stadium",
      status: "pending" as const,
    },
    {
      id: 48,
      team1: "South Korea",
      team2: "Portugal",
      flag1: "KR",
      flag2: "PT",
      date: "02 dic",
      time: "16:00",
      stadium: "Education City Stadium",
      status: "pending" as const,
    },
  ],
};

export function GroupStagePredictions() {
  const [predictions, setPredictions] = useState<
    Record<number, { score1: string; score2: string }>
  >({});
  const [selectedGroup, setSelectedGroup] = useState<keyof typeof groups>("A");

  const handleScoreChange = (
    matchId: number,
    team: "score1" | "score2",
    value: string
  ) => {
    setPredictions((prev) => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        score1: team === "score1" ? value : prev[matchId]?.score1 || "",
        score2: team === "score2" ? value : prev[matchId]?.score2 || "",
      },
    }));
  };

  const handleSave = () => {
    toast.success("Predicciones guardadas correctamente");
  };

  const currentMatches = groups[selectedGroup];
  const pendingCount = currentMatches.filter(
    (m) => m.status === "pending"
  ).length;
  const predictedCount = currentMatches.filter((m) => {
    const pred = predictions[m.id];
    return pred?.score1 !== "" && pred?.score2 !== "" && m.status === "pending";
  }).length;

  const allGroupsCount = Object.values(groups).flat().length;
  const allPredictedCount = Object.values(groups)
    .flat()
    .filter((m) => {
      const pred = predictions[m.id];
      return pred?.score1 !== "" && pred?.score2 !== "";
    }).length;

  return (
    <div className="space-y-4 sm:space-y-6">
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

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <Badge variant="outline" className="gap-1.5 text-xs sm:text-sm">
          <span className="text-muted-foreground">Progreso:</span>
          <span className="font-semibold text-foreground">
            {allPredictedCount}/{allGroupsCount}
          </span>
        </Badge>
      </div>

      {/* Group Selector - Grid on mobile, ButtonGroup on tablet+ */}
      <div className="grid grid-cols-4 gap-2 sm:hidden">
        {(Object.keys(groups) as Array<keyof typeof groups>).map((group) => {
          const groupMatches = groups[group];
          const groupPredicted = groupMatches.filter((m) => {
            const pred = predictions[m.id];
            return pred?.score1 !== "" && pred?.score2 !== "";
          }).length;
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
        {(Object.keys(groups) as Array<keyof typeof groups>).map((group) => {
          const groupMatches = groups[group];
          const groupPredicted = groupMatches.filter((m) => {
            const pred = predictions[m.id];
            return pred?.score1 !== "" && pred?.score2 !== "";
          }).length;
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

      <div className="space-y-2.5 sm:space-y-3">
        {currentMatches.map((match) => (
          <MatchPredictionCard
            key={match.id}
            match={match}
            prediction={predictions[match.id]}
            onScoreChange={handleScoreChange}
          />
        ))}
      </div>

      <div className="sticky bottom-4 flex justify-center pt-4 sm:bottom-6">
        <Button
          onClick={handleSave}
          size="lg"
          className="gap-2 shadow-primary w-full sm:w-auto"
        >
          <Save className="size-4" />
          <span className="hidden sm:inline">Guardar predicciones</span>
          <span className="sm:hidden">Guardar</span>
        </Button>
      </div>
    </div>
  );
}
