import { z } from "zod";

/**
 * Forgot Password Form Schema
 * Validation schema for the forgot password form using Zod
 */
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("Dirección de email inválida"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
