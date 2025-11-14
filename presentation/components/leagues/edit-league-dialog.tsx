"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/presentation/components/ui/dialog";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/presentation/components/ui/field";
import { Input } from "@/presentation/components/ui/input";
import { Textarea } from "@/presentation/components/ui/textarea";
import { Button } from "@/presentation/components/ui/button";
import { Separator } from "@/presentation/components/ui/separator";
import { Spinner } from "@/presentation/components/ui/spinner";
import { Image, Upload, X } from "lucide-react";
import {
  editLeagueSchema,
  type EditLeagueFormData,
} from "@/presentation/schemas/league-schema";
import type { League } from "@/domain/entities/league";

interface EditLeagueDialogProps {
  open: boolean;
  league: League | null;
  isUpdating: boolean;
  isUploadingLogo: boolean;
  onConfirm: (data: EditLeagueFormData) => void;
  onUploadLogo: (file: File) => void;
  onCancel: () => void;
}

/**
 * Edit League Dialog Component
 * Allows league admins to edit league name, description, and logo
 *
 * IMPORTANT: Only name and description can be edited
 * - Visibility (public/private) cannot be changed
 * - Category cannot be changed
 * - Code cannot be changed
 */
export function EditLeagueDialog({
  open,
  league,
  isUpdating,
  isUploadingLogo,
  onConfirm,
  onUploadLogo,
  onCancel,
}: EditLeagueDialogProps) {
  const form = useForm<EditLeagueFormData>({
    resolver: zodResolver(editLeagueSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset form when league changes
  useEffect(() => {
    if (league) {
      form.reset({
        name: league.name,
        description: league.description || "",
      });
      // Reset logo state
      setSelectedFile(null);
      setPreviewUrl(null);
      setFileError(null);
    }
  }, [league, form]);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleSubmit = form.handleSubmit((data) => {
    onConfirm(data);
  });

  const handleCancel = () => {
    form.reset();
    setSelectedFile(null);
    setPreviewUrl(null);
    setFileError(null);
    onCancel();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileError(null);

    if (!file) {
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setFileError("Solo se permiten imágenes JPEG, PNG o WebP");
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    // Validate file size (5 MB)
    const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
    if (file.size > maxSize) {
      setFileError("El archivo no debe superar 5 MB");
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    // Create preview
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setSelectedFile(file);
  };

  const handleRemoveImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadLogo = () => {
    if (selectedFile) {
      onUploadLogo(selectedFile);
      // Reset after upload
      setSelectedFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  if (!league) return null;

  const hasNewImage = selectedFile && previewUrl;
  const hasCurrentLogo = league.logoUrl;
  const isSaving = isUpdating || isUploadingLogo;

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => !isOpen && !isSaving && handleCancel()}
    >
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Editar Liga</DialogTitle>
          <DialogDescription>
            Actualiza el nombre, descripción y logo de tu liga. Los demás campos
            no pueden modificarse.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {/* League Name */}
          <Field data-invalid={!!form.formState.errors.name}>
            <FieldLabel htmlFor="name">
              Nombre de la Liga <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="name"
              placeholder="Mi Liga del Mundial 2026"
              aria-invalid={!!form.formState.errors.name}
              {...form.register("name")}
              disabled={isSaving}
            />
            <FieldDescription>
              El nombre de tu liga (3-100 caracteres)
            </FieldDescription>
            <FieldError errors={[form.formState.errors.name]} />
          </Field>

          {/* League Description */}
          <Field data-invalid={!!form.formState.errors.description}>
            <FieldLabel htmlFor="description">
              Descripción (Opcional)
            </FieldLabel>
            <Textarea
              id="description"
              placeholder="Describe tu liga..."
              rows={4}
              aria-invalid={!!form.formState.errors.description}
              {...form.register("description")}
              disabled={isSaving}
            />
            <FieldDescription>
              Una breve descripción de tu liga (máximo 500 caracteres)
            </FieldDescription>
            <FieldError errors={[form.formState.errors.description]} />
          </Field>

          <Separator />

          {/* League Logo Upload */}
          <Field data-invalid={!!fileError}>
            <FieldLabel htmlFor="logo">Logo de la Liga (Opcional)</FieldLabel>

            {/* Current Logo Preview */}
            {hasCurrentLogo && !hasNewImage && (
              <div className="flex items-center gap-4 rounded-lg border border-muted bg-muted/30 p-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-md bg-background">
                  <img
                    src={league.logoUrl!}
                    alt={`Logo de ${league.name}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Logo actual</p>
                  <p className="text-xs text-muted-foreground">
                    Sube una nueva imagen para reemplazarlo
                  </p>
                </div>
              </div>
            )}

            {/* New Image Preview */}
            {hasNewImage && (
              <div className="flex items-center gap-4 rounded-lg border border-primary bg-primary/5 p-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-md bg-background">
                  <img
                    src={previewUrl}
                    alt="Vista previa del nuevo logo"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary">Nuevo logo</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)}{" "}
                    KB)
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveImage}
                  disabled={isSaving}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* File Input */}
            <div className="flex gap-2">
              <Input
                ref={fileInputRef}
                id="logo"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                disabled={isSaving}
                className="flex-1"
              />
              {hasNewImage && (
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={handleUploadLogo}
                  disabled={isUploadingLogo}
                >
                  {isUploadingLogo ? (
                    <Spinner className="mr-2 h-4 w-4" />
                  ) : (
                    <Upload className="mr-2 h-4 w-4" />
                  )}
                  Subir
                </Button>
              )}
            </div>

            <FieldDescription>
              <Image className="mr-1 inline h-3 w-3" />
              Formatos permitidos: JPEG, PNG, WebP. Tamaño máximo: 5 MB.
            </FieldDescription>

            {fileError && (
              <FieldError errors={[{ message: fileError }]} />
            )}
          </Field>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isUpdating && <Spinner className="mr-2 h-4 w-4" />}
              Guardar Cambios
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
