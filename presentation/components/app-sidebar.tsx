"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LogOut,
  CreditCard,
  Sparkles,
  Lock,
  Users,
  ChevronRight,
  Settings2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/presentation/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/presentation/components/ui/collapsible";
import { Button } from "@/presentation/components/ui/button";
import { Badge } from "@/presentation/components/ui/badge";
import { navigationItems } from "@/presentation/lib/routes";
import { useLogout } from "@/presentation/hooks/auth/use-logout";
import { usePaymentStatus } from "@/presentation/hooks/payments/use-payment-status";
import { useSyncLeagues } from "@/presentation/hooks/leagues/use-sync-leagues";
import {
  selectLeagues,
  selectSelectedLeagueId,
  selectSetSelectedLeagueId,
} from "@/infrastructure/store/selectors";
import { EmptyStateLeagues } from "@/presentation/components/sidebar/empty-state-leagues";
import { toast } from "sonner";

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, isLoading: isLoggingOut } = useLogout();
  const { hasPaid, isLoading: isLoadingPayment } = usePaymentStatus();

  // League state
  const leagues = selectLeagues();
  const selectedLeagueId = selectSelectedLeagueId();
  const setSelectedLeagueId = selectSetSelectedLeagueId();

  // Sync leagues on mount
  useSyncLeagues();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Sesión cerrada", {
        description: "Has cerrado sesión correctamente",
      });
    } catch (error) {
      toast.error("Error al cerrar sesión", {
        description: "No se pudo cerrar la sesión. Inténtalo de nuevo.",
      });
    }
  };

  const handleLeagueSelect = (leagueId: string) => {
    setSelectedLeagueId(leagueId);
    toast.success("Liga seleccionada", {
      description:
        leagues.find((l) => l.id === leagueId)?.name || "Liga actualizada",
    });
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between px-2 py-2">
          <div className="flex items-center gap-2">
            <img
              src="/logo/porraza-icon.webp"
              alt="Porraza Logo"
              className="h-8 w-8 rounded-lg"
            />
            <span className="text-lg font-bold">Porraza</span>
          </div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Mis Ligas - Collapsible (Context selector at the top) */}
        <Collapsible
          defaultOpen={leagues.length > 0}
          className="group/collapsible"
        >
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm transition-colors"
            >
              <CollapsibleTrigger>
                <Users className="h-4 w-4 mr-2" />
                <span className="font-medium">Mis Ligas</span>
                <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                {leagues.length === 0 ? (
                  <EmptyStateLeagues />
                ) : (
                  <>
                    <SidebarMenu>
                      {leagues.map((league) => (
                        <SidebarMenuItem key={league.id}>
                          <SidebarMenuButton
                            onClick={() => handleLeagueSelect(league.id)}
                            isActive={selectedLeagueId === league.id}
                            tooltip={league.description || league.name}
                            className="group/item transition-all duration-200"
                          >
                            <span className="truncate font-medium">
                              {league.name}
                            </span>
                            <Badge
                              variant="secondary"
                              className={`ml-auto shrink-0 text-[10px] px-2 py-0.5 font-semibold transition-all duration-200 ${
                                selectedLeagueId === league.id
                                  ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30"
                                  : "group-hover/item:bg-muted"
                              }`}
                            >
                              {league.currentMembers}
                            </Badge>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>

                    {/* Separator + Manage Leagues Button */}
                    <div className="px-2 pt-2 pb-1">
                      <div className="h-px bg-border/50 mb-2" />
                      <Button
                        onClick={() => router.push("/leagues")}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-xs h-8 text-muted-foreground hover:text-foreground transition-colors group/manage"
                      >
                        <Settings2 className="h-3.5 w-3.5 mr-2 transition-transform group-hover/manage:rotate-90 duration-300" />
                        <span>Gestionar Ligas</span>
                      </Button>
                    </div>
                  </>
                )}
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Payment banner - only show if not paid and not loading */}
        {!isLoadingPayment && !hasPaid && (
          <div className="mx-2 mb-4">
            <div className="relative rounded-lg bg-gradient-to-br from-primary via-secondary to-destructive p-[1.5px] shadow-md">
              <div className="bg-background rounded-lg p-3.5 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 text-sm font-bold">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                      Desbloquea Premium
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground/90 leading-relaxed">
                  Solo <span className="font-bold text-primary">€1.99</span>{" "}
                  para acceder a todas las funciones
                </p>
                <Button
                  onClick={() => router.push("/checkout")}
                  size="sm"
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-xs h-9 font-semibold shadow-sm transition-all duration-200 hover:shadow-md group"
                >
                  <CreditCard className="h-3.5 w-3.5 mr-1.5" />
                  <span>Completar Pago</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="font-medium">Explora</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isDisabled = !isLoadingPayment && !hasPaid;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild={!isDisabled}
                      isActive={!isDisabled && pathname === item.href}
                      tooltip={
                        isDisabled
                          ? "🔒 Completa el pago de €1.99 para acceder"
                          : item.title
                      }
                      className={
                        isDisabled
                          ? "opacity-40 cursor-not-allowed pointer-events-none select-none relative"
                          : "transition-all duration-200"
                      }
                    >
                      {isDisabled ? (
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            <item.icon className="opacity-60" />
                            <span className="opacity-60">{item.title}</span>
                          </div>
                          <Lock className="h-3 w-3 text-muted-foreground/50 shrink-0" />
                        </div>
                      ) : (
                        <Link href={item.href}>
                          <item.icon />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              tooltip="Cerrar sesión"
              disabled={isLoggingOut}
            >
              <LogOut />
              <span>
                {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
