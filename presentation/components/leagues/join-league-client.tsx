"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import { Button } from "@/presentation/components/ui/button";
import { Badge } from "@/presentation/components/ui/badge";
import { Users, Lock, Globe, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useJoinLeagueClient } from "@/presentation/hooks/leagues/use-join-league-client";
import { selectAddLeague } from "@/infrastructure/store/selectors";
import type { League } from "@/domain/entities/league";

interface JoinLeagueClientProps {
  league: League;
  code?: string;
}

/**
 * Join League Client Component
 * Handles the UI for joining a league via invite link
 *
 * Features:
 * - League preview (name, description, type, members)
 * - Join confirmation
 * - Success animation
 * - Automatic redirect to dashboard
 *
 * Architecture:
 * - Client Component (uses hooks and browser APIs)
 * - Integrates with Zustand store
 * - Uses JoinLeagueUseCase via custom hook
 */
export function JoinLeagueClient({
  league,
  code,
}: JoinLeagueClientProps) {
  const router = useRouter();
  const { joinLeague, isJoining } = useJoinLeagueClient();
  const addLeague = selectAddLeague();
  const [hasJoined, setHasJoined] = useState(false);

  const handleJoin = async () => {
    console.log("[JoinLeagueClient] Attempting to join league:", {
      leagueId: league.id,
      leagueName: league.name,
      code,
    });

    const joinedLeague = await joinLeague(league.id, code);

    if (joinedLeague) {
      setHasJoined(true);
      addLeague(joinedLeague);

      toast.success("¡Te has unido a la liga!", {
        description: `Ahora eres miembro de "${joinedLeague.name}".`,
      });

      // Redirect to dashboard after 1.5 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    }
  };

  const isPublic = league.type === "public";

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl">
            {hasJoined ? "¡Bienvenido!" : "Invitación a Liga"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Success State */}
          {hasJoined && (
            <div className="flex flex-col items-center justify-center py-6">
              <CheckCircle2 className="h-16 w-16 text-green-500 mb-4 animate-in zoom-in duration-300" />
              <p className="text-lg font-semibold text-center">
                Te has unido exitosamente
              </p>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Redirigiendo al dashboard...
              </p>
            </div>
          )}

          {/* Join Form */}
          {!hasJoined && (
            <>
              {/* League Info */}
              <div className="text-center space-y-3">
                <h2 className="text-2xl font-bold text-foreground">
                  {league.name}
                </h2>

                {league.description && (
                  <p className="text-muted-foreground text-sm">
                    {league.description}
                  </p>
                )}

                <div className="flex items-center justify-center gap-2">
                  <Badge
                    variant="secondary"
                    className={
                      isPublic
                        ? "border-primary/20 bg-primary/10 text-primary"
                        : "border-destructive/20 bg-destructive/10 text-destructive"
                    }
                  >
                    {isPublic ? (
                      <>
                        <Globe className="mr-1 h-3 w-3" />
                        Pública
                      </>
                    ) : (
                      <>
                        <Lock className="mr-1 h-3 w-3" />
                        Privada
                      </>
                    )}
                  </Badge>
                </div>

                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {league.currentMembers}
                  {league.maxMembers ? ` / ${league.maxMembers}` : ""} miembros
                </div>
              </div>

              {/* League Code Display */}
              {code && (
                <div className="rounded-lg border bg-muted/30 p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-2">
                    Código de liga
                  </p>
                  <p className="font-mono text-lg font-semibold tracking-wider">
                    {code}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-2 pt-4">
                <Button
                  onClick={handleJoin}
                  disabled={isJoining}
                  className="w-full"
                  size="lg"
                >
                  {isJoining ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uniéndose...
                    </>
                  ) : (
                    "Unirse a la Liga"
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => router.push("/leagues")}
                  className="w-full"
                  disabled={isJoining}
                >
                  Ver todas las ligas
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
