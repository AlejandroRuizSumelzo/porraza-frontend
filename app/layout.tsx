import type { Metadata } from "next";
import { Poppins, Teko } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { DependencyProvider } from "@/di/client/providers/dependency-provider";

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${poppins.variable} ${teko.variable} antialiased`}>
        <DependencyProvider>
          {children}
          <Toaster richColors position="top-center" />
        </DependencyProvider>
      </body>
    </html>
  );
}
