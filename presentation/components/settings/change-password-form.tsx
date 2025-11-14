"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ShieldCheck, Check, X } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import { PasswordInput } from "@/presentation/components/ui/password-input";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/presentation/components/ui/field";
import {
  createChangePasswordSchema,
  type ChangePasswordFormData,
  type ChangePasswordValidationMessages,
} from "@/presentation/schemas/change-password-schema";
import { cn } from "@/presentation/utils/cn";

interface ChangePasswordFormProps {
  onSubmit: (data: ChangePasswordFormData) => Promise<void>;
  isLoading?: boolean;
  validationMessages: ChangePasswordValidationMessages;
}

export function ChangePasswordForm({
  onSubmit,
  isLoading = false,
  validationMessages,
}: ChangePasswordFormProps) {
  const schema = createChangePasswordSchema(validationMessages);

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (data: ChangePasswordFormData) => {
    await onSubmit(data);
    form.reset(); // Clear form after successful password change
  };

  const newPassword = form.watch("newPassword");

  // Password strength indicators
  const passwordChecks = {
    minLength: newPassword.length >= 8,
    hasUppercase: /[A-Z]/.test(newPassword),
    hasLowercase: /[a-z]/.test(newPassword),
    hasNumber: /[0-9]/.test(newPassword),
  };

  const allChecksPassed = Object.values(passwordChecks).every(Boolean);

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      {/* Info Banner */}
      <div className="rounded-lg border bg-muted/50 p-4">
        <div className="flex gap-3">
          <ShieldCheck className="size-5 text-primary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Seguridad de tu cuenta</p>
            <p className="text-xs text-muted-foreground">
              Tu contraseña debe tener al menos 8 caracteres, incluyendo
              mayúsculas, minúsculas y números.
            </p>
          </div>
        </div>
      </div>

      {/* Current Password */}
      <Field data-invalid={!!form.formState.errors.currentPassword}>
        <FieldLabel htmlFor="currentPassword">Contraseña actual</FieldLabel>
        <PasswordInput
          id="currentPassword"
          placeholder="Ingresa tu contraseña actual"
          disabled={isLoading}
          {...form.register("currentPassword")}
        />
        <FieldError errors={[form.formState.errors.currentPassword]} />
      </Field>

      {/* New Password */}
      <Field data-invalid={!!form.formState.errors.newPassword}>
        <FieldLabel htmlFor="newPassword">Nueva contraseña</FieldLabel>
        <PasswordInput
          id="newPassword"
          placeholder="Ingresa tu nueva contraseña"
          disabled={isLoading}
          {...form.register("newPassword")}
        />
        <FieldError errors={[form.formState.errors.newPassword]} />

        {/* Password Strength Checklist */}
        {newPassword && (
          <div className="mt-3 space-y-2 rounded-md border bg-muted/30 p-3">
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Requisitos de contraseña:
            </p>
            <PasswordRequirement
              met={passwordChecks.minLength}
              text="Mínimo 8 caracteres"
            />
            <PasswordRequirement
              met={passwordChecks.hasUppercase}
              text="Al menos una mayúscula"
            />
            <PasswordRequirement
              met={passwordChecks.hasLowercase}
              text="Al menos una minúscula"
            />
            <PasswordRequirement
              met={passwordChecks.hasNumber}
              text="Al menos un número"
            />
          </div>
        )}
      </Field>

      {/* Confirm Password */}
      <Field data-invalid={!!form.formState.errors.confirmPassword}>
        <FieldLabel htmlFor="confirmPassword">
          Confirmar nueva contraseña
        </FieldLabel>
        <PasswordInput
          id="confirmPassword"
          placeholder="Confirma tu nueva contraseña"
          disabled={isLoading}
          {...form.register("confirmPassword")}
        />
        <FieldError errors={[form.formState.errors.confirmPassword]} />
      </Field>

      {/* Submit Button */}
      <div className="flex items-center gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading || !form.formState.isValid}
          variant="default"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Cambiando contraseña...
            </>
          ) : (
            <>
              <ShieldCheck className="mr-2 size-4" />
              Cambiar contraseña
            </>
          )}
        </Button>

        {form.formState.isDirty && (
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

      {/* Security Notice */}
      <p className="text-xs text-muted-foreground">
        Recibirás un email de confirmación cuando tu contraseña sea cambiada.
      </p>
    </form>
  );
}

// Helper component for password requirements
function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      {met ? (
        <Check className="size-4 text-green-600 shrink-0" />
      ) : (
        <X className="size-4 text-muted-foreground shrink-0" />
      )}
      <span className={cn(met ? "text-green-700 dark:text-green-500" : "text-muted-foreground")}>
        {text}
      </span>
    </div>
  );
}
