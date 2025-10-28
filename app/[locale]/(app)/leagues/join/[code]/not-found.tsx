import Link from "next/link";
import { Button } from "@/presentation/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import { AlertTriangle, ArrowLeft, Search } from "lucide-react";

/**
 * Not Found Page for Invalid League Codes
 * Displayed when a league invite code or ID is not found
 *
 * Scenarios:
 * - Invalid invite code
 * - Expired invite code
 * - League was deleted
 * - Invalid league ID format
 *
 * Design:
 * - Clear error message
 * - Helpful actions (browse leagues, go back)
 * - Brand-consistent styling
 */
export default function LeagueNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-destructive/10 p-4">
              <AlertTriangle className="h-12 w-12 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-2xl">Liga no encontrada</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              El código de invitación no es válido o la liga ya no existe.
            </p>
            <p className="text-sm text-muted-foreground">
              Esto puede ocurrir si:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 text-left pl-6">
              <li>• El código de invitación es incorrecto</li>
              <li>• La liga fue eliminada por el administrador</li>
              <li>• El enlace ha expirado</li>
            </ul>
          </div>

          <div className="space-y-2">
            <Button asChild className="w-full" size="lg">
              <Link href="/leagues">
                <Search className="mr-2 h-4 w-4" />
                Explorar ligas disponibles
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al inicio
              </Link>
            </Button>
          </div>

          <div className="text-center pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              ¿Necesitas ayuda? Contacta con el administrador de la liga.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
