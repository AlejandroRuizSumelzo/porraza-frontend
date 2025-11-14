"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/presentation/components/ui/dialog";
import { Badge } from "@/presentation/components/ui/badge";
import { Button } from "@/presentation/components/ui/button";
import { Spinner } from "@/presentation/components/ui/spinner";
import { Users, Lock, Globe } from "lucide-react";
import type { League } from "@/domain/entities/league";

interface JoinConfirmationDialogProps {
  open: boolean;
  league: League | null;
  isJoining: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Join Confirmation Dialog Component
 * Shows league details before joining
 */
export function JoinConfirmationDialog({
  open,
  league,
  isJoining,
  onConfirm,
  onCancel,
}: JoinConfirmationDialogProps) {
  if (!league) return null;

  const isPublic = league.visibility === "public";

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Unirse a Liga</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que quieres unirte a esta liga?
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="rounded-lg border p-4">
            <h3 className="mb-1 font-semibold">{league.name}</h3>
            {league.description && (
              <p className="mb-3 text-sm text-muted-foreground">
                {league.description}
              </p>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {league.currentMembers} / {league.maxMembers} miembros
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel} disabled={isJoining}>
            Cancelar
          </Button>
          <Button onClick={onConfirm} disabled={isJoining}>
            {isJoining && <Spinner className="mr-2 h-4 w-4" />}
            Confirmar y Unirse
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
