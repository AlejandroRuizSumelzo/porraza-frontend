"use client";

import { Card, CardContent } from "@/presentation/components/ui/card";
import { Badge } from "@/presentation/components/ui/badge";
import { Button } from "@/presentation/components/ui/button";
import { Users, Lock, Globe, ChevronRight, Share2 } from "lucide-react";
import type { League } from "@/domain/entities/league";

interface LeagueCardProps {
  league: League;
  onAction?: (league: League) => void;
  actionLabel?: string;
  actionDisabled?: boolean;
  showAdminBadge?: boolean;
  showShareButton?: boolean;
  onShareInvite?: (league: League) => void;
}

/**
 * League Card Component
 * Reusable card for displaying league information
 * Supports different actions (Join, View, Share, etc.)
 *
 * Design: Uses brand colors
 * - Blue (#2a398d): Public leagues
 * - Red (#e61d25): Private leagues
 * - Green (#3cac3b): Admin badge
 */
export function LeagueCard({
  league,
  onAction,
  actionLabel = "Ver Liga",
  actionDisabled = false,
  showAdminBadge = false,
  showShareButton = false,
  onShareInvite,
}: LeagueCardProps) {
  const isPublic = league.type === "public";

  return (
    <Card className="group transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h3 className="font-semibold text-foreground">{league.name}</h3>

            {/* Admin Badge - Green */}
            {showAdminBadge && league.isAdmin && (
              <Badge
                variant="default"
                className="bg-secondary text-secondary-foreground"
              >
                Admin
              </Badge>
            )}

            {/* Type Badge - Blue for public, Red for private */}
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

          {league.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {league.description}
            </p>
          )}

          <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {league.currentMembers}
              {league.maxMembers ? ` / ${league.maxMembers}` : ""} miembros
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="ml-4 flex gap-2">
          {/* Share Button - Only for members */}
          {showShareButton && league.isMember && onShareInvite && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onShareInvite(league)}
              title="Compartir invitación"
            >
              <Share2 className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Compartir</span>
            </Button>
          )}

          {/* Main Action Button */}
          {onAction && (
            <Button
              onClick={() => onAction(league)}
              disabled={actionDisabled}
              size="sm"
            >
              {actionLabel}
              {!actionDisabled && <ChevronRight className="ml-1 h-4 w-4" />}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
