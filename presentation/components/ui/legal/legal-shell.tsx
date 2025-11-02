"use client";

import { ReactNode } from "react";
import { useLocale } from "next-intl";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import { Footer } from "@/presentation/components/ui/landing/footer";
import { Header } from "@/presentation/components/ui/landing/header";
import { Separator } from "@/presentation/components/ui/separator";
import { cn } from "@/presentation/utils/cn";
import { formatFullDate } from "@/presentation/utils/formatters";

type LegalShellProps = {
  title: string;
  description?: string;
  updatedAt: string;
  children: ReactNode;
  className?: string;
};

export function LegalShell({
  title,
  description,
  updatedAt,
  children,
  className,
}: LegalShellProps) {
  const locale = useLocale();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 bg-muted/10">
        <div
          className={cn(
            "mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 md:px-6 md:py-16",
            className
          )}
        >
          <Card className="border-border/70 shadow-soft p-5">
            <CardHeader className="space-y-4">
              <CardTitle className="text-3xl font-semibold tracking-tight md:text-4xl">
                {title}
              </CardTitle>
              {(description || updatedAt) && (
                <CardDescription className="space-y-2 text-base leading-relaxed text-muted-foreground">
                  {description && <p>{description}</p>}
                  <p className="text-sm text-muted-foreground/90">
                    Última actualización:{" "}
                    <time dateTime={updatedAt}>{formatFullDate(updatedAt, locale)}</time>
                  </p>
                </CardDescription>
              )}
            </CardHeader>
            <Separator className="bg-border/60" />
            <CardContent className="space-y-10 text-base leading-7 text-muted-foreground">
              {children}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
