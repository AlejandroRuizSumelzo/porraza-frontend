import { Building2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/presentation/components/ui/card";

interface EmptyStateProps {
  type?: "empty" | "error";
  message?: string;
}

/**
 * Stadium Empty State Component
 * Shows when there are no stadiums or when an error occurs
 */
export function StadiumEmptyState({
  type = "empty",
  message,
}: EmptyStateProps) {
  const isError = type === "error";

  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <div
          className={`mb-4 flex h-20 w-20 items-center justify-center rounded-full ${
            isError
              ? "bg-destructive/10"
              : "bg-muted"
          }`}
        >
          {isError ? (
            <AlertCircle className="h-10 w-10 text-destructive" />
          ) : (
            <Building2 className="h-10 w-10 text-muted-foreground" />
          )}
        </div>

        <h3 className="mb-2 text-xl font-semibold">
          {isError ? "Error al cargar estadios" : "No hay estadios disponibles"}
        </h3>

        <p className="max-w-md text-center text-sm text-muted-foreground">
          {message ||
            (isError
              ? "Asegúrate de que el backend esté corriendo en http://localhost:3001"
              : "Parece que aún no hay estadios registrados en el sistema")}
        </p>

        {isError && (
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Reintentar
          </button>
        )}
      </CardContent>
    </Card>
  );
}
