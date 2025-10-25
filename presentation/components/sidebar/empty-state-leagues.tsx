"use client";

import { Trophy, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/presentation/components/ui/button";

/**
 * Empty State for Leagues Sidebar
 * Shown when user has no leagues yet
 * Modern minimalist design with persuasive marketing message
 */
export function EmptyStateLeagues() {
  const router = useRouter();

  return (
    <div className="px-3 py-5 space-y-4">
      <div className="flex flex-col items-center text-center space-y-3">
        {/* Icon with gradient background */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary rounded-full blur-sm opacity-30" />
          <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/20 border border-primary/20">
            <Trophy className="h-6 w-6 text-primary" />
          </div>
        </div>

        {/* Text content */}
        <div className="space-y-1.5">
          <p className="text-sm font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            ¡Empieza a competir!
          </p>
          <p className="text-xs text-muted-foreground/90 leading-relaxed max-w-[180px]">
            Crea tu liga o únete a una para demostrar quién es el mejor
          </p>
        </div>
      </div>

      {/* CTA Button with modern styling */}
      <Button
        onClick={() => router.push("/leagues")}
        size="sm"
        className="w-full text-xs h-9 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-sm transition-all duration-200 hover:shadow-md group"
      >
        <span>Gestionar Ligas</span>
        <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
      </Button>
    </div>
  );
}
