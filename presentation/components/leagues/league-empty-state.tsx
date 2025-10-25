import { Card, CardContent } from "@/presentation/components/ui/card";
import { Trophy, AlertCircle } from "lucide-react";

interface LeagueEmptyStateProps {
  type: "empty" | "error";
  message?: string;
}

/**
 * League Empty State Component
 * Displays empty or error states with appropriate messaging
 */
export function LeagueEmptyState({ type, message }: LeagueEmptyStateProps) {
  if (type === "error") {
    return (
      <Card className="border-destructive/50 bg-destructive/5">
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <div>
            <h3 className="font-semibold text-destructive">
              Error al cargar ligas
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {message ||
                "Ha ocurrido un error. Por favor, inténtalo de nuevo."}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Trophy className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">
            {message || "No hay ligas disponibles"}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Únete a una liga pública o crea la tuya propia.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
