import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Trophy,
  Calendar,
  Users,
  TrendingUp,
  BookOpen,
  Settings,
  Building,
} from "lucide-react";

export interface RouteItem {
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
}

export interface RouteGroup {
  label: string;
  items: RouteItem[];
}

/**
 * App routes configuration
 * Centralized routes for the application
 */
export const APP_ROUTES = {
  // Public routes
  public: {
    home: "/",
    pricing: "/pricing",
    privacy: "/privacy",
    terms: "/terms",
  },

  // Auth routes
  auth: {
    login: "/login",
    signup: "/signup",
  },

  // Protected app routes
  app: {
    dashboard: "/dashboard",
    predictions: "/predictions",
    schedule: "/schedule",
    stadiums: "/stadiums",
    leagues: "/leagues",
    leaderboard: "/leaderboard",
    rules: "/rules",
    settings: "/settings",
  },
} as const;

/**
 * Navigation items for the sidebar
 */
export const navigationItems: RouteItem[] = [
  {
    title: "Dashboard",
    href: APP_ROUTES.app.dashboard,
    icon: LayoutDashboard,
    description: "Vista general de tus predicciones",
  },
  {
    title: "Predicciones",
    href: APP_ROUTES.app.predictions,
    icon: Trophy,
    description: "Crea y gestiona tus predicciones",
  },
  {
    title: "Calendario",
    href: APP_ROUTES.app.schedule,
    icon: Calendar,
    description: "Próximos partidos y horarios",
  },
  {
    title: "Estadios",
    href: APP_ROUTES.app.stadiums,
    icon: Building,
    description: "Explora los estadios",
  },
  {
    title: "Ligas",
    href: APP_ROUTES.app.leagues,
    icon: Users,
    description: "Únete a ligas y compite",
  },
  {
    title: "Clasificación",
    href: APP_ROUTES.app.leaderboard,
    icon: TrendingUp,
    description: "Rankings y estadísticas",
  },
  {
    title: "Reglas",
    href: APP_ROUTES.app.rules,
    icon: BookOpen,
    description: "Reglas del juego y puntuación",
  },
  {
    title: "Configuración",
    href: APP_ROUTES.app.settings,
    icon: Settings,
    description: "Ajustes de tu cuenta",
  },
];

/**
 * Grouped navigation items (for more complex sidebar structures)
 */
export const navigationGroups: RouteGroup[] = [
  {
    label: "Principal",
    items: [
      navigationItems[0], // Dashboard
      navigationItems[1], // Predicciones
      navigationItems[2], // Calendario
    ],
  },
  {
    label: "Comunidad",
    items: [
      navigationItems[3], // Estadios
      navigationItems[4], // Ligas
      navigationItems[5], // Clasificación
    ],
  },
  {
    label: "Información",
    items: [
      navigationItems[6], // Reglas
      navigationItems[7], // Configuración
    ],
  },
];
