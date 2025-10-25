"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import { Input } from "@/presentation/components/ui/input";
import { Button } from "@/presentation/components/ui/button";
import { Spinner } from "@/presentation/components/ui/spinner";
import { Separator } from "@/presentation/components/ui/separator";
import { Lock, Globe, UserPlus } from "lucide-react";
import {
  joinLeagueCodeSchema,
  type JoinLeagueCodeFormData,
} from "@/presentation/schemas/league-schema";
import { LeagueCard } from "@/presentation/components/leagues/league-card";
import { LeagueEmptyState } from "@/presentation/components/leagues/league-empty-state";
import { LeagueGridSkeleton } from "@/presentation/components/leagues/league-skeleton";
import type { League } from "@/domain/entities/league";

interface JoinLeagueTabProps {
  publicLeagues: League[];
  isLoadingPublic: boolean;
  publicError: string | null;
  isJoining: boolean;
  onJoinWithCode: (data: JoinLeagueCodeFormData) => void;
  onJoinPublicLeague: (league: League) => void;
}

/**
 * Join League Tab Component
 * Contains:
 * - Private league code input
 * - Public leagues list
 */
export function JoinLeagueTab({
  publicLeagues,
  isLoadingPublic,
  publicError,
  isJoining,
  onJoinWithCode,
  onJoinPublicLeague,
}: JoinLeagueTabProps) {
  const joinCodeForm = useForm<JoinLeagueCodeFormData>({
    resolver: zodResolver(joinLeagueCodeSchema),
    defaultValues: {
      inviteCode: "",
    },
  });

  return (
    <div className="space-y-6">
      {/* Private League Code Section */}
      <Card className="border-destructive/20 pt-4 pb-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Lock className="h-5 w-5" />
            Código de Liga Privada
          </CardTitle>
          <CardDescription>
            Ingresa el código de invitación de 8 caracteres
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={joinCodeForm.handleSubmit(onJoinWithCode)}
            className="flex gap-2"
          >
            <div className="flex-1">
              <Input
                placeholder="ABC12345"
                maxLength={8}
                className="uppercase"
                {...joinCodeForm.register("inviteCode")}
              />
              {joinCodeForm.formState.errors.inviteCode && (
                <p className="mt-1 text-sm text-destructive">
                  {joinCodeForm.formState.errors.inviteCode.message}
                </p>
              )}
            </div>
            <Button type="submit" disabled={isJoining} variant="destructive">
              {isJoining ? (
                <Spinner className="h-4 w-4" />
              ) : (
                <UserPlus className="mr-2 h-4 w-4" />
              )}
              Unirse
            </Button>
          </form>
        </CardContent>
      </Card>

      <Separator className="my-6" />

      {/* Public Leagues Section */}
      <div>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-primary">
          <Globe className="h-5 w-5" />
          Ligas Públicas Disponibles
        </h2>

        {isLoadingPublic && <LeagueGridSkeleton count={4} />}

        {publicError && <LeagueEmptyState type="error" message={publicError} />}

        {!isLoadingPublic && !publicError && publicLeagues.length === 0 && (
          <LeagueEmptyState
            type="empty"
            message="No hay ligas públicas disponibles en este momento."
          />
        )}

        {!isLoadingPublic && publicLeagues.length > 0 && (
          <div className="space-y-3">
            {publicLeagues.map((league) => (
              <LeagueCard
                key={league.id}
                league={league}
                onAction={onJoinPublicLeague}
                actionLabel={league.isMember ? "Ya eres miembro" : "Unirse"}
                actionDisabled={league.isMember}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
