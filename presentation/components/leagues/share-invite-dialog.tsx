"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/presentation/components/ui/dialog";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { Copy, Check, Share2, Globe, Lock } from "lucide-react";
import { toast } from "sonner";
import type { League } from "@/domain/entities/league";

interface ShareInviteDialogProps {
  open: boolean;
  league: League | null;
  onClose: () => void;
}

/**
 * Share Invite Dialog Component
 * Allows users to share invitation links for leagues
 *
 * Features:
 * - Copy league code (all leagues)
 * - Copy invite URL (all leagues)
 * - Native share API support (mobile)
 * - Visual feedback on copy
 *
 * URL Format:
 * - All leagues: /leagues/join/{code} (6-20 chars alphanumeric)
 */
export function ShareInviteDialog({
  open,
  league,
  onClose,
}: ShareInviteDialogProps) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  if (!league) return null;

  // Generate invite URL using league code (works for both public and private leagues)
  const inviteUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/leagues/join/${league.code}`
      : "";

  const handleCopyCode = async () => {
    if (!league.code) return;

    try {
      await navigator.clipboard.writeText(league.code);
      setCopiedCode(true);
      toast.success("Código copiado al portapapeles");
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (error) {
      toast.error("Error al copiar el código");
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopiedUrl(true);
      toast.success("Enlace copiado al portapapeles");
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (error) {
      toast.error("Error al copiar el enlace");
    }
  };

  const handleShare = async () => {
    // Check if Web Share API is available (mobile devices)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Únete a mi liga: ${league.name}`,
          text: `Te invito a unirte a mi liga "${league.name}" en Porraza Mundial 2026!`,
          url: inviteUrl,
        });
      } catch (error) {
        // User cancelled share or share failed
        console.log("[ShareInviteDialog] Share cancelled or failed");
      }
    } else {
      // Fallback: just copy the URL
      handleCopyUrl();
    }
  };

  const isPublic = league.visibility === "public";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-primary" />
            Compartir Invitación
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* League Info */}
          <div className="rounded-lg border p-4 bg-muted/30">
            <h3 className="font-semibold text-lg">{league.name}</h3>
            {league.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {league.description}
              </p>
            )}
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-2">
              {isPublic ? (
                <>
                  <Globe className="h-3 w-3" />
                  Liga Pública
                </>
              ) : (
                <>
                  <Lock className="h-3 w-3" />
                  Liga Privada
                </>
              )}
            </p>
          </div>

          {/* League Code */}
          {league.code && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Código de Liga
              </label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  value={league.code}
                  readOnly
                  className="font-mono text-center text-lg tracking-wider font-semibold"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyCode}
                  title="Copiar código"
                >
                  {copiedCode ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">
                Los usuarios pueden usar este código para unirse a tu liga
              </p>
            </div>
          )}

          {/* Invite URL */}
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Enlace de Invitación
            </label>
            <div className="flex gap-2 mt-1.5">
              <Input
                value={inviteUrl}
                readOnly
                className="text-sm truncate"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyUrl}
                title="Copiar enlace"
              >
                {copiedUrl ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">
              Comparte este enlace para invitar usuarios directamente
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button onClick={handleShare} className="flex-1">
              <Share2 className="mr-2 h-4 w-4" />
              Compartir
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
