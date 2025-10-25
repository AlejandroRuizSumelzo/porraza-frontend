"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  SidebarTrigger,
  useSidebar,
} from "@/presentation/components/ui/sidebar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/components/ui/tabs";
import { toast } from "sonner";
import { useCreateLeagueClient } from "@/presentation/hooks/leagues/use-create-league-client";
import { useJoinLeagueClient } from "@/presentation/hooks/leagues/use-join-league-client";
import { usePublicLeaguesClient } from "@/presentation/hooks/leagues/use-public-leagues-client";
import { useMyLeaguesClient } from "@/presentation/hooks/leagues/use-my-leagues-client";
import type { League } from "@/domain/entities/league";
import type {
  CreateLeagueFormData,
  JoinLeagueCodeFormData,
} from "@/presentation/schemas/league-schema";
import { JoinLeagueTab } from "@/presentation/components/leagues/join-league-tab";
import { CreateLeagueTab } from "@/presentation/components/leagues/create-league-tab";
import { MyLeaguesTab } from "@/presentation/components/leagues/my-leagues-tab";
import { JoinConfirmationDialog } from "@/presentation/components/leagues/join-confirmation-dialog";
import { selectAddLeague } from "@/infrastructure/store/selectors";

/**
 * League Page Content Component
 * Main wrapper for the leagues page with all functionality
 * Similar structure to StadiumPageContent
 */
export function LeaguePageContent() {
  const router = useRouter();
  const { open, isMobile } = useSidebar();

  // Hooks
  const {
    createLeague,
    isCreating,
    error: createError,
  } = useCreateLeagueClient();
  const { joinLeague, isJoining, error: joinError } = useJoinLeagueClient();
  const {
    leagues: publicLeagues,
    isLoading: isLoadingPublic,
    error: publicError,
    refetch: refetchPublic,
  } = usePublicLeaguesClient();
  const {
    leagues: myLeagues,
    isLoading: isLoadingMy,
    error: myError,
    refetch: refetchMy,
  } = useMyLeaguesClient();

  // Add this selector
  const addLeague = selectAddLeague();

  // Dialog state
  const [confirmJoinDialog, setConfirmJoinDialog] = useState<{
    open: boolean;
    league: League | null;
    inviteCode?: string;
  }>({
    open: false,
    league: null,
  });

  // Handlers
  const handleCreateLeague = async (data: CreateLeagueFormData) => {
    const league = await createLeague({
      name: data.name,
      description: data.description || undefined,
      type: data.type,
    });

    if (league) {
      // Add the league to the Zustand store immediately
      addLeague(league);

      toast.success("Liga creada exitosamente", {
        description: `La liga "${league.name}" ha sido creada.`,
      });
      refetchMy();
      router.push("/dashboard");
    } else if (createError) {
      toast.error("Error al crear liga", {
        description: createError,
      });
    }
  };

  const handleJoinWithCode = async (_data: JoinLeagueCodeFormData) => {
    toast.info("Uniéndose a liga privada...");
    toast.error("Funcionalidad en desarrollo", {
      description:
        "Pronto podrás unirte a ligas privadas con código de invitación.",
    });
  };

  const openJoinConfirmation = (league: League, inviteCode?: string) => {
    setConfirmJoinDialog({
      open: true,
      league,
      inviteCode,
    });
  };

  const confirmJoin = async () => {
    const { league, inviteCode } = confirmJoinDialog;
    if (!league) return;

    const joinedLeague = await joinLeague(league.id, inviteCode);

    if (joinedLeague) {
      // Add the joined league to the Zustand store immediately
      addLeague(joinedLeague);

      toast.success("Te has unido a la liga exitosamente", {
        description: `Ahora eres miembro de "${joinedLeague.name}".`,
      });
      setConfirmJoinDialog({ open: false, league: null });
      refetchMy();
      refetchPublic();
      router.push("/dashboard");
    } else if (joinError) {
      toast.error("Error al unirse a la liga", {
        description: joinError,
      });
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        {(isMobile || !open) && <SidebarTrigger />}
        <h1 className="text-xl font-semibold">Gestión de Ligas</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-4xl">
          <Tabs defaultValue="join" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="join">Unirse a Liga</TabsTrigger>
              <TabsTrigger value="create">Crear Liga</TabsTrigger>
              <TabsTrigger value="my-leagues">Mis Ligas</TabsTrigger>
            </TabsList>

            <TabsContent value="join" className="mt-6">
              <JoinLeagueTab
                publicLeagues={publicLeagues}
                isLoadingPublic={isLoadingPublic}
                publicError={publicError}
                isJoining={isJoining}
                onJoinWithCode={handleJoinWithCode}
                onJoinPublicLeague={openJoinConfirmation}
              />
            </TabsContent>

            <TabsContent value="create" className="mt-6">
              <CreateLeagueTab
                isCreating={isCreating}
                onSubmit={handleCreateLeague}
              />
            </TabsContent>

            <TabsContent value="my-leagues" className="mt-6">
              <MyLeaguesTab
                leagues={myLeagues}
                isLoading={isLoadingMy}
                error={myError}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Join Confirmation Dialog */}
      <JoinConfirmationDialog
        open={confirmJoinDialog.open}
        league={confirmJoinDialog.league}
        isJoining={isJoining}
        onConfirm={confirmJoin}
        onCancel={() => setConfirmJoinDialog({ open: false, league: null })}
      />
    </div>
  );
}
