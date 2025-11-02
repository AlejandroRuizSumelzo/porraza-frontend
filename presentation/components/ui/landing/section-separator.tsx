"use client";

import { motion } from "motion/react";
import { cn } from "@/presentation/utils/cn";

interface SectionSeparatorProps {
  variant?: "gradient" | "dots" | "wave" | "simple";
  className?: string;
}

export function SectionSeparator({
  variant = "gradient",
  className,
}: SectionSeparatorProps) {
  if (variant === "gradient") {
    return (
      <div className={cn("relative h-px w-full overflow-hidden", className)}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-border to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-destructive/20"
          initial={{ opacity: 0, x: "-100%" }}
          whileInView={{ opacity: 1, x: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
        />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div
        className={cn("flex items-center justify-center gap-2 py-8", className)}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              index === 0 && "bg-primary",
              index === 1 && "bg-secondary",
              index === 2 && "bg-destructive"
            )}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.4 }}
          />
        ))}
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <div className={cn("relative h-16 w-full overflow-hidden", className)}>
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,0 C150,60 350,0 600,40 C850,80 1050,20 1200,60 L1200,120 L0,120 Z"
            className="fill-muted/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </svg>
      </div>
    );
  }

  // variant === "simple"
  return (
    <div className={cn("relative h-px w-full bg-border/50", className)}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-destructive opacity-50"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
    </div>
  );
}
