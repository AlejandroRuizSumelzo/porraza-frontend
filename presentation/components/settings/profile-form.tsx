"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, Mail } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { Badge } from "@/presentation/components/ui/badge";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/presentation/components/ui/field";
import {
  createUpdateProfileSchema,
  type UpdateProfileFormData,
  type UpdateProfileValidationMessages,
} from "@/presentation/schemas/update-profile-schema";
import type { User } from "@/domain/entities/user";

interface ProfileFormProps {
  user: User;
  onSubmit: (data: UpdateProfileFormData) => Promise<void>;
  isLoading?: boolean;
  validationMessages: UpdateProfileValidationMessages;
}

export function ProfileForm({
  user,
  onSubmit,
  isLoading = false,
  validationMessages,
}: ProfileFormProps) {
  const schema = createUpdateProfileSchema(validationMessages);

  const form = useForm<UpdateProfileFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  // Reset form when user changes
  useEffect(() => {
    form.reset({
      name: user.name,
      email: user.email,
    });
  }, [user, form]);

  const handleSubmit = async (data: UpdateProfileFormData) => {
    // Check if data actually changed
    if (data.name === user.name && data.email === user.email) {
      return;
    }

    await onSubmit(data);
  };

  const hasChanges =
    form.watch("name") !== user.name || form.watch("email") !== user.email;

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      {/* Name Field */}
      <Field data-invalid={!!form.formState.errors.name}>
        <FieldLabel htmlFor="name">Nombre completo</FieldLabel>
        <Input
          id="name"
          type="text"
          placeholder="Tu nombre"
          disabled={isLoading}
          {...form.register("name")}
        />
        <FieldError errors={[form.formState.errors.name]} />
      </Field>

      {/* Email Field */}
      <Field data-invalid={!!form.formState.errors.email}>
        <div className="flex items-center justify-between">
          <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
          {user.isEmailVerified && (
            <Badge variant="secondary" className="gap-1 text-xs">
              <CheckCircle2 className="size-3 text-green-600" />
              Verificado
            </Badge>
          )}
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="tu@email.com"
            disabled={isLoading}
            className="pl-10"
            {...form.register("email")}
          />
        </div>
        <FieldDescription>
          Si cambias tu email, deberás verificarlo nuevamente.
        </FieldDescription>
        <FieldError errors={[form.formState.errors.email]} />
      </Field>

      {/* Premium Badge (Read-only) */}
      {user.hasPaid && (
        <div className="rounded-lg border bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 p-4">
          <div className="flex items-center gap-2">
            <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white border-0">
              ⭐ Premium
            </Badge>
            <span className="text-sm text-muted-foreground">
              Tienes acceso completo a todas las funciones
            </span>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex items-center gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading || !hasChanges || !form.formState.isValid}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Guardando...
            </>
          ) : (
            "Guardar cambios"
          )}
        </Button>

        {hasChanges && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => form.reset()}
            disabled={isLoading}
          >
            Cancelar
          </Button>
        )}
      </div>

      {/* Last Login Info */}
      {user.lastLoginAt && (
        <p className="text-xs text-muted-foreground pt-2">
          Último acceso:{" "}
          {new Date(user.lastLoginAt).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      )}
    </form>
  );
}
