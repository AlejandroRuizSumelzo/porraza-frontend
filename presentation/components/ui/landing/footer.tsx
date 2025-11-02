"use client";

import { useTranslations, useMessages } from "next-intl";
import { Link } from "@/i18n/routing";
import { Badge } from "@/presentation/components/ui/badge";
import { Separator } from "@/presentation/components/ui/separator";
import { Linkedin, Mail, ExternalLink, Sparkles } from "lucide-react";
import { SiX, SiInstagram } from "@icons-pack/react-simple-icons";
import { motion } from "motion/react";
import { cn } from "@/presentation/utils/cn";

const productLinkConfig = [
  { href: "#funcionalidades", color: "primary" },
  { href: "#precios", color: "secondary" },
  { href: "#preguntas", color: "destructive" },
];

const legalLinkConfig = [
  { href: "/legal-advise" },
  { href: "/privacy-policy" },
  { href: "/cookies-policy" },
  { href: "mailto:contacto@porraza.com" },
];

const socialLinkConfig = [
  {
    href: "https://twitter.com/porraza",
    icon: SiX,
    color: "primary",
  },
  {
    href: "https://www.instagram.com/porraza",
    icon: SiInstagram,
    color: "secondary",
  },
  {
    href: "https://www.linkedin.com/company/porraza",
    icon: Linkedin,
    color: "destructive",
  },
];

export function Footer() {
  const t = useTranslations("landing.footer");
  const tCommon = useTranslations("common");
  const messages = useMessages();
  const currentYear = new Date().getFullYear();

  const footerMessages = messages.landing.footer as Record<string, unknown>;
  const productLinkLabels =
    (footerMessages.product_nav as Record<string, unknown>)?.links ?? [];
  const legalLinkLabels =
    (footerMessages.legal_nav as Record<string, unknown>)?.links ?? [];
  const socialLabels =
    (footerMessages.socials as Record<string, unknown>)?.labels ?? [];
  const jsonLdMessages = (footerMessages.jsonld ?? {}) as {
    organization_name?: string;
    organization_url?: string;
    logo?: string;
    same_as?: string[];
    contact_email?: string;
    website_name?: string;
    website_url?: string;
  };

  const contactEmail = jsonLdMessages.contact_email ?? "contacto@porraza.com";

  const productLinks = productLinkConfig
    .map((config, index) => ({
      ...config,
      label: (productLinkLabels as string[])[index] ?? "",
    }))
    .filter((link) => link.label);

  const legalLinks = legalLinkConfig
    .map((config, index) => ({
      ...config,
      label: (legalLinkLabels as string[])[index] ?? "",
    }))
    .filter((link) => link.label);

  const socialLinks = socialLinkConfig
    .map((config, index) => ({
      ...config,
      label: (socialLabels as string[])[index] ?? "",
    }))
    .filter((link) => link.label);

  const organizationJson = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: jsonLdMessages.organization_name ?? tCommon("app_name"),
    url: jsonLdMessages.organization_url ?? "https://porraza.com",
    logo: jsonLdMessages.logo ?? "https://porraza.com/logo.svg",
    sameAs: jsonLdMessages.same_as ?? [
      "https://twitter.com/porraza",
      "https://www.instagram.com/porraza",
      "https://www.linkedin.com/company/porraza",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: contactEmail,
        contactType: "customer support",
        availableLanguage: ["es", "en"],
      },
    ],
  };

  const websiteJson = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: jsonLdMessages.website_name ?? tCommon("app_name"),
    url: jsonLdMessages.website_url ?? "https://porraza.com",
  };

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
          __html: JSON.stringify(organizationJson),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJson),
        }}
      />

      <div className="container-responsive py-12 md:py-16">
        <h2 id="footer-title" className="sr-only">
          {tCommon("app_name")}
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
              aria-label={t("brand.aria_home")}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="/logo/porraza-icon.webp"
                  alt={tCommon("app_name")}
                  className="h-8 w-8"
                />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                {tCommon("app_name")}
              </span>
            </Link>

            <p className="mb-6 leading-relaxed text-muted-foreground max-w-md">
              {t.rich("brand.description", {
                strongPrimary: (chunks) => (
                  <strong className="font-semibold text-primary">{chunks}</strong>
                ),
                emphasis: (chunks) => (
                  <em className="font-medium text-secondary">{chunks}</em>
                ),
                strongFinal: (chunks) => (
                  <span className="font-semibold text-foreground">{chunks}</span>
                ),
              })}
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
                {t("badge_label")}
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
            aria-label={t("product_nav.aria")}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="mb-4 font-semibold text-foreground">
              {t("product_nav.heading")}
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <motion.li
                  key={`${link.href}-${index}`}
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
            aria-label={t("legal_nav.aria")}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3 className="mb-4 font-semibold text-foreground">
              {t("legal_nav.heading")}
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <motion.li
                  key={`${link.href}-${index}`}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                >
                  {link.href.startsWith("mailto") ? (
                    <a
                      href={link.href}
                      className="inline-flex items-center gap-2 text-sm transition-colors text-muted-foreground hover:text-foreground group"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 text-sm transition-colors text-muted-foreground hover:text-foreground group"
                    >
                      {link.label}
                      {link.href.startsWith("/") && (
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </Link>
                  )}
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
                {t("closing.copyright", { year: currentYear })}
              </p>
              <p className="mt-2">
                {t.rich("closing.tagline", {
                  strong: (chunks) => (
                    <strong className="font-semibold text-foreground">
                      {chunks}
                    </strong>
                  ),
                })}
              </p>
            </div>

            <motion.a
              href={`mailto:${contactEmail}`}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm",
                "bg-primary/10 text-primary border border-primary/20",
                "hover:bg-primary/20 transition-all duration-300",
                "hover:shadow-primary/20 hover:shadow-soft"
              )}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={t("cta.aria")}
            >
              <Mail className="h-4 w-4" />
              <span className="font-medium">{t("cta.label")}</span>
            </motion.a>
          </div>
        </motion.div>
      </div>

      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-destructive opacity-50" />
    </footer>
  );
}
