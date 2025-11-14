"use client";

import { Card, CardContent } from "@/presentation/components/ui/card";
import { Badge } from "@/presentation/components/ui/badge";
import { Button } from "@/presentation/components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/presentation/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/presentation/components/ui/dropdown-menu";
import {
  Users,
  Lock,
  Globe,
  ChevronRight,
  Share2,
  MoreVertical,
  Edit,
} from "lucide-react";
import type { League } from "@/domain/entities/league";

interface LeagueCardProps {
  league: League;
  onAction?: (league: League) => void;
  actionLabel?: string;
  actionDisabled?: boolean;
  showAdminBadge?: boolean;
  showShareButton?: boolean;
  showEditMenu?: boolean;
  onShareInvite?: (league: League) => void;
  onEdit?: (league: League) => void;
}

/**
 * Helper function to get initials from league name
 * Returns first 2 characters of each word (max 2 words)
 * Example: "Liga Mundial 2026" -> "LM"
 */
function getLeagueInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
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
  showEditMenu = false,
  onShareInvite,
  onEdit,
}: LeagueCardProps) {
  const isPublic = league.visibility === "public";

  return (
    <Card className="group transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <CardContent className="flex items-center gap-4 p-4">
        {/* League Logo/Avatar */}
        <Avatar className="h-14 w-14 shrink-0 rounded-lg">
          {league.logoUrl ? (
            <AvatarImage
              src={league.logoUrl}
              alt={`Logo de ${league.name}`}
              className="object-cover"
            />
          ) : null}
          <AvatarFallback className="rounded-lg bg-primary/10 text-primary font-semibold text-lg">
            {getLeagueInitials(league.name)}
          </AvatarFallback>
        </Avatar>

        {/* League Content */}
        <div className="flex-1 min-w-0">
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
        <div className="flex shrink-0 gap-2">
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

          {/* Edit Menu - Only for admins */}
          {showEditMenu && league.isAdmin && onEdit && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  title="Opciones de administración"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => onEdit(league)}
                  className="cursor-pointer"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Editar liga</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
