"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations, useMessages } from "next-intl";
import { motion } from "motion/react";
import { useEmailVerification } from "@/presentation/hooks/auth/use-email-verification";
import { APP_ROUTES } from "@/presentation/utils/routes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import { Button } from "@/presentation/components/ui/button";
import { Spinner } from "@/presentation/components/ui/spinner";
import { CheckCircle2, XCircle, Mail, ShieldCheck } from "lucide-react";

/**
 * Email Verification Content Component
 *
 * Handles email verification logic.
 * Separated from page component to use useSearchParams inside Suspense.
 */
function VerifyEmailContent() {
  const t = useTranslations();
  const messages = useMessages();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { verifyEmail, isLoading, error, clearError } = useEmailVerification();

  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);

  const token = searchParams.get("token");

  const handleVerifyEmail = async () => {
    if (!token) return;

    clearError();
    const user = await verifyEmail(token);

    if (user) {
      setVerifiedEmail(user.email);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-[0.15]">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-destructive rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-block group">
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-20 h-20 group-hover:scale-105 transition-transform">
                <Image
                  src="/logo/porraza-icon.webp"
                  alt={messages.common?.app_name ?? "Porraza"}
                  width={80}
                  height={80}
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </div>
              <h1 className="text-5xl font-display font-bold gradient-text-tricolor">
                {messages.common?.app_name ?? "Porraza"}
              </h1>
            </div>
          </Link>
          <p className="text-muted-foreground text-lg mt-3">
            {t("auth.verify_email.subtitle")}
          </p>
        </motion.div>

        {/* Verification Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="glass shadow-medium border-border/50 pt-5 pb-5">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                {verifiedEmail ? (
                  <>
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                    {t("auth.verify_email.states.verified.title")}
                  </>
                ) : error ? (
                  <>
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                      <XCircle className="w-5 h-5 text-destructive" />
                    </div>
                    {t("auth.verify_email.states.error.title")}
                  </>
                ) : token ? (
                  <>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                    </div>
                    {t("auth.verify_email.states.pending.title")}
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                    </div>
                    {t("auth.verify_email.states.missing_token.title")}
                  </>
                )}
              </CardTitle>
              <CardDescription className="text-base text-center">
                {verifiedEmail
                  ? t("auth.verify_email.states.verified.description")
                  : error
                  ? t("auth.verify_email.states.error.description")
                  : token
                  ? t("auth.verify_email.states.pending.description")
                  : t("auth.verify_email.states.missing_token.description")}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Initial State - Ready to Verify */}
              {!verifiedEmail && !error && token && (
                <div className="space-y-6">
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {t("auth.verify_email.ready.title")}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {t("auth.verify_email.ready.description")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleVerifyEmail}
                    disabled={isLoading}
                    className="w-full h-12 text-base font-semibold transition-all"
                  >
                    {isLoading ? (
                      <>
                        <Spinner className="w-4 h-4" />
                        <span>
                          {t("auth.verify_email.buttons.verify.loading")}
                        </span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5" />
                        <span>
                          {t("auth.verify_email.buttons.verify.label")}
                        </span>
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Success State */}
              {verifiedEmail && (
                <div className="space-y-6">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-700 dark:text-green-400">
                          {t("auth.verify_email.success.title")}
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                          {t("auth.verify_email.success.description", {
                            email: verifiedEmail,
                            price: "€1.99",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() =>
                      router.push(
                        `${APP_ROUTES.auth.login}?email=${encodeURIComponent(
                          verifiedEmail
                        )}`
                      )
                    }
                    className="w-full h-12 text-base font-semibold"
                  >
                    {t("auth.verify_email.buttons.go_to_login")}
                  </Button>
                </div>
              )}

              {/* Error State */}
              {error && !verifiedEmail && (
                <div className="space-y-6">
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-destructive">
                          {t("auth.verify_email.states.error.title")}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {error}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button
                      onClick={() => router.push(APP_ROUTES.auth.login)}
                      variant="outline"
                      className="w-full"
                    >
                      {t("auth.verify_email.buttons.go_to_login")}
                    </Button>
                    <Button
                      onClick={() => router.push(APP_ROUTES.auth.signup)}
                      variant="ghost"
                      className="w-full"
                    >
                      {t("auth.verify_email.buttons.create_account")}
                    </Button>
                  </div>
                </div>
              )}

              {/* No Token State */}
              {!token && (
                <div className="space-y-6">
                  <div className="bg-muted border border-border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {t("auth.verify_email.states.missing_token.title")}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {t(
                            "auth.verify_email.states.missing_token.description"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => router.push(APP_ROUTES.auth.signup)}
                    className="w-full"
                  >
                    {t("auth.verify_email.buttons.create_account")}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Back to home link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("auth.verify_email.back_home")}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Email Verification Page
 *
 * This page handles email verification from the link sent to the user's email.
 * The token is read from the URL query parameter.
 *
 * Flow:
 * 1. User clicks link in email: /verify-email?token=xxx
 * 2. User sees a button "Verificar Email"
 * 3. User clicks button → verifies email
 * 4. Shows success/error message
 * 5. Button to go to login
 *
 * Clean Architecture:
 * - Uses presentation hook (useEmailVerification)
 * - Communicates with domain layer through use cases
 * - Wrapped in Suspense for useSearchParams
 */
export default function VerifyEmailPage() {
  // Separate hook usage here for the Suspense fallback
  // Keeps content component clean and focused
  const t = useTranslations();
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="flex flex-col items-center gap-4">
            <Spinner className="w-12 h-12" />
            <p className="text-muted-foreground">{t("common.loading")}</p>
          </div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
