"use client";

import { useTranslations } from "next-intl";
import { Users, Trophy, CreditCard, Globe } from "lucide-react";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Badge } from "@/presentation/components/ui/badge";
import { motion } from "motion/react";
import { cn } from "@/presentation/lib/utils";

const featureItems = [
  {
    icon: Users,
    color: "primary",
    gradient: "from-primary/10 to-primary/5",
    titleKey: "cards.create_leagues.title",
    descriptionKey: "cards.create_leagues.description",
  },
  {
    icon: Trophy,
    color: "secondary",
    gradient: "from-secondary/10 to-secondary/5",
    titleKey: "cards.live_scoring.title",
    descriptionKey: "cards.live_scoring.description",
  },
  {
    icon: CreditCard,
    color: "destructive",
    gradient: "from-destructive/10 to-destructive/5",
    titleKey: "cards.one_time_payment.title",
    descriptionKey: "cards.one_time_payment.description",
  },
  {
    icon: Globe,
    color: "primary",
    gradient: "from-primary/10 to-primary/5",
    titleKey: "cards.remote_play.title",
    descriptionKey: "cards.remote_play.description",
  },
] as const;

export function Features() {
  const t = useTranslations("landing.features");
  const priceValue = t("pricing_value");

  return (
    <section
      id="funcionalidades"
      className="relative bg-muted/30 py-20 md:py-32 overflow-hidden border-y border-border/40"
      aria-labelledby="features-title"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:24px_24px]" />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: t("badge"),
            itemListElement: featureItems.map((feature, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: t(feature.titleKey),
              description: t(feature.descriptionKey),
            })),
          }),
        }}
      />

      <div className="container-responsive">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="mb-4 inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Badge className="accent-primary border gap-2">
              <Trophy className="h-3 w-3" />
              {t("badge")}
            </Badge>
          </motion.div>

          <motion.h2
            id="features-title"
            className="text-balance mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {t.rich("title", {
              highlight: (chunks) => (
                <span className="gradient-text-tricolor">{chunks}</span>
              ),
            })}
          </motion.h2>

          <motion.p
            className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {t.rich("description", {
              strongPrimary: (chunks) => (
                <strong className="font-semibold text-primary">{chunks}</strong>
              ),
              emphasis: (chunks) => (
                <em className="font-medium text-secondary">{chunks}</em>
              ),
              strongDestructive: (chunks) => (
                <strong className="font-semibold text-destructive">
                  {chunks}
                </strong>
              ),
            })}
          </motion.p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" role="list">
          {featureItems.map((feature, index) => {
            const title = t(feature.titleKey);
            const description = t(feature.descriptionKey);

            return (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: 0.1 * index,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                role="listitem"
                aria-label={title}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card
                    className={cn(
                      "h-full min-h-[280px] bg-card/50 backdrop-blur-sm border-border/50",
                      "transition-all duration-300",
                      "hover:border-border hover:shadow-medium",
                      "group relative overflow-hidden"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br",
                        feature.gradient
                      )}
                    />

                    <CardContent className="relative pt-6">
                      <motion.div
                        className={cn(
                          "mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl",
                          "transition-all duration-300",
                          feature.color === "primary" &&
                            "bg-primary/10 group-hover:bg-primary/20 group-hover:shadow-primary/30",
                          feature.color === "secondary" &&
                            "bg-secondary/10 group-hover:bg-secondary/20 group-hover:shadow-secondary/30",
                          feature.color === "destructive" &&
                            "bg-destructive/10 group-hover:bg-destructive/20 group-hover:shadow-soft"
                        )}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 15,
                        }}
                      >
                        <feature.icon
                          className={cn(
                            "h-7 w-7 transition-colors duration-300",
                            feature.color === "primary" && "text-primary",
                            feature.color === "secondary" && "text-secondary",
                            feature.color === "destructive" &&
                              "text-destructive"
                          )}
                          aria-hidden="true"
                        />
                      </motion.div>

                      <h3
                        className={cn(
                          "mb-3 text-xl font-semibold transition-colors duration-300",
                          "group-hover:text-foreground"
                        )}
                      >
                        {title}
                      </h3>

                      <p className="leading-relaxed text-muted-foreground text-sm">
                        {description}
                      </p>
                    </CardContent>

                    <div
                      className={cn(
                        "absolute bottom-0 left-0 right-0 h-1 transform origin-left scale-x-0",
                        "group-hover:scale-x-100 transition-transform duration-500",
                        feature.color === "primary" &&
                          "bg-gradient-to-r from-primary to-primary/50",
                        feature.color === "secondary" &&
                          "bg-gradient-to-r from-secondary to-secondary/50",
                        feature.color === "destructive" &&
                          "bg-gradient-to-r from-destructive to-destructive/50"
                      )}
                    />
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Card className="inline-block bg-card/50 backdrop-blur-sm border-border/50 shadow-soft">
            <CardContent className="px-8 py-4">
              <div className="flex items-center gap-3 flex-wrap justify-center">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                  <p className="text-sm text-muted-foreground">
                    {t("highlights.no_subscription")}
                  </p>
                </div>
                <div className="hidden sm:block h-4 w-px bg-border" />
                <p className="text-sm text-muted-foreground">
                  {t.rich("highlights.pricing", {
                    strongPrice: (chunks) => (
                      <strong className="font-bold text-foreground text-base">
                        {chunks}
                      </strong>
                    ),
                    price: priceValue,
                  })}
                </p>
                <div className="hidden sm:block h-4 w-px bg-border" />
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">
                    {t("highlights.fast_start")}
                  </p>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="text-primary">→</span>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
