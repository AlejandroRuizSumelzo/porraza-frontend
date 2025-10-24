"use client";

import { useRouter } from "next/navigation";
import { usePaymentStatus } from "@/presentation/hooks/payments/use-payment-status";
import { Button } from "@/presentation/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";

interface PaymentRequiredGuardProps {
  /**
   * Content to show if user has paid
   */
  children: React.ReactNode;

  /**
   * Optional custom loading component
   */
  loadingComponent?: React.ReactNode;

  /**
   * Optional custom error component
   */
  errorComponent?: React.ReactNode;
}

/**
 * Payment Required Guard Component
 * Protects premium content by checking payment status
 *
 * Usage:
 * ```tsx
 * <PaymentRequiredGuard>
 *   <PremiumContent />
 * </PaymentRequiredGuard>
 * ```
 */
export function PaymentRequiredGuard({
  children,
  loadingComponent,
  errorComponent,
}: PaymentRequiredGuardProps) {
  const router = useRouter();
  const { hasPaid, isLoading, error } = usePaymentStatus();

  if (isLoading) {
    return (
      loadingComponent || (
        <div className="container mx-auto max-w-2xl p-8">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-muted-foreground">Verificando acceso...</p>
            </CardContent>
          </Card>
        </div>
      )
    );
  }

  if (error) {
    return (
      errorComponent || (
        <div className="container mx-auto max-w-2xl p-8">
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
      )
    );
  }

  if (!hasPaid) {
    return (
      <div className="container mx-auto max-w-2xl p-8">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-6">🔒</div>
            <h1 className="text-3xl font-bold text-blue-700 mb-4">
              Acceso Premium Requerido
            </h1>
            <p className="text-lg text-gray-700 mb-2">
              Esta función requiere un pago único de €1.99
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Accede a predicciones, estadísticas avanzadas, y más
            </p>
            <Button
              onClick={() => router.push("/checkout")}
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              Pagar €1.99
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User has paid, render children
  return <>{children}</>;
}
