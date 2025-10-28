"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion } from "motion/react";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/presentation/schemas/reset-password-schema";
import { useResetPasswordForm } from "@/presentation/hooks/auth/use-reset-password";
import { Button } from "@/presentation/components/ui/button";
import { PasswordInput } from "@/presentation/components/ui/password-input";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/presentation/components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import { Lock, ArrowLeft, KeyRound, AlertCircle } from "lucide-react";

/**
 * Reset Password Page Content Component
 *
 * Handles the password reset form with token validation.
 * Separated from page component to use useSearchParams inside Suspense.
 */
function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const { resetPassword, isLoading, error, clearError } =
    useResetPasswordForm();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Extract token from URL on mount
  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (!tokenFromUrl) {
      toast.error("Token inválido", {
        description: "El enlace de recuperación es inválido o ha expirado.",
      });
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else {
      setToken(tokenFromUrl);
    }
  }, [searchParams, router]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error("Token no encontrado", {
        description: "Por favor, usa el enlace del email de recuperación.",
      });
      return;
    }

    clearError();

    const response = await resetPassword(token, data.newPassword);

    if (response) {
      // Success
      toast.success("¡Contraseña restablecida!", {
        description: response.message,
      });

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      // Error
      toast.error("Error al restablecer contraseña", {
        description: error || "Por favor, solicita un nuevo enlace de recuperación.",
      });
    }
  };

  // Show loading state while extracting token
  if (token === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground">Verificando enlace...</p>
        </div>
      </div>
    );
  }

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
                  alt="Porraza Logo"
                  width={80}
                  height={80}
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </div>
              <h1 className="text-5xl font-display font-bold gradient-text-tricolor">
                Porraza
              </h1>
            </div>
          </Link>
          <p className="text-muted-foreground text-lg mt-3">
            Restablecer tu contraseña
          </p>
        </motion.div>

        {/* Reset Password Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="glass shadow-medium border-border/50 pt-5 pb-5">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <KeyRound className="w-5 h-5 text-primary" />
                </div>
                Nueva Contraseña
              </CardTitle>
              <CardDescription className="text-base">
                Ingresa tu nueva contraseña. Debe tener al menos 8 caracteres.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* New Password Field */}
                <Field data-invalid={!!form.formState.errors.newPassword}>
                  <FieldLabel
                    htmlFor="newPassword"
                    className="flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4 text-muted-foreground" />
                    Nueva Contraseña
                  </FieldLabel>
                  <PasswordInput
                    id="newPassword"
                    placeholder="••••••••"
                    aria-invalid={!!form.formState.errors.newPassword}
                    className="h-11 transition-all focus:shadow-primary"
                    disabled={isLoading}
                    {...form.register("newPassword")}
                  />
                  <FieldDescription>
                    Mínimo 8 caracteres
                  </FieldDescription>
                  <FieldError errors={[form.formState.errors.newPassword]} />
                </Field>

                {/* Confirm Password Field */}
                <Field data-invalid={!!form.formState.errors.confirmPassword}>
                  <FieldLabel
                    htmlFor="confirmPassword"
                    className="flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4 text-muted-foreground" />
                    Confirmar Contraseña
                  </FieldLabel>
                  <PasswordInput
                    id="confirmPassword"
                    placeholder="••••••••"
                    aria-invalid={!!form.formState.errors.confirmPassword}
                    className="h-11 transition-all focus:shadow-primary"
                    disabled={isLoading}
                    {...form.register("confirmPassword")}
                  />
                  <FieldError errors={[form.formState.errors.confirmPassword]} />
                </Field>

                {/* Error display */}
                {error && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-11 text-base font-semibold shadow-primary hover:shadow-lg transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Restableciendo...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <KeyRound className="w-4 h-4" />
                      Restablecer Contraseña
                    </span>
                  )}
                </Button>
              </form>

              {/* Back to login link */}
              <div className="text-center pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  ¿Ya tienes tu contraseña?{" "}
                  <Link
                    href="/login"
                    className="text-primary hover:text-primary/80 font-semibold transition-colors"
                  >
                    Inicia sesión
                  </Link>
                </p>
              </div>
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
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Reset Password Page
 *
 * Clean Architecture:
 * - App Router layer (orchestration)
 * - Wraps content in Suspense for useSearchParams
 * - Delegates all logic to ResetPasswordContent component
 */
export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="text-muted-foreground">Cargando...</p>
          </div>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
