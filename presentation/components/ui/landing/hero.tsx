"use client";

import { useTranslations, useMessages } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/presentation/components/ui/button";
import { Badge } from "@/presentation/components/ui/badge";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { ArrowRight, CheckCircle2, Zap, Users } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/presentation/utils/cn";

export function Hero() {
  const t = useTranslations("landing.hero");
  const messages = useMessages();

  const features = messages.landing.hero.features as string[];
  const featureColors: Array<"primary" | "secondary" | "destructive"> = [
    "primary",
    "secondary",
    "destructive",
    "primary",
  ];

  const tags = messages.landing.hero.tags as string[];
  const tagVariants: Array<"primary" | "secondary" | "destructive"> = [
    "primary",
    "secondary",
    "destructive",
    "primary",
    "secondary",
  ];

  return (
    <section
      className="relative overflow-hidden bg-background py-20 md:py-32"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 right-1/3 h-80 w-80 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-destructive/5 blur-3xl" />
      </div>

      <div className="container-responsive">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Badge className="w-fit accent-secondary border gap-2">
                <Zap className="h-3 w-3" />
                {t("badge")}
              </Badge>
            </motion.div>

            <motion.h1
              id="hero-title"
              className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {t.rich("title", {
                highlight: (chunks) => (
                  <span className="gradient-text-tricolor animate-in">
                    {chunks}
                  </span>
                ),
              })}
            </motion.h1>

            <motion.p
              className="leading-relaxed text-lg text-muted-foreground md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {t.rich("description", {
                strongPrimary: (chunks) => (
                  <strong className="font-semibold text-primary">
                    {chunks}
                  </strong>
                ),
                emphasis: (chunks) => (
                  <em className="font-medium text-secondary">{chunks}</em>
                ),
                strongDestructive: (chunks) => (
                  <strong className="font-semibold text-destructive">
                    {chunks}
                  </strong>
                ),
                strongFinal: (chunks) => (
                  <span className="font-semibold text-foreground">
                    {chunks}
                  </span>
                ),
              })}
            </motion.p>

            <motion.ul
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {features.map((feature, index) => (
                <motion.li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                >
                  <CheckCircle2
                    className={cn(
                      "h-4 w-4 shrink-0",
                      featureColors[index] === "primary" && "text-primary",
                      featureColors[index] === "secondary" && "text-secondary",
                      featureColors[index] === "destructive" &&
                        "text-destructive"
                    )}
                  />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button
                  size="lg"
                  className="bg-primary text-base text-primary-foreground hover:bg-primary/90 shadow-primary transition-smooth w-full sm:w-auto"
                  asChild
                >
                  <Link href="/signup" aria-label={t("cta.primary.aria")}>
                    {t("cta.primary.label")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-background/50 text-base backdrop-blur-sm hover:bg-secondary/10 hover:text-secondary hover:border-secondary/30 transition-smooth w-full sm:w-auto"
                  asChild
                >
                  <Link href="/login" aria-label={t("cta.secondary.aria")}>
                    <Users className="mr-2 h-5 w-5" />
                    {t("cta.secondary.label")}
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
              <p className="text-sm text-muted-foreground">
                {t.rich("note", {
                  strong: (chunks) => (
                    <strong className="font-semibold text-foreground">
                      {chunks}
                    </strong>
                  ),
                })}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            <Card className="overflow-hidden border-0 shadow-medium bg-gradient-to-br from-card via-card to-card/80">
              <CardContent className="p-0 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-destructive/20 z-10 pointer-events-none" />

                <motion.div
                  className="aspect-square overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/hero-photo.webp"
                    alt={t("image_alt")}
                    width={960}
                    height={960}
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                </motion.div>
              </CardContent>
            </Card>

            <motion.div
              className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-secondary/30 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -top-8 -left-8 h-40 w-40 rounded-full bg-primary/25 blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.25, 0.45, 0.25],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-1/2 -right-6 h-32 w-32 rounded-full bg-destructive/20 blur-3xl"
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>

        <motion.div
          className="mt-16 flex flex-wrap items-center justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {tags.map((tag, index) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Badge
                variant="outline"
                className={cn(
                  "px-4 py-1.5 text-xs font-medium backdrop-blur-sm transition-smooth cursor-default",
                  tagVariants[index] === "primary" &&
                    "accent-primary hover:shadow-primary/20",
                  tagVariants[index] === "secondary" &&
                    "accent-secondary hover:shadow-secondary/20",
                  tagVariants[index] === "destructive" &&
                    "accent-destructive hover:shadow-soft"
                )}
              >
                {tag}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
