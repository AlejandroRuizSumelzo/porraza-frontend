"use client";

import { useState } from "react";
import { LeagueCard } from "@/presentation/components/leagues/league-card";
import { LeagueEmptyState } from "@/presentation/components/leagues/league-empty-state";
import { LeagueGridSkeleton } from "@/presentation/components/leagues/league-skeleton";
import { ShareInviteDialog } from "@/presentation/components/leagues/share-invite-dialog";
import type { League } from "@/domain/entities/league";

interface MyLeaguesTabProps {
  leagues: League[];
  isLoading: boolean;
  error: string | null;
}

/**
 * My Leagues Tab Component
 * Displays user's leagues with admin badge and share functionality
 */
export function MyLeaguesTab({ leagues, isLoading, error }: MyLeaguesTabProps) {
  const [shareDialog, setShareDialog] = useState<{
    open: boolean;
    league: League | null;
  }>({ open: false, league: null });

  const handleShareInvite = (league: League) => {
    setShareDialog({ open: true, league });
  };

  const closeShareDialog = () => {
    setShareDialog({ open: false, league: null });
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
              onShareInvite={handleShareInvite}
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
    </div>
  );
}
