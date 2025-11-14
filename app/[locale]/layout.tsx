import type { Metadata } from "next";
import { Poppins, Teko } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Toaster } from "sonner";
import { DependencyProvider } from "@/di/client/providers/dependency-provider";
import "../globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const teko = Teko({
  variable: "--font-teko",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Metadata optimizada por locale para SEO
const metadataByLocale: Record<
  Locale,
  {
    title: string;
    description: string;
    keywords: string[];
  }
> = {
  es: {
    title:
      "Porraza - Porra Mundial 2026 entre Amigos | Quiniela Online para Empresas",
    description:
      "Crea tu porra del Mundial 2026 con Porraza. App para porras de fútbol entre amigos y empresas. Ligas privadas, ranking en vivo y predicciones. Solo €1.99 por persona.",
    keywords: [
      // Marca + Core
      "porraza",
      "porraza app",
      "porraza mundial 2026",
      "porraza porras entre amigos",
      "porra mundial 2026",
      "porra fútbol mundial 2026",
      "quiniela mundial 2026",
      // Intención: Amigos
      "porra entre amigos mundial 2026",
      "porra mundial con amigos",
      "porras para grupos de amigos",
      "app para porras de fútbol",
      "hacer porra de fútbol online",
      "crear porra mundial 2026",
      "porra privada mundial 2026",
      "liga de porras entre amigos",
      // Intención: Empresas
      "porra para empresas mundial 2026",
      "porra de fútbol para empleados",
      "quiniela mundial 2026 para empresas",
      "actividades para empleados mundial 2026",
      // Long-tail
      "cómo organizar una porra del mundial 2026",
      "herramienta para hacer porras del mundial 2026",
      "plataforma de porras de fútbol",
      "porra online barata mundial 2026",
    ],
  },
  en: {
    title:
      "Porraza - World Cup 2026 Pool with Friends | Office Prediction Game",
    description:
      "Create your World Cup 2026 pool with Porraza. Football prediction game for friends and offices. Private leagues, live rankings, easy predictions. Only €1.99 per person.",
    keywords: [
      // Marca + Core
      "porraza",
      "porraza app",
      "porraza world cup 2026",
      "world cup 2026 pool",
      "football pool 2026",
      "world cup prediction game",
      // Intención: Friends
      "world cup pool with friends",
      "football pool with friends",
      "world cup 2026 bracket with friends",
      "prediction game with friends",
      "create football pool online",
      "private world cup pool",
      // Intención: Office/Companies
      "world cup 2026 office pool",
      "office prediction game",
      "world cup pool for coworkers",
      "employee world cup pool",
      // Long-tail
      "how to create world cup pool 2026",
      "world cup prediction platform",
      "best world cup pool app",
      "affordable world cup pool",
      // LATAM variants
      "quiniela mundial 2026 online",
      "prode mundial 2026",
    ],
  },
};

// Generar metadata dinámica basada en locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = metadataByLocale[locale as Locale] || metadataByLocale.es;

  const baseUrl = "https://porraza.com";
  const localePath = locale === "es" ? "" : `/${locale}`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: meta.title,
      template: "%s | Porraza",
    },
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: "Porraza Team" }],
    creator: "Porraza",
    publisher: "Porraza",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: [
      { rel: "icon", url: "/favicon.ico" },
      { rel: "apple-touch-icon", url: "/apple-icon.png" },
    ],
    manifest: "/manifest.json",
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      url: `${baseUrl}${localePath}`,
      siteName: "Porraza",
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: `${baseUrl}/hero-photo.webp`,
          width: 1200,
          height: 630,
          alt:
            locale === "es"
              ? "Porraza - Porra del Mundial 2026"
              : "Porraza - World Cup 2026 Pool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@porraza",
      creator: "@porraza",
      title: meta.title,
      description: meta.description,
      images: [`${baseUrl}/hero-photo.webp`],
    },
    alternates: {
      canonical: `${baseUrl}${localePath}`,
      languages: {
        es: `${baseUrl}`,
        en: `${baseUrl}/en`,
      },
    },
    verification: {
      // Añadir cuando tengas Google Search Console configurado
      // google: 'tu-codigo-de-verificacion',
    },
  };
}

// Pre-renderizar rutas para cada locale en build time
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  // Extraer locale de los params (dinámico desde la URL)
  const { locale } = await params;

  // Validar que el locale sea uno de los soportados
  // Si no es válido, mostrar página 404
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Cargar mensajes de traducción del servidor
  // next-intl automáticamente usa el locale correcto basado en el request
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${poppins.variable} ${teko.variable} antialiased`}>
        <DependencyProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
            <Toaster richColors position="top-center" />
            <Analytics />
            <SpeedInsights />
          </NextIntlClientProvider>
        </DependencyProvider>
      </body>
    </html>
  );
}
