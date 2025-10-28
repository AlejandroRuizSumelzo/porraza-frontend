import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // Idiomas soportados
  locales: ["en", "es"],

  // Idioma por defecto (español)
  defaultLocale: "es",

  // Configuración de prefijos en URL
  // 'as-needed' = español sin prefijo (/), inglés con prefijo (/en)
  localePrefix: "as-needed",
});

// Exportar utilidades de navegación tipadas
// Estas reemplazan los componentes nativos de Next.js para manejar i18n automáticamente
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

export type Locale = (typeof routing.locales)[number];
