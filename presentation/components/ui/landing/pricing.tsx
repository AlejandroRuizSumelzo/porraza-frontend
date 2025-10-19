"use client";

import Link from "next/link";
import { Button } from "@/presentation/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/presentation/components/ui/card";
import { Badge } from "@/presentation/components/ui/badge";
import { Check, Sparkles, Users, Building2 } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/presentation/lib/utils";

const features = [
  {
    text: "Acceso a todas las funciones de la liga",
    color: "primary",
  },
  {
    text: "Puntuación automática tras cada partido",
    color: "secondary",
  },
  {
    text: "Clasificación en tiempo real",
    color: "destructive",
  },
  {
    text: "Interfaz adaptada a móvil",
    color: "primary",
  },
  {
    text: "Sin costes ocultos",
    color: "destructive",
  },
] as const;

const useCases = [
  {
    icon: Users,
    text: "Grupos de amigos",
    color: "secondary",
  },
  {
    icon: Building2,
    text: "Empresas y equipos",
    color: "primary",
  },
];

export function Pricing() {
  return (
    <section
      id="precios"
      className="relative bg-background py-20 md:py-32 overflow-hidden"
      aria-labelledby="pricing-title"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      {/* Datos estructurados: Servicio + Oferta */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Porraza - Porra del Mundial 2026",
            description:
              "Organiza tu porra del Mundial 2026 con ligas privadas, clasificación en vivo y puntuación automática. Sin suscripción.",
            provider: { "@type": "Organization", name: "Porraza" },
            areaServed: "Worldwide",
            offers: {
              "@type": "Offer",
              price: "1.99",
              priceCurrency: "EUR",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "1.99",
                priceCurrency: "EUR",
                unitText: "usuario",
              },
              category: "one-time-purchase",
              url: "https://porraza.com/precios",
            },
          }),
        }}
      />

      <div className="container-responsive">
        {/* Header Section */}
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
            <Badge className="accent-destructive border gap-2">
              <Sparkles className="h-3 w-3" />
              Precio Simple
            </Badge>
          </motion.div>

          <motion.h2
            id="pricing-title"
            className="text-balance mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Precio{" "}
            <span className="gradient-text-tricolor">
              simple y transparente
            </span>
          </motion.h2>

          <motion.p
            className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Un único pago, todas las funciones.{" "}
            <strong className="font-semibold text-foreground">
              Sin suscripciones
            </strong>
            , sin sorpresas.
          </motion.p>
        </motion.div>

        {/* Pricing Card */}
        <div className="mx-auto max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="relative border-2 border-border/50 bg-card/50 backdrop-blur-sm shadow-medium hover:shadow-primary/20 hover:border-primary/30 transition-all duration-500 overflow-hidden group">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-destructive/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />

                <CardHeader className="relative pt-8 pb-8 text-center">
                  <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <span className="text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                        1,99 €
                      </span>
                    </motion.div>
                    <span className="ml-2 text-muted-foreground">
                      por usuario
                    </span>
                  </motion.div>

                  <div className="flex items-center justify-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
                    <p className="text-sm text-muted-foreground">
                      Pago único para todo el torneo
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="relative">
                  <ul
                    className="space-y-3"
                    role="list"
                    aria-label="Características incluidas en el precio"
                  >
                    {features.map((feature, index) => (
                      <motion.li
                        key={feature.text}
                        className="flex items-center gap-3"
                        role="listitem"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                      >
                        <motion.div
                          className={cn(
                            "flex h-6 w-6 items-center justify-center rounded-full shrink-0",
                            "transition-all duration-300",
                            feature.color === "primary" &&
                              "bg-primary/10 group-hover:bg-primary/20",
                            feature.color === "secondary" &&
                              "bg-secondary/10 group-hover:bg-secondary/20",
                            feature.color === "destructive" &&
                              "bg-destructive/10 group-hover:bg-destructive/20"
                          )}
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 15,
                          }}
                        >
                          <Check
                            className={cn(
                              "h-4 w-4 transition-colors duration-300",
                              feature.color === "primary" && "text-primary",
                              feature.color === "secondary" && "text-secondary",
                              feature.color === "destructive" &&
                                "text-destructive"
                            )}
                            aria-hidden="true"
                          />
                        </motion.div>
                        <span className="text-sm">{feature.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="relative pt-6 pb-8">
                  <motion.div
                    className="w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Button
                      size="lg"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary transition-smooth text-base"
                      asChild
                    >
                      <Link
                        href="/crear-porra"
                        aria-label="Crear porra del Mundial 2026 con Porraza"
                      >
                        Crear mi porra ahora
                      </Link>
                    </Button>
                  </motion.div>
                </CardFooter>

                {/* Bottom gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-destructive" />
              </Card>
            </motion.div>
          </motion.div>

          {/* Use cases badges */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <span className="text-sm text-muted-foreground">Ideal para:</span>
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.text}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge
                  className={cn(
                    "gap-2 px-4 py-1.5 text-xs font-medium backdrop-blur-sm transition-smooth cursor-default",
                    useCase.color === "primary" &&
                      "accent-primary hover:shadow-primary/20",
                    useCase.color === "secondary" &&
                      "accent-secondary hover:shadow-secondary/20"
                  )}
                >
                  <useCase.icon className="h-3.5 w-3.5" />
                  {useCase.text}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust message */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <p className="text-sm text-muted-foreground">
              Facturación simple por usuario.{" "}
              <span className="font-medium text-foreground">
                Sin letra pequeña
              </span>
              .
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
