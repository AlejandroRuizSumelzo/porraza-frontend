"use client";

import Link from "next/link";
import { Button } from "@/presentation/components/ui/button";
import { Badge } from "@/presentation/components/ui/badge";
import { Card, CardContent } from "@/presentation/components/ui/card";
import {
  UserPlus,
  Users,
  Target,
  Trophy,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/presentation/lib/utils";

const steps = [
  {
    icon: UserPlus,
    title: "Regístrate",
    description:
      "Crea tu cuenta en segundos con autenticación segura. Pago único por usuario, sin suscripción.",
    color: "primary",
    gradient: "from-primary/10 to-primary/5",
  },
  {
    icon: Users,
    title: "Crea o únete a una liga",
    description:
      "Lanza tu liga privada para amigos o empresa, o únete con un código en un clic.",
    color: "secondary",
    gradient: "from-secondary/10 to-secondary/5",
  },
  {
    icon: Target,
    title: "Haz tus predicciones",
    description:
      "Pronostica cada partido del Mundial 2026 antes del saque inicial. Fácil y rápido.",
    color: "destructive",
    gradient: "from-destructive/10 to-destructive/5",
  },
  {
    icon: Trophy,
    title: "Compite y sube en el ranking",
    description:
      "Sigue la clasificación en tiempo real y descubre quién sabe más de fútbol.",
    color: "primary",
    gradient: "from-primary/10 to-primary/5",
  },
] as const;

export function HowItWorks() {
  return (
    <section
      className="relative bg-background py-20 md:py-32 overflow-hidden"
      aria-labelledby="howitworks-title"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Cómo funciona Porraza para la porra del Mundial 2026",
            description:
              "Sigue estos pasos para crear tu liga privada, hacer predicciones y competir con clasificación en vivo.",
            totalTime: "PT2M",
            step: steps.map((s, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: s.title,
              text: s.description,
            })),
            supply: [{ "@type": "HowToSupply", name: "Cuenta de Porraza" }],
            tool: [{ "@type": "HowToTool", name: "Aplicación web de Porraza" }],
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
              <Sparkles className="h-3 w-3" />
              Paso a Paso
            </Badge>
          </motion.div>

          <motion.h2
            id="howitworks-title"
            className="text-balance mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Cómo funciona
          </motion.h2>

          <motion.p
            className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Empieza en cuatro pasos y vive la emoción del{" "}
            <strong className="font-semibold text-foreground">
              Mundial 2026
            </strong>{" "}
            con tu liga privada.
          </motion.p>
        </motion.div>

        <ol
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 relative"
          role="list"
          aria-label="Pasos para crear tu porra en Porraza"
        >
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 -z-10">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-secondary to-primary opacity-20"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1.5 }}
            />
          </div>

          {steps.map((step, index) => (
            <motion.li
              key={step.title}
              className="relative"
              role="listitem"
              aria-label={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: 0.1 * index,
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card
                  className={cn(
                    "h-full min-h-[340px] bg-card/50 backdrop-blur-sm border-border/50",
                    "transition-all duration-300",
                    "hover:border-border hover:shadow-medium",
                    "group relative overflow-hidden"
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br",
                      step.gradient
                    )}
                  />

                  <CardContent className="relative flex flex-col items-center text-center pt-8 pb-6 px-4">
                    <motion.div
                      className={cn(
                        "mb-4 flex h-16 w-16 items-center justify-center rounded-full",
                        "text-2xl font-bold transition-all duration-300",
                        "shadow-soft group-hover:shadow-medium",
                        step.color === "primary" &&
                          "bg-primary/10 text-primary group-hover:bg-primary/20",
                        step.color === "secondary" &&
                          "bg-secondary/10 text-secondary group-hover:bg-secondary/20",
                        step.color === "destructive" &&
                          "bg-destructive/10 text-destructive group-hover:bg-destructive/20"
                      )}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                      }}
                    >
                      {index + 1}
                    </motion.div>

                    <motion.div
                      className={cn(
                        "mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl",
                        "transition-all duration-300",
                        step.color === "primary" &&
                          "bg-primary/10 group-hover:bg-primary/20",
                        step.color === "secondary" &&
                          "bg-secondary/10 group-hover:bg-secondary/20",
                        step.color === "destructive" &&
                          "bg-destructive/10 group-hover:bg-destructive/20"
                      )}
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                      }}
                    >
                      <step.icon
                        className={cn(
                          "h-7 w-7 transition-colors duration-300",
                          step.color === "primary" && "text-primary",
                          step.color === "secondary" && "text-secondary",
                          step.color === "destructive" && "text-destructive"
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
                      {step.title}
                    </h3>

                    <p className="leading-relaxed text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </CardContent>

                  <div
                    className={cn(
                      "absolute bottom-0 left-0 right-0 h-1 transform origin-left scale-x-0",
                      "group-hover:scale-x-100 transition-transform duration-500",
                      step.color === "primary" &&
                        "bg-gradient-to-r from-primary to-primary/50",
                      step.color === "secondary" &&
                        "bg-gradient-to-r from-secondary to-secondary/50",
                      step.color === "destructive" &&
                        "bg-gradient-to-r from-destructive to-destructive/50"
                    )}
                  />
                </Card>
              </motion.div>

              {index < steps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute left-[calc(100%+0.5rem)] top-24 z-10"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.2, duration: 0.4 }}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full",
                      step.color === "primary" && "bg-primary/20 text-primary",
                      step.color === "secondary" &&
                        "bg-secondary/20 text-secondary",
                      step.color === "destructive" &&
                        "bg-destructive/20 text-destructive"
                    )}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </motion.div>
              )}
            </motion.li>
          ))}
        </ol>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Card className="inline-block bg-gradient-to-br from-primary/5 via-secondary/5 to-destructive/5 border-border/50 shadow-medium backdrop-blur-sm">
            <CardContent className="px-8 py-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="text-left">
                  <p className="text-sm text-muted-foreground mb-1">
                    ¿Todo listo?
                  </p>
                  <p className="font-medium text-foreground">
                    Comienza tu experiencia ahora
                  </p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary transition-smooth"
                    asChild
                  >
                    <Link href="/crear-porra">
                      Crea tu porra del Mundial 2026
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
