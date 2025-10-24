import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/presentation/lib/utils";
import { Input } from "@/presentation/components/ui/input";

type PasswordInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "type" | "children"
> & {
  toggleLabel?: {
    show?: string;
    hide?: string;
  };
};

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, toggleLabel, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);

    const labels = React.useMemo(
      () => ({
        show: toggleLabel?.show ?? "Mostrar contraseña",
        hide: toggleLabel?.hide ?? "Ocultar contraseña",
      }),
      [toggleLabel]
    );

    return (
      <div className="relative w-full">
        <Input
          ref={ref}
          className={cn("pr-10", className)}
          type={isVisible ? "text" : "password"}
          {...props}
        />
        <button
          type="button"
          onClick={() => setIsVisible((state) => !state)}
          aria-label={isVisible ? labels.hide : labels.show}
          aria-pressed={isVisible}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {isVisible ? (
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
