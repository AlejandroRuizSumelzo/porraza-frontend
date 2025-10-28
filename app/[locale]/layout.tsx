import type { Metadata } from "next";
import { Poppins, Teko } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';
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

export const metadata: Metadata = {
  title: "Porraza",
  description: "Predice tu mundial, gana y celebra",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

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
          </NextIntlClientProvider>
        </DependencyProvider>
      </body>
    </html>
  );
}
