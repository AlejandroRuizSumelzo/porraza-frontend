import { z } from "zod";

/**
 * Reset Password Form Schema
 * Validation schema for the reset password form using Zod
 * Reuses password validation rules from signup schema
 */
export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, "La contraseña es requerida")
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z.string().min(1, "Debes confirmar la contraseña"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
