"use client";

import { SidebarTrigger, useSidebar } from "@/presentation/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/presentation/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/presentation/components/ui/card";
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
  Flag
} from "lucide-react";

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

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        {(isMobile || !open) && <SidebarTrigger />}
        <h1 className="text-xl font-semibold">Reglas del juego</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-5xl space-y-6">
          {/* Introduction */}
          <Card className="pt-4 pb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="size-5 text-primary" />
                Bienvenido a Porraza Mundial 2026
              </CardTitle>
              <CardDescription>
                Compite con tus amigos prediciendo los resultados del Mundial de Fútbol.
                Conoce las reglas para maximizar tus puntos y escalar en el leaderboard.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Tabs for different sections */}
          <Tabs defaultValue="scoring" className="w-full">
            <TabsList className="mb-6 w-full justify-start">
              <TabsTrigger value="scoring" className="gap-2">
                <Target className="size-4" />
                Puntuación
              </TabsTrigger>
              <TabsTrigger value="groups" className="gap-2">
                <Users className="size-4" />
                Fase de Grupos
              </TabsTrigger>
              <TabsTrigger value="knockout" className="gap-2">
                <Trophy className="size-4" />
                Eliminatorias
              </TabsTrigger>
              <TabsTrigger value="fifa" className="gap-2">
                <Flag className="size-4" />
                Reglas FIFA
              </TabsTrigger>
            </TabsList>

            {/* SCORING SYSTEM TAB */}
            <TabsContent value="scoring" className="space-y-6">
              {/* Group Stage Points */}
              <Card className="pt-4 pb-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="size-5" />
                    Fase de Grupos
                  </CardTitle>
                  <CardDescription>
                    Puntos por acertar resultados de partidos y posiciones finales
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="size-5 text-green-500" />
                        <div>
                          <p className="font-medium">Resultado exacto</p>
                          <p className="text-sm text-muted-foreground">Ej: Predicción 2-1, Real 2-1</p>
                        </div>
                      </div>
                      <Badge variant="default" className="text-base">+3 pts</Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="size-5 text-blue-500" />
                        <div>
                          <p className="font-medium">Acierto 1X2 correcto</p>
                          <p className="text-sm text-muted-foreground">Aciertas ganador/empate pero no marcador</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-base">+1 pt</Badge>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div className="flex items-center gap-3">
                        <Medal className="size-5 text-amber-500" />
                        <div>
                          <p className="font-medium">Posición exacta en grupo</p>
                          <p className="text-sm text-muted-foreground">El equipo termina 1º o 2º como predijiste</p>
                        </div>
                      </div>
                      <Badge variant="default" className="text-base">+3 pts</Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div className="flex items-center gap-3">
                        <Medal className="size-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Equipo clasificado</p>
                          <p className="text-sm text-muted-foreground">Clasificó pero en diferente posición</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-base">+1 pt</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Knockout Stage Points */}
              <Card className="pt-4 pb-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="size-5" />
                    Fase Eliminatoria
                  </CardTitle>
                  <CardDescription>
                    Mayor dificultad = más puntos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div className="flex items-center gap-3">
                        <Clock className="size-5 text-green-500" />
                        <div>
                          <p className="font-medium">Resultado exacto en 90 minutos</p>
                          <p className="text-sm text-muted-foreground">Marcador exacto al final del tiempo reglamentario</p>
                        </div>
                      </div>
                      <Badge variant="default" className="text-base">+5 pts</Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="size-5 text-blue-500" />
                        <div>
                          <p className="font-medium">Ganador correcto en 90 minutos</p>
                          <p className="text-sm text-muted-foreground">Aciertas el ganador pero no el marcador</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-base">+2 pts</Badge>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div className="flex items-center gap-3">
                        <Zap className="size-5 text-amber-500" />
                        <div>
                          <p className="font-medium">Resultado exacto en prórroga</p>
                          <p className="text-sm text-muted-foreground">Marcador exacto al final de la prórroga</p>
                        </div>
                      </div>
                      <Badge variant="default" className="text-base">+8 pts</Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="size-5 text-purple-500" />
                        <div>
                          <p className="font-medium">Ganador correcto en prórroga</p>
                          <p className="text-sm text-muted-foreground">Aciertas ganador en prórroga pero no marcador</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-base">+3 pts</Badge>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div className="flex items-center gap-3">
                        <Target className="size-5 text-red-500" />
                        <div>
                          <p className="font-medium">Ganador correcto en penaltis</p>
                          <p className="text-sm text-muted-foreground">Partido se decidió por penaltis</p>
                        </div>
                      </div>
                      <Badge variant="default" className="text-base">+4 pts</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tournament Progress Points */}
              <Card className="pt-4 pb-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="size-5" />
                    Progreso en el Torneo (Acumulativo)
                  </CardTitle>
                  <CardDescription>
                    Gana puntos adicionales por acertar qué equipos avanzan en el torneo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="size-5 text-primary mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-medium">Puntos acumulativos</p>
                        <p className="text-sm text-muted-foreground">
                          Si aciertas que Brasil llega a la final y gana, obtienes puntos por cada ronda que avanza (R32 + R16 + Cuartos + Semifinal + Final + Campeón).
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div>
                        <p className="font-medium">Pasa a Ronda de 32</p>
                      </div>
                      <Badge variant="secondary">+5 pts</Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div>
                        <p className="font-medium">Pasa a Octavos (R16)</p>
                      </div>
                      <Badge variant="secondary">+10 pts</Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div>
                        <p className="font-medium">Pasa a Cuartos de Final</p>
                      </div>
                      <Badge variant="secondary">+15 pts</Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div>
                        <p className="font-medium">Pasa a Semifinales</p>
                      </div>
                      <Badge variant="secondary">+25 pts</Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div>
                        <p className="font-medium">Pasa a la Final</p>
                      </div>
                      <Badge variant="default">+40 pts</Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border bg-primary/10 p-3">
                      <div>
                        <p className="font-bold">Campeón del Mundial</p>
                      </div>
                      <Badge variant="default" className="text-base font-bold">+80 pts</Badge>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-green-500/10 p-4 border-green-500/20">
                    <p className="text-sm font-medium text-green-700 dark:text-green-400">
                      💡 Ejemplo: Si predices que Brasil gana el Mundial y aciertas, obtienes: 5 + 10 + 15 + 25 + 40 + 80 = <span className="font-bold">175 puntos</span>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Awards Points */}
              <Card className="pt-4 pb-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="size-5" />
                    Premios Individuales
                  </CardTitle>
                  <CardDescription>
                    Predice los ganadores de los premios del torneo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div className="flex items-center gap-3">
                        <Trophy className="size-5 text-amber-500" />
                        <div>
                          <p className="font-medium">Bota de Oro</p>
                          <p className="text-sm text-muted-foreground">Máximo goleador del torneo</p>
                        </div>
                      </div>
                      <Badge variant="default" className="text-base">+50 pts</Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div className="flex items-center gap-3">
                        <Award className="size-5 text-blue-500" />
                        <div>
                          <p className="font-medium">Balón de Oro</p>
                          <p className="text-sm text-muted-foreground">Mejor jugador del torneo</p>
                        </div>
                      </div>
                      <Badge variant="default" className="text-base">+50 pts</Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                      <div className="flex items-center gap-3">
                        <Medal className="size-5 text-purple-500" />
                        <div>
                          <p className="font-medium">Guante de Oro</p>
                          <p className="text-sm text-muted-foreground">Mejor portero del torneo</p>
                        </div>
                      </div>
                      <Badge variant="default" className="text-base">+50 pts</Badge>
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
                    Sistema de Competencia - Fase de Grupos
                  </CardTitle>
                  <CardDescription>
                    48 selecciones divididas en 12 grupos de 4 equipos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-green-500" />
                        Formato de Grupo
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                        <li className="flex items-start gap-2">
                          <Minus className="size-4 mt-0.5 shrink-0" />
                          <span>Cada equipo enfrenta a los otros 3 del grupo (sistema liguilla)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Minus className="size-4 mt-0.5 shrink-0" />
                          <span>Victoria = 3 puntos | Empate = 1 punto | Derrota = 0 puntos</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Minus className="size-4 mt-0.5 shrink-0" />
                          <span>La última jornada de cada grupo se juega al mismo día y hora</span>
                        </li>
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Trophy className="size-4 text-amber-500" />
                        Clasificación a Octavos
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-green-500" />
                          <span>Los 2 primeros lugares de cada grupo (24 equipos)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-green-500" />
                          <span>Los 8 mejores terceros lugares (según tabla general)</span>
                        </li>
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <AlertCircle className="size-4 text-primary" />
                        Criterios de Desempate
                      </h3>
                      <div className="space-y-3">
                        <div className="rounded-lg border bg-card p-3">
                          <p className="font-medium text-sm mb-1">1. Puntos en enfrentamientos directos</p>
                          <p className="text-xs text-muted-foreground">Entre equipos empatados</p>
                        </div>
                        <div className="rounded-lg border bg-card p-3">
                          <p className="font-medium text-sm mb-1">2. Diferencia de goles (enfrentamientos directos)</p>
                          <p className="text-xs text-muted-foreground">Goles a favor - Goles en contra</p>
                        </div>
                        <div className="rounded-lg border bg-card p-3">
                          <p className="font-medium text-sm mb-1">3. Goles marcados (enfrentamientos directos)</p>
                          <p className="text-xs text-muted-foreground">Total de goles a favor</p>
                        </div>
                        <div className="rounded-lg border bg-card p-3">
                          <p className="font-medium text-sm mb-1">4. Diferencia de goles general</p>
                          <p className="text-xs text-muted-foreground">En todos los partidos del grupo</p>
                        </div>
                        <div className="rounded-lg border bg-card p-3">
                          <p className="font-medium text-sm mb-1">5. Goles marcados general</p>
                          <p className="text-xs text-muted-foreground">En todos los partidos del grupo</p>
                        </div>
                        <div className="rounded-lg border bg-card p-3">
                          <p className="font-medium text-sm mb-1">6. Puntos de conducta deportiva</p>
                          <p className="text-xs text-muted-foreground">
                            Amarilla: -1 pt | Doble amarilla: -3 pts | Roja directa: -4 pts
                          </p>
                        </div>
                        <div className="rounded-lg border bg-card p-3">
                          <p className="font-medium text-sm mb-1">7. Clasificación Mundial FIFA</p>
                          <p className="text-xs text-muted-foreground">Ranking más reciente de FIFA</p>
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
                    Mejores Terceros Lugares
                  </CardTitle>
                  <CardDescription>
                    8 de los 12 terceros lugares clasifican a octavos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="size-5 text-primary mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-medium">Tabla General de Terceros</p>
                        <p className="text-sm text-muted-foreground">
                          Los 8 mejores terceros lugares se ordenan por los mismos criterios de desempate de la fase de grupos (puntos, diferencia de goles, goles marcados, etc.).
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
                    Fase de Eliminación Directa
                  </CardTitle>
                  <CardDescription>
                    5 rondas desde dieciseisavos hasta la final
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Target className="size-4 text-primary" />
                        Estructura del Torneo
                      </h3>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                          <span className="text-sm">Dieciseisavos de Final (R32)</span>
                          <Badge variant="outline">32 equipos</Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                          <span className="text-sm">Octavos de Final (R16)</span>
                          <Badge variant="outline">16 equipos</Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                          <span className="text-sm">Cuartos de Final</span>
                          <Badge variant="outline">8 equipos</Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                          <span className="text-sm">Semifinales</span>
                          <Badge variant="outline">4 equipos</Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border bg-primary/10 p-3">
                          <span className="text-sm font-semibold">Final</span>
                          <Badge variant="default">2 equipos</Badge>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Clock className="size-4 text-amber-500" />
                        Formato de Partidos
                      </h3>
                      <div className="space-y-3">
                        <div className="rounded-lg border bg-card p-3">
                          <p className="font-medium text-sm mb-1">Tiempo Reglamentario</p>
                          <p className="text-xs text-muted-foreground">90 minutos (2 tiempos de 45 minutos)</p>
                        </div>
                        <div className="rounded-lg border bg-card p-3">
                          <p className="font-medium text-sm mb-1">Prórroga (si hay empate)</p>
                          <p className="text-xs text-muted-foreground">30 minutos extra (2 tiempos de 15 minutos)</p>
                        </div>
                        <div className="rounded-lg border bg-card p-3">
                          <p className="font-medium text-sm mb-1">Penaltis (si persiste empate)</p>
                          <p className="text-xs text-muted-foreground">Tanda de penaltis según Reglas de Juego FIFA</p>
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
                            <p className="font-medium">Optimización de Viajes</p>
                            <p className="text-sm text-muted-foreground">
                              Las llaves están divididas en dos rutas, priorizando la disminución de distancias recorridas e intervalos de tiempo de descanso entre partidos.
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
                    Reglas Oficiales FIFA - Mundial 2026
                  </CardTitle>
                  <CardDescription>
                    Formato oficial del torneo según la FIFA
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border bg-primary/10 p-4 border-primary/20">
                    <div className="flex items-start gap-3">
                      <Trophy className="size-5 text-primary mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-semibold">Copa Mundial de Fútbol 2026</p>
                        <p className="text-sm text-muted-foreground">
                          Organizada por FIFA | Sede: Estados Unidos, Canadá y México
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-3">Formato del Torneo</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-green-500" />
                          <span><strong>48 selecciones</strong> participan en la fase final</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-green-500" />
                          <span><strong>12 grupos</strong> de 4 equipos cada uno</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-green-500" />
                          <span><strong>32 equipos</strong> clasifican a fase eliminatoria (24 primeros + 8 mejores terceros)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-green-500" />
                          <span><strong>5 rondas eliminatorias</strong> desde dieciseisavos hasta la final</span>
                        </li>
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-3">Puntuación en Fase de Grupos</h3>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="size-4 text-green-500" />
                            <span className="text-sm">Victoria</span>
                          </div>
                          <Badge variant="default">3 puntos</Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                          <div className="flex items-center gap-2">
                            <Minus className="size-4 text-gray-500" />
                            <span className="text-sm">Empate</span>
                          </div>
                          <Badge variant="secondary">1 punto</Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="size-4 text-red-500" />
                            <span className="text-sm">Derrota</span>
                          </div>
                          <Badge variant="outline">0 puntos</Badge>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-3">Sedes del Mundial 2026</h3>
                      <div className="rounded-lg border bg-muted/50 p-4">
                        <div className="space-y-2 text-sm">
                          <p className="font-medium">Primera Copa Mundial con 3 países anfitriones:</p>
                          <ul className="space-y-1 ml-6 text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <Minus className="size-4 mt-0.5 shrink-0" />
                              <span><strong>Estados Unidos:</strong> 11 ciudades sede</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Minus className="size-4 mt-0.5 shrink-0" />
                              <span><strong>México:</strong> 3 ciudades sede</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Minus className="size-4 mt-0.5 shrink-0" />
                              <span><strong>Canadá:</strong> 2 ciudades sede</span>
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
                    Información Importante
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-lg border bg-card p-3">
                    <p className="font-medium text-sm mb-1">Última jornada de grupos</p>
                    <p className="text-xs text-muted-foreground">
                      Todos los partidos de la última jornada de cada grupo se juegan simultáneamente (mismo día y hora) para evitar ventajas deportivas.
                    </p>
                  </div>
                  <div className="rounded-lg border bg-card p-3">
                    <p className="font-medium text-sm mb-1">Tarjetas y sanciones</p>
                    <p className="text-xs text-muted-foreground">
                      Las tarjetas amarillas se resetean después de cuartos de final. Las rojas pueden conllevar sanciones de más de un partido según gravedad.
                    </p>
                  </div>
                  <div className="rounded-lg border bg-card p-3">
                    <p className="font-medium text-sm mb-1">Fair Play</p>
                    <p className="text-xs text-muted-foreground">
                      El comportamiento deportivo (tarjetas recibidas) es uno de los criterios de desempate en fase de grupos.
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
