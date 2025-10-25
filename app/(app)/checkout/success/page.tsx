"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  LayoutDashboard,
  Trophy,
} from "lucide-react";
import { useSessionStatus } from "@/presentation/hooks/payments/use-session-status";
import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent } from "@/presentation/components/ui/card";
import {
  SidebarTrigger,
  useSidebar,
} from "@/presentation/components/ui/sidebar";

function SuccessContent() {
  const { open, isMobile } = useSidebar();
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { status, isLoading, error } = useSessionStatus(sessionId);

  if (isLoading) {
    return (
      <div className="flex h-full flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          {(isMobile || !open) && <SidebarTrigger />}
          <h1 className="text-xl font-semibold">Checkout</h1>
        </header>
        <main className="flex-1 overflow-auto p-4">
          <div className="container mx-auto max-w-2xl">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                <p className="text-muted-foreground">Verificando pago...</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          {(isMobile || !open) && <SidebarTrigger />}
          <h1 className="text-xl font-semibold">Checkout</h1>
        </header>
        <main className="flex-1 overflow-auto p-4">
          <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="relative rounded-xl bg-gradient-to-br from-destructive/80 via-destructive to-destructive/60 p-[2px] shadow-lg">
              <Card className="border-0 shadow-none bg-background rounded-xl overflow-hidden">
                <CardContent className="text-center py-12 px-6 sm:px-12">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-destructive/20 rounded-full blur-xl"></div>
                    <AlertTriangle className="relative w-20 h-20 sm:w-24 sm:h-24 text-destructive mx-auto" />
                  </div>
                  <h2 className="text-3xl font-bold text-destructive mb-4">
                    Error al verificar pago
                  </h2>
                  <p className="text-foreground mb-8 max-w-md mx-auto">{error}</p>
                  <Button
                    onClick={() => router.push("/dashboard")}
                    variant="outline"
                    className="border-2 border-destructive text-destructive hover:bg-destructive/10"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Ir al Dashboard
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (status?.hasPaid) {
    return (
      <div className="flex h-full flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          {(isMobile || !open) && <SidebarTrigger />}
          <h1 className="text-xl font-semibold">Pago Exitoso</h1>
        </header>
        <main className="flex-1 overflow-auto p-4">
          <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Success card with Mundial gradient border */}
            <div className="relative rounded-xl bg-gradient-to-br from-primary via-secondary to-destructive p-[2px] shadow-lg">
              <Card className="border-0 shadow-none bg-background rounded-xl overflow-hidden">
                <CardContent className="text-center py-12 px-6 sm:px-12">
                  {/* Success icon with gradient */}
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-destructive opacity-20 rounded-full blur-xl"></div>
                    <CheckCircle2 className="relative w-24 h-24 sm:w-28 sm:h-28 text-secondary mx-auto drop-shadow-lg" />
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                    ¡Pago Exitoso!
                  </h2>

                  <p className="text-lg sm:text-xl text-foreground mb-2 font-medium">
                    Gracias por tu pago de{" "}
                    <span className="text-primary font-bold">€1.99</span>
                  </p>

                  <div className="space-y-2 mb-8">
                    {status.paymentDate && (
                      <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                        <span>📅</span>
                        <span>
                          Fecha:{" "}
                          {new Date(status.paymentDate).toLocaleString("es-ES", {
                            dateStyle: "long",
                            timeStyle: "short",
                          })}
                        </span>
                      </p>
                    )}
                    {status.email && (
                      <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                        <span>📧</span>
                        <span>Email: {status.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Call to action buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <Button
                      onClick={() => router.push("/dashboard")}
                      className="flex-1 bg-primary hover:bg-primary/90 shadow-primary"
                      size="lg"
                    >
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Ir al Dashboard
                    </Button>
                    <Button
                      onClick={() => router.push("/predictions")}
                      variant="outline"
                      className="flex-1 border-2 border-primary text-primary hover:bg-primary/10"
                      size="lg"
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      Empezar a predecir
                    </Button>
                  </div>

                  {/* Success message */}
                  <div className="mt-8 pt-8 border-t border-border">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <p>
                        Ya tienes acceso completo a todas las funcionalidades
                        premium de Porraza
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Payment pending
  return (
    <div className="flex h-full flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        {(isMobile || !open) && <SidebarTrigger />}
        <h1 className="text-xl font-semibold">Checkout</h1>
      </header>
      <main className="flex-1 overflow-auto p-4">
        <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="relative rounded-xl bg-gradient-to-br from-secondary/60 via-secondary to-secondary/80 p-[2px] shadow-lg">
            <Card className="border-0 shadow-none bg-background rounded-xl overflow-hidden">
              <CardContent className="text-center py-12 px-6 sm:px-12">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-secondary/20 rounded-full blur-xl"></div>
                  <Clock className="relative w-20 h-20 sm:w-24 sm:h-24 text-secondary mx-auto animate-pulse" />
                </div>
                <h2 className="text-3xl font-bold text-secondary mb-4">
                  Pago Pendiente
                </h2>
                <p className="text-lg text-foreground mb-8 max-w-md mx-auto">
                  Tu pago está siendo procesado. Por favor, espera unos momentos.
                </p>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="border-2 border-secondary text-secondary hover:bg-secondary/10"
                >
                  Actualizar estado
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

/**
 * Checkout Success Page
 * Displays payment success status after Stripe redirect
 *
 * Flow:
 * 1. Stripe redirects here with ?session_id=xxx after payment
 * 2. Fetches session status from backend
 * 3. Shows success message if payment completed
 * 4. Shows pending message if payment still processing
 * 5. Provides navigation buttons to dashboard/predictions
 */
export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto max-w-2xl p-8">
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </CardContent>
          </Card>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
