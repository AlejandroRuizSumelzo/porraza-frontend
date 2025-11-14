"use client";

import { useState } from "react";
import { toast } from "sonner";
import { LeagueCard } from "@/presentation/components/leagues/league-card";
import { LeagueEmptyState } from "@/presentation/components/leagues/league-empty-state";
import { LeagueGridSkeleton } from "@/presentation/components/leagues/league-skeleton";
import { ShareInviteDialog } from "@/presentation/components/leagues/share-invite-dialog";
import { EditLeagueDialog } from "@/presentation/components/leagues/edit-league-dialog";
import { useUpdateLeagueClient } from "@/presentation/hooks/leagues/use-update-league-client";
import { useUploadLeagueLogoClient } from "@/presentation/hooks/leagues/use-upload-league-logo-client";
import { selectUpdateLeague } from "@/infrastructure/store/selectors";
import type { League } from "@/domain/entities/league";
import type { EditLeagueFormData } from "@/presentation/schemas/league-schema";

interface MyLeaguesTabProps {
  leagues: League[];
  isLoading: boolean;
  error: string | null;
  onLeagueUpdated?: () => void;
}

/**
 * My Leagues Tab Component
 * Displays user's leagues with admin badge, share, and edit functionality
 */
export function MyLeaguesTab({
  leagues,
  isLoading,
  error,
  onLeagueUpdated,
}: MyLeaguesTabProps) {
  const [shareDialog, setShareDialog] = useState<{
    open: boolean;
    league: League | null;
  }>({ open: false, league: null });

  const [editDialog, setEditDialog] = useState<{
    open: boolean;
    league: League | null;
  }>({ open: false, league: null });

  const { updateLeague, isUpdating } = useUpdateLeagueClient();
  const { uploadLogo, isUploading } = useUploadLeagueLogoClient();
  const updateLeagueInStore = selectUpdateLeague();

  const handleShareInvite = (league: League) => {
    setShareDialog({ open: true, league });
  };

  const closeShareDialog = () => {
    setShareDialog({ open: false, league: null });
  };

  const handleEditLeague = (league: League) => {
    setEditDialog({ open: true, league });
  };

  const closeEditDialog = () => {
    setEditDialog({ open: false, league: null });
  };

  const confirmEditLeague = async (data: EditLeagueFormData) => {
    if (!editDialog.league) return;

    const updatedLeague = await updateLeague(editDialog.league.id, {
      name: data.name,
      description: data.description || undefined,
    });

    if (updatedLeague) {
      // Update the league in Zustand store with partial updates
      updateLeagueInStore(updatedLeague.id, {
        name: updatedLeague.name,
        description: updatedLeague.description,
        updatedAt: updatedLeague.updatedAt,
      });

      toast.success("Liga actualizada", {
        description: `La liga "${updatedLeague.name}" ha sido actualizada exitosamente.`,
      });

      closeEditDialog();

      // Optional callback to refetch leagues
      if (onLeagueUpdated) {
        onLeagueUpdated();
      }
    }
  };

  const handleUploadLogo = async (file: File) => {
    if (!editDialog.league) return;

    const updatedLeague = await uploadLogo(editDialog.league.id, file);

    if (updatedLeague) {
      // Update the league in Zustand store with the new logo
      updateLeagueInStore(updatedLeague.id, {
        logoUrl: updatedLeague.logoUrl,
        updatedAt: updatedLeague.updatedAt,
      });

      toast.success("Logo actualizado", {
        description: `El logo de "${updatedLeague.name}" ha sido actualizado exitosamente.`,
      });

      // Update the dialog's league state to show the new logo
      setEditDialog({ open: true, league: updatedLeague });

      // Optional callback to refetch leagues
      if (onLeagueUpdated) {
        onLeagueUpdated();
      }
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">
        Mis Ligas ({leagues.length})
      </h2>

      {isLoading && <LeagueGridSkeleton count={3} />}

      {error && <LeagueEmptyState type="error" message={error} />}

      {!isLoading && !error && leagues.length === 0 && (
        <LeagueEmptyState
          type="empty"
          message="No estás en ninguna liga todavía."
        />
      )}

      {!isLoading && leagues.length > 0 && (
        <div className="space-y-3">
          {leagues.map((league) => (
            <LeagueCard
              key={league.id}
              league={league}
              showAdminBadge
              showShareButton
              showEditMenu
              onShareInvite={handleShareInvite}
              onEdit={handleEditLeague}
            />
          ))}
        </div>
      )}

      {/* Share Invite Dialog */}
      <ShareInviteDialog
        open={shareDialog.open}
        league={shareDialog.league}
        onClose={closeShareDialog}
      />

      {/* Edit League Dialog */}
      <EditLeagueDialog
        open={editDialog.open}
        league={editDialog.league}
        isUpdating={isUpdating}
        isUploadingLogo={isUploading}
        onConfirm={confirmEditLeague}
        onUploadLogo={handleUploadLogo}
        onCancel={closeEditDialog}
      />
    </div>
  );
}
