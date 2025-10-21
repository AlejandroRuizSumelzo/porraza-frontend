import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import { Card } from "@/presentation/components/ui/card";

interface ScheduleErrorStateProps {
  error: string;
}

/**
 * Schedule Error State Component
 * Displays error message with retry option
 */
export function ScheduleErrorState({ error }: ScheduleErrorStateProps) {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <Card className="mx-auto max-w-lg p-8 text-center">
      <div className="flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
      </div>

      <h3 className="mt-4 text-xl font-semibold">Error al cargar el calendario</h3>
      <p className="mt-2 text-sm text-muted-foreground">{error}</p>

      <Button onClick={handleRetry} className="mt-6 gap-2">
        <RefreshCw className="h-4 w-4" />
        Intentar de nuevo
      </Button>
    </Card>
  );
}
