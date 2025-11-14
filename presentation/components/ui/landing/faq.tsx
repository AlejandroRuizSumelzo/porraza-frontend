"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  Users,
  Building2,
  Euro,
  Trophy,
  Gift,
  UserPlus,
  Shield,
  Zap,
} from "lucide-react";
import { Badge } from "@/presentation/components/ui/badge";
import { Card } from "@/presentation/components/ui/card";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/presentation/utils/cn";

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ComponentType<{ className?: string }>;
  color: "primary" | "secondary" | "destructive";
}

export function FAQ() {
  const t = useTranslations("landing.faq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Obtener las preguntas del archivo de traducción con iconos y colores
  const faqItems: FAQItem[] = [
    {
      question: t("items.0.question"),
      answer: t("items.0.answer"),
      icon: Users,
      color: "primary",
    },
    {
      question: t("items.1.question"),
      answer: t("items.1.answer"),
      icon: Building2,
      color: "secondary",
    },
    {
      question: t("items.2.question"),
      answer: t("items.2.answer"),
      icon: Euro,
      color: "destructive",
    },
    {
      question: t("items.3.question"),
      answer: t("items.3.answer"),
      icon: Trophy,
      color: "primary",
    },
    {
      question: t("items.4.question"),
      answer: t("items.4.answer"),
      icon: Gift,
      color: "secondary",
    },
    {
      question: t("items.5.question"),
      answer: t("items.5.answer"),
      icon: UserPlus,
      color: "destructive",
    },
    {
      question: t("items.6.question"),
      answer: t("items.6.answer"),
      icon: Shield,
      color: "primary",
    },
    {
      question: t("items.7.question"),
      answer: t("items.7.answer"),
      icon: Zap,
      color: "secondary",
    },
  ];

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="preguntas"
      className="relative bg-muted/20 py-20 md:py-32 overflow-hidden"
      aria-labelledby="faq-title"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-destructive/3 blur-3xl" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:32px_32px]" />
      </div>

      {/* Structured Data - FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />

      <div className="container-responsive">
        {/* Header */}
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
              <HelpCircle className="h-3 w-3" />
              {t("badge")}
            </Badge>
          </motion.div>

          <motion.h2
            id="faq-title"
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
            {t("description")}
          </motion.p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          className="mx-auto max-w-3xl space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {faqItems.map((item, index) => {
            const IconComponent = item.icon;
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * index, duration: 0.4 }}
              >
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <Card
                    className={cn(
                      "group overflow-hidden border transition-all duration-300 relative",
                      isOpen
                        ? item.color === "primary"
                          ? "border-primary/60 shadow-primary/20 shadow-lg bg-primary/5"
                          : item.color === "secondary"
                            ? "border-secondary/60 shadow-secondary/20 shadow-lg bg-secondary/5"
                            : "border-destructive/60 shadow-destructive/20 shadow-lg bg-destructive/5"
                        : "border-border/50 hover:border-border/80 bg-card/50 backdrop-blur-sm"
                    )}
                  >
                    {/* Color accent bar */}
                    <div
                      className={cn(
                        "absolute top-0 left-0 right-0 h-1 transform origin-left transition-transform duration-300",
                        isOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        item.color === "primary" && "bg-gradient-to-r from-primary to-primary/50",
                        item.color === "secondary" && "bg-gradient-to-r from-secondary to-secondary/50",
                        item.color === "destructive" && "bg-gradient-to-r from-destructive to-destructive/50"
                      )}
                    />

                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full px-6 py-5 text-left transition-colors hover:bg-muted/20"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <motion.div
                          className={cn(
                            "mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-all duration-300",
                            isOpen
                              ? item.color === "primary"
                                ? "bg-primary/20 text-primary shadow-primary/30 shadow-md"
                                : item.color === "secondary"
                                  ? "bg-secondary/20 text-secondary shadow-secondary/30 shadow-md"
                                  : "bg-destructive/20 text-destructive shadow-destructive/30 shadow-md"
                              : "bg-muted/50 text-muted-foreground group-hover:bg-muted"
                          )}
                          animate={{
                            scale: isOpen ? 1.05 : 1,
                            rotate: isOpen ? 5 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <IconComponent className="h-5 w-5" />
                        </motion.div>

                        {/* Question */}
                        <div className="flex-1">
                          <h3
                            className={cn(
                              "text-base font-semibold transition-colors sm:text-lg",
                              isOpen
                                ? item.color === "primary"
                                  ? "text-primary"
                                  : item.color === "secondary"
                                    ? "text-secondary"
                                    : "text-destructive"
                                : "text-foreground group-hover:text-foreground"
                            )}
                          >
                            {item.question}
                          </h3>
                        </div>

                        {/* Chevron */}
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="shrink-0"
                        >
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 transition-colors",
                              isOpen
                                ? item.color === "primary"
                                  ? "text-primary"
                                  : item.color === "secondary"
                                    ? "text-secondary"
                                    : "text-destructive"
                                : "text-muted-foreground group-hover:text-foreground"
                            )}
                          />
                        </motion.div>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="border-t border-border/30 px-6 pb-5 pt-4 pl-[72px]">
                            <motion.p
                              className="text-sm leading-relaxed text-muted-foreground sm:text-base"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1, duration: 0.3 }}
                            >
                              {item.answer}
                            </motion.p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Footer */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Card className="inline-block bg-card/50 backdrop-blur-sm border-border/50 shadow-soft">
            <div className="px-8 py-5">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <motion.div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <HelpCircle className="h-6 w-6 text-primary" />
                </motion.div>
                <p className="text-sm text-muted-foreground sm:text-base">
                  {t.rich("footer", {
                    contact: (chunks) => (
                      <a
                        href="mailto:contacto@porraza.com"
                        className="font-semibold text-primary underline-offset-4 hover:underline transition-colors"
                      >
                        {chunks}
                      </a>
                    ),
                  })}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
