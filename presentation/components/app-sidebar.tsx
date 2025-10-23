"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

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
import { navigationItems } from "@/presentation/lib/routes";
import { useLogout } from "@/presentation/hooks/auth/use-logout";
import { toast } from "sonner";

export function AppSidebar() {
  const pathname = usePathname();
  const { logout, isLoading } = useLogout();

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
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
              disabled={isLoading}
            >
              <LogOut />
              <span>{isLoading ? "Cerrando sesión..." : "Cerrar sesión"}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
