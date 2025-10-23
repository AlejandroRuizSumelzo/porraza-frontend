import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Dirección de email inválida"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
