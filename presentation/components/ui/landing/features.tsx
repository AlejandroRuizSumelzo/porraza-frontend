"use client";

import { Users, Trophy, CreditCard, Globe } from "lucide-react";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Badge } from "@/presentation/components/ui/badge";
import { motion } from "motion/react";
import { cn } from "@/presentation/lib/utils";

const features = [
  {
    icon: Users,
    title: "Crea ligas privadas",
    description:
      "Organiza ligas exclusivas para tu empresa, equipo o grupo de amigos. Control de invitaciones y visibilidad: íntimo o masivo, tú decides.",
    color: "primary",
    gradient: "from-primary/10 to-primary/5",
  },
  {
    icon: Trophy,
    title: "Puntuación automática en vivo",
    description:
      "Actualizamos los marcadores tras cada partido del Mundial 2026. Clasificación en tiempo real sin hojas de cálculo ni trabajo manual.",
    color: "secondary",
    gradient: "from-secondary/10 to-secondary/5",
  },
  {
    icon: CreditCard,
    title: "Pago único y transparente",
    description:
      "Solo 1,99 € por usuario. Sin suscripciones, sin cuotas recurrentes y sin cargos ocultos.",
    color: "destructive",
    gradient: "from-destructive/10 to-destructive/5",
  },
  {
    icon: Globe,
    title: "Compite desde cualquier lugar",
    description:
      "Reta a compañeros y amigos en todo el mundo y descubre quién sabe más de fútbol.",
    color: "primary",
    gradient: "from-primary/10 to-primary/5",
  },
] as const;

export function Features() {
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
            name: "Funciones de Porraza",
            itemListElement: features.map((f, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: f.title,
              description: f.description,
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
              Funcionalidades
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
            Todo lo que necesitas para tu{" "}
            <span className="gradient-text-tricolor">
              porra del Mundial 2026
            </span>
          </motion.h2>

          <motion.p
            className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Porraza facilita crear y gestionar{" "}
            <strong className="font-semibold text-primary">
              ligas de predicciones
            </strong>{" "}
            con{" "}
            <em className="font-medium text-secondary">
              clasificación en vivo
            </em>
            , ligas privadas y{" "}
            <strong className="font-semibold text-destructive">
              pago único
            </strong>
            . Ideal para empresas, equipos y grupos de amigos.
          </motion.p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" role="list">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: 0.1 * index,
                duration: 0.5,
                ease: "easeOut",
              }}
              role="listitem"
              aria-label={feature.title}
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
                          feature.color === "destructive" && "text-destructive"
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
                      {feature.title}
                    </h3>

                    <p className="leading-relaxed text-muted-foreground text-sm">
                      {feature.description}
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
          ))}
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
                    Sin suscripción
                  </p>
                </div>
                <div className="hidden sm:block h-4 w-px bg-border" />
                <p className="text-sm text-muted-foreground">
                  Precio claro por usuario:{" "}
                  <strong className="font-bold text-foreground text-base">
                    1,99 €
                  </strong>
                </p>
                <div className="hidden sm:block h-4 w-px bg-border" />
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">
                    Empieza en minutos
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
