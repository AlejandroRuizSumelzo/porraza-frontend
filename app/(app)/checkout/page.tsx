"use client";

import { useEffect, useState, Suspense } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCheckout } from "@/presentation/hooks/payments/use-checkout";
import { Button } from "@/presentation/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import {
  SidebarTrigger,
  useSidebar,
} from "@/presentation/components/ui/sidebar";

// Initialize Stripe with publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function CheckoutContent() {
  const { open, isMobile } = useSidebar();
  const { createSession, isLoading: isCreatingSession, error } = useCheckout();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    // Create checkout session on mount
    const initCheckout = async () => {
      const session = await createSession();
      if (session) {
        setClientSecret(session.clientSecret);
      }
    };

    initCheckout();
  }, []); // Run once on mount

  if (error) {
    return (
      <div className="flex h-full flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          {(isMobile || !open) && <SidebarTrigger />}
          <h1 className="text-xl font-semibold">Checkout</h1>
        </header>
        <main className="flex-1 overflow-auto p-4">
          <div className="container mx-auto max-w-2xl">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-700">Error</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-600 mb-4">{error}</p>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-100"
                >
                  Intentar de nuevo
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  if (isCreatingSession || !clientSecret) {
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
                <p className="text-muted-foreground">Preparando checkout...</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        {(isMobile || !open) && <SidebarTrigger />}
        <h1 className="text-xl font-semibold">Checkout</h1>
      </header>
      <main className="flex-1 overflow-auto p-4">
        <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Completar Pago
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Pago único de €1.99 para acceder a todas las funcionalidades premium
            </p>
          </div>

          {/* Checkout container with Mundial gradient border */}
          <div className="relative rounded-xl bg-gradient-to-br from-primary via-secondary to-destructive p-[2px] shadow-lg">
            <Card className="border-0 shadow-none bg-background rounded-xl overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <EmbeddedCheckoutProvider
                  stripe={stripePromise}
                  options={{ clientSecret }}
                >
                  <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

/**
 * Checkout Page
 * Displays Stripe Embedded Checkout for €1.99 payment
 *
 * Flow:
 * 1. Creates checkout session on mount
 * 2. Displays Stripe Embedded Checkout with clientSecret
 * 3. User completes payment
 * 4. Stripe redirects to /checkout/success?session_id=xxx
 */
export default function CheckoutPage() {
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
      <CheckoutContent />
    </Suspense>
  );
}
