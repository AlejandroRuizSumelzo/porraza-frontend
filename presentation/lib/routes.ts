import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Trophy,
  Calendar,
  TrendingUp,
  BookOpen,
  Settings,
  Building,
  Shield,
} from "lucide-react";

export interface RouteItem {
  /**
   * Translation key for the route title
   * Will be resolved using next-intl: t(`navigation.${titleKey}`)
   */
  titleKey: string;
  /**
   * Route path WITHOUT locale prefix
   * next-intl will automatically prepend the locale
   * Example: "/dashboard" becomes "/dashboard" (es) or "/en/dashboard" (en)
   */
  href: string;
  icon: LucideIcon;
  /**
   * Translation key for the route description
   * Will be resolved using next-intl
   */
  descriptionKey?: string;
}

export interface RouteGroup {
  /**
   * Translation key for the group label
   */
  labelKey: string;
  items: RouteItem[];
}

/**
 * App routes configuration
 * Centralized routes for the application
 *
 * IMPORTANT: These paths do NOT include locale prefixes
 * next-intl middleware will automatically add them:
 * - Spanish (default): /dashboard
 * - English: /en/dashboard
 */
export const APP_ROUTES = {
  // Public routes
  public: {
    home: "/",
    pricing: "/pricing",
    privacy: "/privacy-policy",
    terms: "/legal/terms",
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
    teams: "/teams",
    leagues: "/leagues",
    leaderboard: "/leaderboard",
    rules: "/rules",
    settings: "/settings",
  },
} as const;

/**
 * Navigation items for the sidebar
 * Note: "Ligas" has been removed from navigation as it's now integrated
 * into the "Mis Ligas" collapsible section in the sidebar
 *
 * These use translation keys that will be resolved by next-intl:
 * - titleKey maps to messages/[locale].json -> navigation.[titleKey]
 * - descriptionKey maps to messages/[locale].json -> navigation.[descriptionKey]
 */
export const navigationItems: RouteItem[] = [
  {
    titleKey: "dashboard",
    href: APP_ROUTES.app.dashboard,
    icon: LayoutDashboard,
    descriptionKey: "dashboardDescription",
  },
  {
    titleKey: "predictions",
    href: APP_ROUTES.app.predictions,
    icon: Trophy,
    descriptionKey: "predictionsDescription",
  },
  {
    titleKey: "schedule",
    href: APP_ROUTES.app.schedule,
    icon: Calendar,
    descriptionKey: "scheduleDescription",
  },
  {
    titleKey: "stadiums",
    href: APP_ROUTES.app.stadiums,
    icon: Building,
    descriptionKey: "stadiumsDescription",
  },
  {
    titleKey: "teams",
    href: APP_ROUTES.app.teams,
    icon: Shield,
    descriptionKey: "teamsDescription",
  },
  {
    titleKey: "leaderboard",
    href: APP_ROUTES.app.leaderboard,
    icon: TrendingUp,
    descriptionKey: "leaderboardDescription",
  },
  {
    titleKey: "rules",
    href: APP_ROUTES.app.rules,
    icon: BookOpen,
    descriptionKey: "rulesDescription",
  },
  {
    titleKey: "settings",
    href: APP_ROUTES.app.settings,
    icon: Settings,
    descriptionKey: "settingsDescription",
  },
];

/**
 * Grouped navigation items (for more complex sidebar structures)
 * Note: Indexes updated after removing "Ligas" from navigation
 *
 * labelKey maps to messages/[locale].json -> navigation.groups.[labelKey]
 */
export const navigationGroups: RouteGroup[] = [
  {
    labelKey: "main",
    items: [
      navigationItems[0], // Dashboard
      navigationItems[1], // Predicciones
      navigationItems[2], // Calendario
    ],
  },
  {
    labelKey: "community",
    items: [
      navigationItems[3], // Estadios
      navigationItems[4], // Selecciones
      navigationItems[5], // Clasificación
    ],
  },
  {
    labelKey: "information",
    items: [
      navigationItems[6], // Reglas
      navigationItems[7], // Configuración
    ],
  },
];
