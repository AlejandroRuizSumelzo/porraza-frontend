import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Crear plugin de next-intl apuntando a la configuración de request
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
};

// Envolver la configuración con el plugin de next-intl
export default withNextIntl(nextConfig);
