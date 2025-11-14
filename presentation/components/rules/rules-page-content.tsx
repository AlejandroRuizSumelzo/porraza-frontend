"use client";

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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/presentation/components/ui/card";
import { Badge } from "@/presentation/components/ui/badge";
import { Separator } from "@/presentation/components/ui/separator";
import {
  Trophy,
  Target,
  Award,
  Clock,
  Users,
  TrendingUp,
  Medal,
  Zap,
  CheckCircle2,
  AlertCircle,
  Minus,
  Flag,
} from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * Rules Page Content Component (Client Component)
 * Displays comprehensive rules for the World Cup prediction game
 *
 * Sections:
 * - Scoring System: Point values for predictions
 * - Group Stage: Rules for group phase
 * - Knockout: Rules for elimination phase
 * - FIFA Rules: Official tournament rules
 */
export function RulesPageContent() {
  const { open, isMobile } = useSidebar();
  const t = useTranslations();

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        {(isMobile || !open) && <SidebarTrigger />}
        <h1 className="text-xl font-semibold">{t("rules.header.title")}</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-5xl space-y-6">
          {/* Introduction */}
          <Card className="pt-4 pb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="size-5 text-primary" />
                {t("rules.intro.title")}
              </CardTitle>
              <CardDescription>{t("rules.intro.description")}</CardDescription>
            </CardHeader>
          </Card>

          {/* Tabs for different sections */}
          <Tabs defaultValue="scoring" className="w-full">
            <TabsList className="mb-6 w-full justify-start">
              <TabsTrigger value="scoring" className="gap-2">
                <Target className="size-4" />
                {t("rules.tabs.scoring")}
              </TabsTrigger>
              <TabsTrigger value="groups" className="gap-2">
                <Users className="size-4" />
                {t("rules.tabs.groups")}
              </TabsTrigger>
              <TabsTrigger value="knockout" className="gap-2">
                <Trophy className="size-4" />
                {t("rules.tabs.knockout")}
              </TabsTrigger>
              <TabsTrigger value="fifa" className="gap-2">
                <Flag className="size-4" />
                {t("rules.tabs.fifa")}
              </TabsTrigger>
            </TabsList>

            {/* SCORING SYSTEM TAB */}
            <TabsContent value="scoring" className="space-y-6">
              {/* Group Stage Points */}
              <Card className="pt-4 pb-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="size-5" />
                    {t("rules.scoring.group.title")}
                  </CardTitle>
                  <CardDescription>
                    {t("rules.scoring.group.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="size-5 text-green-500" />
                        <div>
                          <p className="font-medium">
                            {t("rules.scoring.group.items.exact_result.title")}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t(
                              "rules.scoring.group.items.exact_result.description"
                            )}
                          </p>
                        </div>
                      </div>
                      <Badge variant="default" className="text-base">
                        +3 pts
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="size-5 text-blue-500" />
                        <div>
                          <p className="font-medium">
                            {t(
                              "rules.scoring.group.items.correct_outcome.title"
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t(
                              "rules.scoring.group.items.correct_outcome.description"
                            )}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-base">
                        +1 pt
                      </Badge>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div className="flex items-center gap-3">
                        <Medal className="size-5 text-amber-500" />
                        <div>
                          <p className="font-medium">
                            {t(
                              "rules.scoring.group.items.exact_position.title"
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t(
                              "rules.scoring.group.items.exact_position.description"
                            )}
                          </p>
                        </div>
                      </div>
                      <Badge variant="default" className="text-base">
                        +3 pts
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div className="flex items-center gap-3">
                        <Medal className="size-5 text-gray-500" />
                        <div>
                          <p className="font-medium">
                            {t(
                              "rules.scoring.group.items.team_qualified.title"
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t(
                              "rules.scoring.group.items.team_qualified.description"
                            )}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-base">
                        +1 pt
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Knockout Stage Points */}
              <Card className="pt-4 pb-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="size-5" />
                    {t("rules.scoring.knockout.title")}
                  </CardTitle>
                  <CardDescription>
                    {t("rules.scoring.knockout.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div className="flex items-center gap-3">
                        <Clock className="size-5 text-green-500" />
                        <div>
                          <p className="font-medium">
                            {t("rules.scoring.knockout.items.exact_90.title")}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t(
                              "rules.scoring.knockout.items.exact_90.description"
                            )}
                          </p>
                        </div>
                      </div>
                      <Badge variant="default" className="text-base">
                        +5 pts
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="size-5 text-blue-500" />
                        <div>
                          <p className="font-medium">
                            {t("rules.scoring.knockout.items.winner_90.title")}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t(
                              "rules.scoring.knockout.items.winner_90.description"
                            )}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-base">
                        +2 pts
                      </Badge>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div className="flex items-center gap-3">
                        <Zap className="size-5 text-amber-500" />
                        <div>
                          <p className="font-medium">
                            {t("rules.scoring.knockout.items.exact_et.title")}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t(
                              "rules.scoring.knockout.items.exact_et.description"
                            )}
                          </p>
                        </div>
                      </div>
                      <Badge variant="default" className="text-base">
                        +8 pts
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="size-5 text-purple-500" />
                        <div>
                          <p className="font-medium">
                            {t("rules.scoring.knockout.items.winner_et.title")}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t(
                              "rules.scoring.knockout.items.winner_et.description"
                            )}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-base">
                        +3 pts
                      </Badge>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div className="flex items-center gap-3">
                        <Target className="size-5 text-red-500" />
                        <div>
                          <p className="font-medium">
                            {t(
                              "rules.scoring.knockout.items.winner_pens.title"
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t(
                              "rules.scoring.knockout.items.winner_pens.description"
                            )}
                          </p>
                        </div>
                      </div>
                      <Badge variant="default" className="text-base">
                        +4 pts
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tournament Progress Points */}
              <Card className="pt-4 pb-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="size-5" />
                    {t("rules.scoring.progress.title")}
                  </CardTitle>
                  <CardDescription>
                    {t("rules.scoring.progress.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="size-5 text-primary mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-medium">
                          {t("rules.scoring.progress.cumulative.title")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {t("rules.scoring.progress.cumulative.description")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div>
                        <p className="font-medium">
                          {t("rules.scoring.progress.levels.r32")}
                        </p>
                      </div>
                      <Badge variant="secondary">+5 pts</Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div>
                        <p className="font-medium">
                          {t("rules.scoring.progress.levels.r16")}
                        </p>
                      </div>
                      <Badge variant="secondary">+10 pts</Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div>
                        <p className="font-medium">
                          {t("rules.scoring.progress.levels.qf")}
                        </p>
                      </div>
                      <Badge variant="secondary">+15 pts</Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div>
                        <p className="font-medium">
                          {t("rules.scoring.progress.levels.sf")}
                        </p>
                      </div>
                      <Badge variant="secondary">+25 pts</Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div>
                        <p className="font-medium">
                          {t("rules.scoring.progress.levels.final")}
                        </p>
                      </div>
                      <Badge variant="default">+40 pts</Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border bg-primary/10 p-3">
                      <div>
                        <p className="font-bold">
                          {t("rules.scoring.progress.levels.champion")}
                        </p>
                      </div>
                      <Badge variant="default" className="text-base font-bold">
                        +80 pts
                      </Badge>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-green-500/10 p-4 border-green-500/20">
                    <p className="text-sm font-medium text-green-700 dark:text-green-400">
                      {t("rules.scoring.progress.example")}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Awards Points */}
              <Card className="pt-4 pb-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="size-5" />
                    {t("rules.scoring.awards.title")}
                  </CardTitle>
                  <CardDescription>
                    {t("rules.scoring.awards.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div className="flex items-center gap-3">
                        <Trophy className="size-5 text-amber-500" />
                        <div>
                          <p className="font-medium">
                            {t("rules.scoring.awards.items.golden_boot.title")}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t(
                              "rules.scoring.awards.items.golden_boot.description"
                            )}
                          </p>
                        </div>
                      </div>
                      <Badge variant="default" className="text-base">
                        +50 pts
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div className="flex items-center gap-3">
                        <Award className="size-5 text-blue-500" />
                        <div>
                          <p className="font-medium">
                            {t("rules.scoring.awards.items.golden_ball.title")}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t(
                              "rules.scoring.awards.items.golden_ball.description"
                            )}
                          </p>
                        </div>
                      </div>
                      <Badge variant="default" className="text-base">
                        +50 pts
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div className="flex items-center gap-3">
                        <Medal className="size-5 text-purple-500" />
                        <div>
                          <p className="font-medium">
                            {t("rules.scoring.awards.items.golden_glove.title")}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t(
                              "rules.scoring.awards.items.golden_glove.description"
                            )}
                          </p>
                        </div>
                      </div>
                      <Badge variant="default" className="text-base">
                        +50 pts
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* GROUP STAGE TAB */}
            <TabsContent value="groups" className="space-y-6">
              <Card className="pt-4 pb-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="size-5" />
                    {t("rules.groups.title")}
                  </CardTitle>
                  <CardDescription>
                    {t("rules.groups.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-green-500" />
                        {t("rules.groups.format.title")}
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                        <li className="flex items-start gap-2">
                          <Minus className="size-4 mt-0.5 shrink-0" />
                          <span>
                            {t("rules.groups.format.items.round_robin")}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Minus className="size-4 mt-0.5 shrink-0" />
                          <span>
                            {t("rules.groups.format.items.points_system")}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Minus className="size-4 mt-0.5 shrink-0" />
                          <span>
                            {t("rules.groups.format.items.final_round")}
                          </span>
                        </li>
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Trophy className="size-4 text-amber-500" />
                        {t("rules.groups.qualification.title")}
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-green-500" />
                          <span>
                            {t("rules.groups.qualification.items.top_two")}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-green-500" />
                          <span>
                            {t("rules.groups.qualification.items.best_thirds")}
                          </span>
                        </li>
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <AlertCircle className="size-4 text-primary" />
                        {t("rules.groups.tiebreakers.title")}
                      </h3>
                      <div className="space-y-3">
                        <div className="rounded-lg border bg-card p-3">
                          <p className="font-medium text-sm mb-1">
                            {t(
                              "rules.groups.tiebreakers.items.h2h_points.title"
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t(
                              "rules.groups.tiebreakers.items.h2h_points.description"
                            )}
                          </p>
                        </div>
                        <div className="rounded-lg border bg-card p-3">
                          <p className="font-medium text-sm mb-1">
                            {t(
                              "rules.groups.tiebreakers.items.h2h_goal_diff.title"
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t(
                              "rules.groups.tiebreakers.items.h2h_goal_diff.description"
                            )}
                          </p>
                        </div>
                        <div className="rounded-lg border bg-card p-3">
                          <p className="font-medium text-sm mb-1">
                            {t(
                              "rules.groups.tiebreakers.items.h2h_goals_scored.title"
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t(
                              "rules.groups.tiebreakers.items.h2h_goals_scored.description"
                            )}
                          </p>
                        </div>
                        <div className="rounded-lg border bg-card p-3">
                          <p className="font-medium text-sm mb-1">
                            {t(
                              "rules.groups.tiebreakers.items.overall_goal_diff.title"
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t(
                              "rules.groups.tiebreakers.items.overall_goal_diff.description"
                            )}
                          </p>
                        </div>
                        <div className="rounded-lg border bg-card p-3">
                          <p className="font-medium text-sm mb-1">
                            {t(
                              "rules.groups.tiebreakers.items.overall_goals_scored.title"
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t(
                              "rules.groups.tiebreakers.items.overall_goals_scored.description"
                            )}
                          </p>
                        </div>
                        <div className="rounded-lg border bg-card p-3">
                          <p className="font-medium text-sm mb-1">
                            {t(
                              "rules.groups.tiebreakers.items.fair_play.title"
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t(
                              "rules.groups.tiebreakers.items.fair_play.description"
                            )}
                          </p>
                        </div>
                        <div className="rounded-lg border bg-card p-3">
                          <p className="font-medium text-sm mb-1">
                            {t(
                              "rules.groups.tiebreakers.items.fifa_ranking.title"
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t(
                              "rules.groups.tiebreakers.items.fifa_ranking.description"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Best Third Places */}
              <Card className="pt-4 pb-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Medal className="size-5" />
                    {t("rules.groups.best_thirds.title")}
                  </CardTitle>
                  <CardDescription>
                    {t("rules.groups.best_thirds.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="size-5 text-primary mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-medium">
                          {t("rules.groups.best_thirds.table_title")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {t("rules.groups.best_thirds.table_description")}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* KNOCKOUT TAB */}
            <TabsContent value="knockout" className="space-y-6">
              <Card className="pt-4 pb-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="size-5" />
                    {t("rules.knockout.title")}
                  </CardTitle>
                  <CardDescription>
                    {t("rules.knockout.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Target className="size-4 text-primary" />
                        {t("rules.knockout.structure.title")}
                      </h3>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                          <span className="text-sm">
                            {t("rules.knockout.structure.r32")}
                          </span>
                          <Badge variant="outline">
                            {t("rules.knockout.structure.teams_32")}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                          <span className="text-sm">
                            {t("rules.knockout.structure.r16")}
                          </span>
                          <Badge variant="outline">
                            {t("rules.knockout.structure.teams_16")}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                          <span className="text-sm">
                            {t("rules.knockout.structure.qf")}
                          </span>
                          <Badge variant="outline">
                            {t("rules.knockout.structure.teams_8")}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                          <span className="text-sm">
                            {t("rules.knockout.structure.sf")}
                          </span>
                          <Badge variant="outline">
                            {t("rules.knockout.structure.teams_4")}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border bg-primary/10 p-3">
                          <span className="text-sm font-semibold">
                            {t("rules.knockout.structure.final")}
                          </span>
                          <Badge variant="default">
                            {t("rules.knockout.structure.teams_2")}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Clock className="size-4 text-amber-500" />
                        {t("rules.knockout.match_format.title")}
                      </h3>
                      <div className="space-y-3">
                        <div className="rounded-lg border bg-card p-3">
                          <p className="font-medium text-sm mb-1">
                            {t("rules.knockout.match_format.regulation.title")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t(
                              "rules.knockout.match_format.regulation.description"
                            )}
                          </p>
                        </div>
                        <div className="rounded-lg border bg-card p-3">
                          <p className="font-medium text-sm mb-1">
                            {t("rules.knockout.match_format.extra_time.title")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t(
                              "rules.knockout.match_format.extra_time.description"
                            )}
                          </p>
                        </div>
                        <div className="rounded-lg border bg-card p-3">
                          <p className="font-medium text-sm mb-1">
                            {t("rules.knockout.match_format.penalties.title")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t(
                              "rules.knockout.match_format.penalties.description"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Zap className="size-4 text-blue-500" />
                        Rutas del Torneo
                      </h3>
                      <div className="rounded-lg border bg-muted/50 p-4">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="size-5 text-primary mt-0.5" />
                          <div className="space-y-1">
                            <p className="font-medium">
                              Optimización de Viajes
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Las llaves están divididas en dos rutas,
                              priorizando la disminución de distancias
                              recorridas e intervalos de tiempo de descanso
                              entre partidos.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* FIFA RULES TAB */}
            <TabsContent value="fifa" className="space-y-6">
              <Card className="pt-4 pb-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flag className="size-5" />
                    {t("rules.fifa.title")}
                  </CardTitle>
                  <CardDescription>{t("rules.fifa.subtitle")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border bg-primary/10 p-4 border-primary/20">
                    <div className="flex items-start gap-3">
                      <Trophy className="size-5 text-primary mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-semibold">
                          {t("rules.fifa.hero.title")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {t("rules.fifa.hero.description")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-3">
                        {t("rules.fifa.format.title")}
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-green-500" />
                          <span>{t("rules.fifa.format.teams_48")}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-green-500" />
                          <span>{t("rules.fifa.format.groups_12")}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-green-500" />
                          <span>{t("rules.fifa.format.advancers_32")}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-green-500" />
                          <span>
                            {t("rules.fifa.format.knockout_5_rounds")}
                          </span>
                        </li>
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-3">
                        {t("rules.fifa.group_points.title")}
                      </h3>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="size-4 text-green-500" />
                            <span className="text-sm">
                              {t("rules.fifa.group_points.win")}
                            </span>
                          </div>
                          <Badge variant="default">
                            {t("rules.fifa.group_points.win_points")}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                          <div className="flex items-center gap-2">
                            <Minus className="size-4 text-gray-500" />
                            <span className="text-sm">
                              {t("rules.fifa.group_points.draw")}
                            </span>
                          </div>
                          <Badge variant="secondary">
                            {t("rules.fifa.group_points.draw_points")}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="size-4 text-red-500" />
                            <span className="text-sm">
                              {t("rules.fifa.group_points.loss")}
                            </span>
                          </div>
                          <Badge variant="outline">
                            {t("rules.fifa.group_points.loss_points")}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-3">
                        {t("rules.fifa.hosts.title")}
                      </h3>
                      <div className="rounded-lg border bg-muted/50 p-4">
                        <div className="space-y-2 text-sm">
                          <p className="font-medium">
                            {t("rules.fifa.hosts.subtitle")}
                          </p>
                          <ul className="space-y-1 ml-6 text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <Minus className="size-4 mt-0.5 shrink-0" />
                              <span>{t("rules.fifa.hosts.usa")}</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Minus className="size-4 mt-0.5 shrink-0" />
                              <span>{t("rules.fifa.hosts.mexico")}</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Minus className="size-4 mt-0.5 shrink-0" />
                              <span>{t("rules.fifa.hosts.canada")}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Dates */}
              <Card className="pt-4 pb-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="size-5" />
                    {t("rules.fifa.info.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-lg border bg-card p-3">
                    <p className="font-medium text-sm mb-1">
                      {t("rules.fifa.info.last_round.title")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("rules.fifa.info.last_round.description")}
                    </p>
                  </div>
                  <div className="rounded-lg border bg-card p-3">
                    <p className="font-medium text-sm mb-1">
                      {t("rules.fifa.info.cards.title")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("rules.fifa.info.cards.description")}
                    </p>
                  </div>
                  <div className="rounded-lg border bg-card p-3">
                    <p className="font-medium text-sm mb-1">
                      {t("rules.fifa.info.fair_play.title")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("rules.fifa.info.fair_play.description")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
