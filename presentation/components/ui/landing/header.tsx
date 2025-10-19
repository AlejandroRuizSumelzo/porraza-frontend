"use client";

import Link from "next/link";
import { Button } from "@/presentation/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/presentation/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#funcionalidades", label: "Funcionalidades" },
    { href: "#precios", label: "Precios" },
    { href: "#preguntas", label: "Preguntas" },
  ];

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b border-border/40 glass shadow-soft"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      <div className="container-responsive">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
          >
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus-ring rounded-lg px-1 -ml-1"
            >
              <motion.img
                src="/logo/porraza-icon.webp"
                alt="Porraza"
                className="h-8 w-8"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              />
              <motion.span
                className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Porraza
              </motion.span>
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg focus-ring",
                    "text-muted-foreground hover:text-foreground",
                    "transition-smooth hover:bg-accent/50"
                  )}
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    {link.label}
                  </motion.span>
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2 + navLinks.length * 0.1,
                type: "spring",
              }}
            >
              <Link
                href="/login"
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg focus-ring",
                  "text-muted-foreground hover:text-foreground",
                  "transition-smooth hover:bg-accent/50"
                )}
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  Iniciar sesión
                </motion.span>
              </Link>
            </motion.div>
          </nav>

          <motion.div
            className="hidden md:flex items-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                size="default"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth shadow-soft hover:shadow-medium focus-ring"
                asChild
              >
                <Link href="/signup">Crea tu Liga</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent/50 transition-smooth focus-ring"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden border-t border-border/40 overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav
                className="flex flex-col gap-1 py-4"
                aria-label="Mobile navigation"
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.1 + index * 0.05,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "px-4 py-3 text-sm font-medium rounded-lg focus-ring block",
                        "text-muted-foreground hover:text-foreground",
                        "transition-smooth hover:bg-accent/50"
                      )}
                    >
                      <motion.span
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                      >
                        {link.label}
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.1 + navLinks.length * 0.05,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "px-4 py-3 text-sm font-medium rounded-lg focus-ring block",
                      "text-muted-foreground hover:text-foreground",
                      "transition-smooth hover:bg-accent/50"
                    )}
                  >
                    <motion.span
                      whileTap={{ scale: 0.95 }}
                      className="inline-block"
                    >
                      Iniciar Sesión
                    </motion.span>
                  </Link>
                </motion.div>
                <motion.div
                  className="mt-3 px-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.1 + (navLinks.length + 1) * 0.05,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Button
                      size="default"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth shadow-soft"
                      asChild
                    >
                      <Link
                        href="/signup"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Crea tu Liga
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
