"use client";

import { useState, useRef } from "react";
import { Camera, Loader2, User, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/presentation/components/ui/avatar";
import { Button } from "@/presentation/components/ui/button";
import { cn } from "@/presentation/utils/cn";
import { toast } from "sonner";

interface ProfilePictureUploadProps {
  currentImageUrl?: string | null;
  userName: string;
  onUpload: (file: File) => Promise<void>;
  onRemove?: () => Promise<void>;
  isUploading?: boolean;
  className?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_FORMATS = ["image/jpeg", "image/png", "image/webp"];

export function ProfilePictureUpload({
  currentImageUrl,
  userName,
  onUpload,
  onRemove,
  isUploading = false,
  className,
}: ProfilePictureUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayUrl = previewUrl || currentImageUrl;
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const validateFile = (file: File): boolean => {
    if (!ACCEPTED_FORMATS.includes(file.type)) {
      toast.error("Formato no válido. Solo se permiten JPEG, PNG y WebP.");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("El archivo es muy grande. Máximo 5 MB.");
      return false;
    }

    return true;
  };

  const handleFileSelect = async (file: File) => {
    if (!validateFile(file)) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    try {
      await onUpload(file);
      setPreviewUrl(null); // Clear preview after successful upload
    } catch (error) {
      setPreviewUrl(null); // Clear preview on error
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemove = async () => {
    if (!onRemove) return;

    setPreviewUrl(null);
    await onRemove();
  };

  const handleClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Avatar Container */}
      <div
        className={cn(
          "group relative",
          isUploading && "pointer-events-none opacity-60"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Avatar className="size-32 sm:size-40 border-4 border-background shadow-lg ring-2 ring-border">
          <AvatarImage src={displayUrl || undefined} alt={userName} />
          <AvatarFallback className="text-3xl sm:text-4xl font-semibold bg-gradient-to-br from-primary/20 to-primary/5">
            {userInitials}
          </AvatarFallback>
        </Avatar>

        {/* Hover Overlay */}
        <button
          type="button"
          onClick={handleClick}
          disabled={isUploading}
          className={cn(
            "absolute inset-0 rounded-full",
            "flex items-center justify-center",
            "bg-black/0 transition-all duration-200",
            "hover:bg-black/60 focus-visible:bg-black/60",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            isDragging && "bg-black/70 ring-2 ring-primary ring-offset-2"
          )}
        >
          <div className="flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {isUploading ? (
              <>
                <Loader2 className="size-8 text-white animate-spin" />
                <span className="text-xs text-white font-medium">
                  Subiendo...
                </span>
              </>
            ) : (
              <>
                <Camera className="size-8 text-white" />
                <span className="text-xs text-white font-medium">
                  Cambiar foto
                </span>
              </>
            )}
          </div>
        </button>

        {/* Loading Spinner (when uploading) */}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
            <Loader2 className="size-10 text-white animate-spin" />
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleInputChange}
          className="hidden"
          disabled={isUploading}
        />
      </div>

      {/* Info Text */}
      <div className="text-center space-y-1">
        <p className="text-sm text-muted-foreground">
          Click o arrastra una imagen
        </p>
        <p className="text-xs text-muted-foreground">
          JPEG, PNG o WebP (máx. 5 MB)
        </p>
      </div>

      {/* Remove Button (only if there's an image) */}
      {displayUrl && onRemove && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          disabled={isUploading}
          className="text-muted-foreground hover:text-destructive"
        >
          <X className="mr-2 size-4" />
          Eliminar foto
        </Button>
      )}
    </div>
  );
}
