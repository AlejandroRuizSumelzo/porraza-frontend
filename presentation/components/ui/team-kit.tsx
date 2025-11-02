"use client";

import * as React from "react";
import { cn } from "@/presentation/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

/**
 * Team Kit Component
 * Displays team kit/jersey with fallback
 *
 * Features:
 * - Auto-loading with skeleton
 * - Error fallback with FIFA code
 * - Multiple sizes
 * - Optional border and hover effects
 * - Optimized for 414x414 PNG images
 *
 * @example
 * <TeamKit fifaCode="ESP" teamName="España" />
 * <TeamKit fifaCode="BRA" teamName="Brasil" size="lg" />
 * <TeamKit fifaCode="ARG" teamName="Argentina" size="xl" hoverable />
 */

const teamKitVariants = cva(
  "relative shrink-0 overflow-hidden aspect-square bg-gradient-to-br from-muted to-muted/50 transition-all duration-300",
  {
    variants: {
      size: {
        sm: "w-16 h-16", // 64px
        md: "w-24 h-24", // 96px (default)
        lg: "w-32 h-32", // 128px
        xl: "w-40 h-40", // 160px
        "2xl": "w-48 h-48", // 192px
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      size: "md",
      rounded: "lg",
    },
  }
);

const teamKitFallbackVariants = cva(
  "absolute inset-0 flex flex-col items-center justify-center font-bold text-foreground/70",
  {
    variants: {
      size: {
        sm: "text-[10px] gap-0.5",
        md: "text-xs gap-1",
        lg: "text-sm gap-1.5",
        xl: "text-base gap-2",
        "2xl": "text-lg gap-2",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export interface TeamKitProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof teamKitVariants> {
  /**
   * FIFA three-letter country code (e.g., "ESP", "BRA", "ARG")
   */
  fifaCode: string;
  /**
   * Team name for accessibility
   */
  teamName: string;
  /**
   * Custom image path (overrides default `/teams/kits/{fifaCode}.png`)
   */
  imagePath?: string;
  /**
   * Show border around kit (Tailwind ring)
   */
  bordered?: boolean;
  /**
   * Apply hover effect (scale + shadow)
   */
  hoverable?: boolean;
}

function TeamKit({
  fifaCode,
  teamName,
  imagePath,
  size,
  rounded,
  bordered = false,
  hoverable = false,
  className,
  ...props
}: TeamKitProps) {
  const [imageError, setImageError] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  // Generate default image path
  const kitImagePath = imagePath || `/teams/kits/${fifaCode}_1.png`;

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
          teamKitVariants({ size, rounded }),
          teamKitFallbackVariants({ size }),
          bordered && "ring-2 ring-border ring-offset-2",
          hoverable && "hover:scale-105 hover:shadow-lg cursor-pointer",
          className
        )}
        title={`${teamName} kit`}
        aria-label={`${teamName} (${fifaCode}) kit`}
        {...props}
      >
        <span className="text-2xl">👕</span>
        <span className="text-xs">{fifaCode}</span>
      </div>
    );
  }

  // Imagen con skeleton hasta que cargue
  return (
    <div
      className={cn(
        teamKitVariants({ size, rounded }),
        bordered && "ring-2 ring-primary/20 ring-offset-2",
        hoverable &&
          "hover:scale-105 hover:shadow-lg cursor-pointer hover:ring-primary/40",
        !imageLoaded && "animate-pulse",
        className
      )}
      title={`${teamName} kit`}
      {...props}
    >
      <img
        ref={imgRef}
        src={kitImagePath}
        alt={`${teamName} kit`}
        className={cn(
          "absolute inset-0 block h-full w-full object-contain select-none pointer-events-none p-2",
          "transition-opacity duration-500"
        )}
        style={{
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

export { TeamKit, teamKitVariants };
