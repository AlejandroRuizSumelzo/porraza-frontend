"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, CreditCard, Sparkles, Lock } from "lucide-react";

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
import { Button } from "@/presentation/components/ui/button";
import { navigationItems } from "@/presentation/lib/routes";
import { useLogout } from "@/presentation/hooks/auth/use-logout";
import { usePaymentStatus } from "@/presentation/hooks/payments/use-payment-status";
import { toast } from "sonner";

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, isLoading: isLoggingOut } = useLogout();
  const { hasPaid, isLoading: isLoadingPayment } = usePaymentStatus();

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
        {/* Payment banner - only show if not paid and not loading */}
        {!isLoadingPayment && !hasPaid && (
          <div className="mx-2 mb-4">
            <div className="relative rounded-lg bg-gradient-to-br from-primary via-secondary to-destructive p-[1.5px] shadow-lg animate-pulse">
              <div className="bg-background rounded-lg p-3 space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 text-sm font-bold">
                    <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                    <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                      Desbloquea Premium
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Solo <span className="font-bold text-primary">€1.99</span>{" "}
                  para acceder a todas las funciones
                </p>
                <Button
                  onClick={() => router.push("/checkout")}
                  size="sm"
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-xs h-9 font-semibold shadow-primary"
                >
                  <CreditCard className="h-3.5 w-3.5 mr-1.5" />
                  Completar Pago Ahora
                </Button>
              </div>
            </div>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
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
                          : ""
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
                          <span>{item.title}</span>
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
