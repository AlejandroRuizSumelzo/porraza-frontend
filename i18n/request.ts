import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Obtener locale del request (extraído por middleware)
  let locale = await requestLocale;

  // Validar que el locale sea uno de los soportados
  // Si no es válido, usar el idioma por defecto (español)
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    // Cargar mensajes dinámicamente según el locale
    // Next.js automáticamente hace code-splitting por idioma
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
