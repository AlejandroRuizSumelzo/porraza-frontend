"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLeagueByInviteCodeClient } from "@/presentation/hooks/leagues/use-league-by-invite-code-client";
import { JoinLeagueClient } from "@/presentation/components/leagues/join-league-client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import { Button } from "@/presentation/components/ui/button";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { Progress } from "@/presentation/components/ui/progress";

interface Props {
  params: Promise<{ code: string }>;
}

/**
 * Join League by Code Page (Client Component)
 * Handles joining leagues using their unique code (6-20 alphanumeric characters)
 *
 * Routes:
 * - /leagues/join/PORRAZA2026 → League code (6-20 chars alphanumeric)
 *
 * Architecture Flow:
 * 1. Client Component fetches league data by code (requires auth)
 * 2. Fetches league using useLeagueByInviteCodeClient hook
 * 3. If league not found → shows not-found message
 * 4. If user already member → shows message for 5s then redirects
 * 5. Otherwise → shows JoinLeagueClient component
 *
 * IMPORTANT: Client Component (requires authentication)
 * - Uses cookies HTTP-only for authentication
 * - Authorization header added automatically
 * - Zustand integration via DI
 */
export default function JoinLeaguePage({ params }: Props) {
  const router = useRouter();
  const { code } = use(params);
  const [countdown, setCountdown] = useState(5);
  const [showAlreadyMember, setShowAlreadyMember] = useState(false);

  console.log("[JoinLeaguePage] Processing join request:", { code });

  // Fetch league by code (Client-side, with authentication)
  const { league, isLoading, error } = useLeagueByInviteCodeClient(code);

  // Handle user already being a member with 5-second countdown
  useEffect(() => {
    if (league?.isMember && !showAlreadyMember) {
      console.log("[JoinLeaguePage] User already member, showing message:", {
        leagueId: league.id,
        leagueName: league.name,
      });
      setShowAlreadyMember(true);
    }
  }, [league, showAlreadyMember]);

  // Countdown timer effect (separate from detection)
  useEffect(() => {
    if (!showAlreadyMember) return;

    // Countdown timer (5 seconds)
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [showAlreadyMember]);

  // Redirect when countdown reaches 0
  useEffect(() => {
    if (showAlreadyMember && countdown === 0) {
      router.push("/dashboard");
    }
  }, [showAlreadyMember, countdown, router]);

  // Already Member State - Show for 5 seconds before redirect
  if (showAlreadyMember && league) {
    const progressValue = ((5 - countdown) / 5) * 100;

    return (
      <div className="flex min-h-screen items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-md shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500 pt-4 pb-4">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">¡Ya eres miembro!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Success Icon with Animation */}
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative">
                <CheckCircle2 className="h-20 w-20 text-green-500 animate-in zoom-in duration-500" />
                {/* Pulsing ring effect */}
                <div className="absolute inset-0 rounded-full bg-green-500/20 animate-pulse" />
              </div>
            </div>

            {/* League Info */}
            <div className="text-center space-y-2">
              <p className="text-base text-muted-foreground">
                Ya formas parte de
              </p>
              <h3 className="text-xl font-bold text-foreground">
                {league.name}
              </h3>
              {league.description && (
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  {league.description}
                </p>
              )}
            </div>

            {/* Countdown Progress Bar */}
            <div className="space-y-3">
              <Progress value={progressValue} className="h-2" />
              <p className="text-sm text-center text-muted-foreground">
                Redirigiendo al dashboard en{" "}
                <span className="font-semibold text-foreground tabular-nums">
                  {countdown}s
                </span>
              </p>
            </div>

            {/* Quick Action Button */}
            <Button
              onClick={() => router.push("/dashboard")}
              className="w-full"
              size="lg"
            >
              Ir al Dashboard ahora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg font-medium text-muted-foreground">
              Cargando información de la liga...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error or league not found
  if (error || !league) {
    console.log("[JoinLeaguePage] League not found or error:", {
      code,
      error,
    });

    return (
      <div className="flex min-h-screen items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                Liga no encontrada
              </h2>
              <p className="text-muted-foreground">
                {error ||
                  "No pudimos encontrar una liga con el código proporcionado."}
              </p>
              <div className="pt-4">
                <button
                  onClick={() => router.push("/leagues")}
                  className="text-primary hover:underline font-medium"
                >
                  Ver todas las ligas
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  console.log("[JoinLeaguePage] Rendering join page:", {
    leagueId: league.id,
    leagueName: league.name,
    type: league.type,
  });

  return <JoinLeagueClient league={league} code={code} />;
}
