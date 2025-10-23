"use client";

import Link from "next/link";
import { Badge } from "@/presentation/components/ui/badge";
import { Separator } from "@/presentation/components/ui/separator";
import { Linkedin, Mail, ExternalLink, Sparkles } from "lucide-react";
import { SiX, SiInstagram } from "@icons-pack/react-simple-icons";
import { motion } from "motion/react";
import { cn } from "@/presentation/lib/utils";

const productLinks = [
  { href: "#funcionalidades", label: "Funcionalidades", color: "primary" },
  { href: "#precios", label: "Precios", color: "secondary" },
  { href: "#preguntas", label: "Preguntas frecuentes", color: "destructive" },
];

const legalLinks = [
  { href: "/legal-advise", label: "Aviso legal" },
  { href: "/privacy-policy", label: "Política de privacidad" },
  { href: "/cookies-policy", label: "Política de cookies" },
  { href: "mailto:contacto@porraza.com", label: "Contacto y soporte" },
];

const socialLinks = [
  {
    href: "https://twitter.com/porraza",
    label: "Twitter de Porraza",
    icon: SiX,
    color: "primary",
  },
  {
    href: "https://www.instagram.com/porraza",
    label: "Instagram de Porraza",
    icon: SiInstagram,
    color: "secondary",
  },
  {
    href: "https://www.linkedin.com/company/porraza",
    label: "LinkedIn de Porraza",
    icon: Linkedin,
    color: "destructive",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative border-t border-border/40 bg-muted/20 overflow-hidden"
      aria-labelledby="footer-title"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute top-0 right-1/4 h-64 w-64 rounded-full bg-secondary/3 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[length:32px_32px]" />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Porraza",
            url: "https://porraza.com",
            logo: "https://porraza.com/logo.svg",
            sameAs: [
              "https://twitter.com/porraza",
              "https://www.instagram.com/porraza",
              "https://www.linkedin.com/company/porraza",
            ],
            contactPoint: [
              {
                "@type": "ContactPoint",
                email: "support@porraza.com",
                contactType: "customer support",
                availableLanguage: ["es", "en"],
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Porraza",
            url: "https://porraza.com",
          }),
        }}
      />

      <div className="container-responsive py-12 md:py-16">
        <h2 id="footer-title" className="sr-only">
          Información y enlaces de Porraza
        </h2>

        <div className="grid gap-12 md:grid-cols-4 lg:gap-16">
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="mb-6 flex items-center gap-2.5 group w-fit"
              aria-label="Inicio de Porraza"
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="/logo/porraza-icon.webp"
                  alt="Porraza"
                  className="h-8 w-8"
                />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Porraza
              </span>
            </Link>

            <p className="mb-6 leading-relaxed text-muted-foreground max-w-md">
              Plataforma para organizar tu{" "}
              <strong className="font-semibold text-primary">
                porra del Mundial 2026
              </strong>{" "}
              con <em className="font-medium text-secondary">ligas privadas</em>
              , puntuación automática y clasificación en tiempo real.{" "}
              <span className="font-semibold text-foreground">
                Pago único, sin suscripción.
              </span>
            </p>

            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge className="accent-secondary border gap-2 cursor-default">
                <Sparkles className="h-3 w-3" />
                Mundial 2026
              </Badge>
            </motion.div>

            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg",
                    "transition-all duration-300 group",
                    "hover:shadow-soft",
                    social.color === "primary" &&
                      "bg-primary/10 text-primary hover:bg-primary/20",
                    social.color === "secondary" &&
                      "bg-secondary/10 text-secondary hover:bg-secondary/20",
                    social.color === "destructive" &&
                      "bg-destructive/10 text-destructive hover:bg-destructive/20"
                  )}
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.nav
            aria-label="Navegación de producto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="mb-4 font-semibold text-foreground">Producto</h3>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "inline-flex items-center gap-2 text-sm transition-colors group",
                      "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "h-1 w-1 rounded-full transition-all duration-300",
                        "group-hover:w-4",
                        link.color === "primary" && "bg-primary",
                        link.color === "secondary" && "bg-secondary",
                        link.color === "destructive" && "bg-destructive"
                      )}
                    />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

          <motion.nav
            aria-label="Información legal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3 className="mb-4 font-semibold text-foreground">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm transition-colors text-muted-foreground hover:text-foreground group"
                  >
                    {link.label}
                    {link.href.startsWith("/") && (
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        </div>

        <motion.div
          className="mt-12 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Separator className="mb-8 bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
            <div className="text-sm text-muted-foreground">
              <p className="flex items-center justify-center gap-2 md:justify-start">
                © {currentYear} Porraza.{" "}
                <span className="hidden sm:inline">
                  Todos los derechos reservados.
                </span>
              </p>
              <p className="mt-2">
                Hecho para{" "}
                <strong className="font-semibold text-foreground">
                  ligas privadas
                </strong>{" "}
                de empresas y grupos de amigos.
              </p>
            </div>

            <motion.a
              href="mailto:support@porraza.com"
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm",
                "bg-primary/10 text-primary border border-primary/20",
                "hover:bg-primary/20 transition-all duration-300",
                "hover:shadow-primary/20 hover:shadow-soft"
              )}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="h-4 w-4" />
              <span className="font-medium">Contactar soporte</span>
            </motion.a>
          </div>
        </motion.div>
      </div>

      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-destructive opacity-50" />
    </footer>
  );
}
