"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion } from "motion/react";
import {
  loginSchema,
  type LoginFormData,
} from "@/presentation/schemas/login-schema";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { Separator } from "@/presentation/components/ui/separator";
import {
  Field,
  FieldLabel,
  FieldError,
} from "@/presentation/components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import { useLogin } from "@/presentation/hooks/auth/use-login";
import { APP_ROUTES } from "@/presentation/lib/routes";
import { LogIn, Mail, Lock, ArrowLeft } from "lucide-react";

/**
 * LoginForm Component
 *
 * Pure presentation component for the login form.
 * Handles form validation, submission, and user feedback.
 *
 * Clean Architecture:
 * - Located in presentation layer
 * - Uses DI hooks for business logic (useLogin)
 * - Communicates with domain layer through use cases
 * - No direct API calls or business logic here
 */
export function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useLogin();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    clearError();

    // Execute login use case
    const authResponse = await login(data.email, data.password);

    if (authResponse) {
      // Login successful
      toast.success("¡Bienvenido!", {
        description: `Has iniciado sesión como ${authResponse.user.email}`,
      });

      // Redirect to dashboard
      router.push(APP_ROUTES.app.dashboard);
    } else {
      // Show error toast
      toast.error("Error al iniciar sesión", {
        description:
          error || "Por favor, verifica tus credenciales e inténtalo de nuevo.",
      });
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
            Inicia sesión en tu cuenta
          </p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="glass shadow-medium border-border/50 pt-5 pb-5">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <LogIn className="w-5 h-5 text-primary" />
                </div>
                Iniciar Sesión
              </CardTitle>
              <CardDescription className="text-base">
                Ingresa tus credenciales para acceder a tu cuenta
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Email Field */}
                <Field data-invalid={!!form.formState.errors.email}>
                  <FieldLabel
                    htmlFor="email"
                    className="flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    Email
                  </FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    aria-invalid={!!form.formState.errors.email}
                    className="h-11 transition-all focus:shadow-primary"
                    {...form.register("email")}
                  />
                  <FieldError errors={[form.formState.errors.email]} />
                </Field>

                {/* Password Field */}
                <Field data-invalid={!!form.formState.errors.password}>
                  <FieldLabel
                    htmlFor="password"
                    className="flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4 text-muted-foreground" />
                    Contraseña
                  </FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    aria-invalid={!!form.formState.errors.password}
                    className="h-11 transition-all focus:shadow-primary"
                    {...form.register("password")}
                  />
                  <FieldError errors={[form.formState.errors.password]} />
                </Field>

                {/* Remember me & Forgot password */}
                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-2 focus:ring-offset-2 transition-all cursor-pointer"
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      Recordarme
                    </span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-11 text-base font-semibold shadow-primary hover:shadow-lg transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Iniciando sesión...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <LogIn className="w-4 h-4" />
                      Iniciar Sesión
                    </span>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative flex items-center py-4">
                <Separator className="flex-1" />
                <span className="px-4 text-xs uppercase text-muted-foreground font-medium">
                  O continúa con
                </span>
                <Separator className="flex-1" />
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-11 hover:bg-accent hover:border-primary/20 transition-all group"
                  type="button"
                >
                  <svg
                    className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="h-11 hover:bg-accent hover:border-primary/20 transition-all group"
                  type="button"
                >
                  <svg
                    className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </Button>
              </div>

              {/* Sign up link */}
              <div className="text-center pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  ¿No tienes una cuenta?{" "}
                  <Link
                    href="/signup"
                    className="text-primary hover:text-primary/80 font-semibold transition-colors"
                  >
                    Regístrate gratis
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
