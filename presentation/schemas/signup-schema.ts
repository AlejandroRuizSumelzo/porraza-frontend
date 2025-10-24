import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.email("Dirección de email inválida"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
