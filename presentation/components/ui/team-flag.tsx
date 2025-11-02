"use client";

import * as React from "react";
import { cn } from "@/presentation/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

/**
 * Team Flag Component (IMG version)
 *
 * - Recorte perfecto con aspect ratio 300/189
 * - Redondeado real gracias al wrapper (overflow-hidden + rounded)
 * - "Bleed" (scale) para ocultar el borde blanco que traen algunos PNG
 * - Fallback al FIFA code si falla la carga
 *
 * @example
 * <TeamFlag fifaCode="ESP" teamName="España" />
 * <TeamFlag fifaCode="BRA" teamName="Brasil" size="lg" />
 * <TeamFlag fifaCode="ARG" teamName="Argentina" rounded="md" bordered />
 */

const teamFlagVariants = cva(
  // aspect ratio + overflow: el wrapper controla el redondeado/recorte
  "relative shrink-0 overflow-hidden aspect-[300/189] bg-muted transition-transform duration-300",
  {
    variants: {
      // Sólo ancho: la altura la impone el aspect ratio
      size: {
        xs: "w-8", // 32px
        sm: "w-10", // 40px
        md: "w-12", // 48px (default)
        lg: "w-20", // 80px
        xl: "w-24", // 96px
        "2xl": "w-32", // 128px
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      size: "md",
      rounded: "md",
    },
  }
);

const teamFlagFallbackVariants = cva(
  "absolute inset-0 flex items-center justify-center font-bold text-foreground/70",
  {
    variants: {
      size: {
        xs: "text-[8px]",
        sm: "text-[9px]",
        md: "text-xs",
        lg: "text-sm",
        xl: "text-base",
        "2xl": "text-lg",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export interface TeamFlagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof teamFlagVariants> {
  /**
   * FIFA three-letter country code (e.g., "ESP", "BRA", "ARG")
   */
  fifaCode: string;
  /**
   * Team name for accessibility
   */
  teamName: string;
  /**
   * Custom image path (overrides default `/teams/{fifaCode}.png`)
   */
  imagePath?: string;
  /**
   * Show border around flag (Tailwind ring)
   */
  bordered?: boolean;
  /**
   * Apply hover effect (scale + shadow)
   */
  hoverable?: boolean;
  /**
   * Extra scale to bleed/crop 1–4% and ocultar bordes internos del PNG
   * (por defecto 1.03)
   */
  bleedScale?: number;
}

function TeamFlag({
  fifaCode,
  teamName,
  imagePath,
  size,
  rounded,
  bordered = false,
  hoverable = false,
  bleedScale = 1.03,
  className,
  ...props
}: TeamFlagProps) {
  const [imageError, setImageError] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  // Check if this is a TBD placeholder
  const isTBD = fifaCode === "TBD" || fifaCode?.toUpperCase() === "TBD";

  // Generate default image path
  const flagImagePath = imagePath || `/teams/${fifaCode}.png`;

  // Reset error/loading when source changes
  React.useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [fifaCode, imagePath]);

  // If the image is cached and already loaded
  React.useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalHeight !== 0) {
      setImageLoaded(true);
    }
  }, []);

  const handleImageLoad = React.useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = React.useCallback(() => {
    setImageError(true);
    setImageLoaded(false);
  }, []);

  // Fallback: muestra el FIFA code
  if (imageError) {
    return (
      <div
        className={cn(
          teamFlagVariants({ size, rounded }),
          teamFlagFallbackVariants({ size }),
          "bg-gradient-to-br from-muted to-muted/50",
          // ring-offset-0 para que el offset no simule esquinas raras
          bordered && "ring-1 ring-border ring-offset-0",
          hoverable && "hover:scale-105 hover:shadow-md cursor-pointer",
          className
        )}
        title={teamName}
        aria-label={`${teamName} (${fifaCode})`}
        {...props}
      >
        {fifaCode}
      </div>
    );
  }

  // Imagen con skeleton hasta que cargue
  return (
    <div
      className={cn(
        teamFlagVariants({ size, rounded }),
        bordered && "ring-1 ring-border ring-offset-0",
        hoverable &&
          "hover:scale-[1.03] hover:shadow-md cursor-pointer will-change-transform",
        !imageLoaded &&
          "bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse",
        className
      )}
      title={teamName}
      {...props}
    >
      <img
        ref={imgRef}
        src={flagImagePath}
        alt={`${teamName} flag`}
        className={cn(
          "absolute inset-0 block h-full w-full select-none pointer-events-none",
          // TBD: use object-contain with padding, others: object-cover with bleed
          isTBD ? "object-contain p-1" : "object-cover",
          "transition-opacity duration-300 will-change-transform translate-z-0"
        )}
        style={{
          // Only apply bleed scale to non-TBD images
          transform: isTBD ? "scale(1)" : `scale(${bleedScale})`,
          opacity: imageLoaded ? 1 : 0,
        }}
        loading="lazy"
        decoding="async"
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
}

export { TeamFlag, teamFlagVariants };
