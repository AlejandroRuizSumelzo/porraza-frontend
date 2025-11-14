import { Building2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { useTranslations } from "next-intl";

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
  const t = useTranslations();

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
          {isError
            ? t("stadiums.empty.error.title")
            : t("stadiums.empty.empty.title")}
        </h3>

        <p className="max-w-md text-center text-sm text-muted-foreground">
          {message ||
            (isError
              ? t("stadiums.empty.error.description", {
                  url: "http://localhost:3001",
                })
              : t("stadiums.empty.empty.description"))}
        </p>

        {isError && (
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("stadiums.empty.error.retry")}
          </button>
        )}
      </CardContent>
    </Card>
  );
}
