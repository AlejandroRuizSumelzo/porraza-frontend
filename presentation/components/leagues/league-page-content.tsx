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
import {
  UserPlus,
  PlusCircle,
  Library,
  Building2,
} from "lucide-react";
import { useCreateLeagueClient } from "@/presentation/hooks/leagues/use-create-league-client";
import { useJoinLeagueClient } from "@/presentation/hooks/leagues/use-join-league-client";
import { usePublicLeaguesClient } from "@/presentation/hooks/leagues/use-public-leagues-client";
import { useMyLeaguesClient } from "@/presentation/hooks/leagues/use-my-leagues-client";
import { useCorporateLeaguesClient } from "@/presentation/hooks/leagues/use-corporate-leagues-client";
import type { League } from "@/domain/entities/league";
import type {
  CreateLeagueFormData,
  JoinLeagueCodeFormData,
} from "@/presentation/schemas/league-schema";
import { JoinLeagueTab } from "@/presentation/components/leagues/join-league-tab";
import { CreateLeagueTab } from "@/presentation/components/leagues/create-league-tab";
import { MyLeaguesTab } from "@/presentation/components/leagues/my-leagues-tab";
import { CorporateLeaguesTab } from "@/presentation/components/leagues/corporate-leagues-tab";
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
  const {
    leagues: corporateLeagues,
    isLoading: isLoadingCorporate,
    error: corporateError,
    refetch: refetchCorporate,
  } = useCorporateLeaguesClient();

  // Add this selector
  const addLeague = selectAddLeague();

  // Dialog state
  const [confirmJoinDialog, setConfirmJoinDialog] = useState<{
    open: boolean;
    league: League | null;
    code?: string;
  }>({
    open: false,
    league: null,
  });

  // Handlers
  const handleCreateLeague = async (data: CreateLeagueFormData) => {
    const league = await createLeague({
      name: data.name,
      description: data.description || undefined,
      visibility: data.visibility,
      category: data.category,
      code: data.code || undefined,
      requiredEmailDomain: data.requiredEmailDomain || undefined,
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

  const openJoinConfirmation = (league: League, code?: string) => {
    setConfirmJoinDialog({
      open: true,
      league,
      code,
    });
  };

  const confirmJoin = async () => {
    const { league, code } = confirmJoinDialog;
    if (!league) return;

    const joinedLeague = await joinLeague(league.id, code);

    if (joinedLeague) {
      // Add the joined league to the Zustand store immediately
      addLeague(joinedLeague);

      toast.success("Te has unido a la liga exitosamente", {
        description: `Ahora eres miembro de "${joinedLeague.name}".`,
      });
      setConfirmJoinDialog({ open: false, league: null });
      refetchMy();
      refetchPublic();
      refetchCorporate();
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
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="join" className="gap-2">
                <UserPlus className="h-4 w-4" />
                <span className="hidden sm:inline">Unirse</span>
              </TabsTrigger>
              <TabsTrigger value="corporate" className="gap-2">
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">Empresas</span>
              </TabsTrigger>
              <TabsTrigger value="create" className="gap-2">
                <PlusCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Crear</span>
              </TabsTrigger>
              <TabsTrigger value="my-leagues" className="gap-2">
                <Library className="h-4 w-4" />
                <span className="hidden sm:inline">Mis Ligas</span>
              </TabsTrigger>
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

            <TabsContent value="corporate" className="mt-6">
              <CorporateLeaguesTab
                leagues={corporateLeagues}
                isLoading={isLoadingCorporate}
                error={corporateError}
                isJoining={isJoining}
                onJoinLeague={openJoinConfirmation}
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
                onLeagueUpdated={refetchMy}
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
