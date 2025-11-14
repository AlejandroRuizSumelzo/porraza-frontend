import { z } from "zod";

export type ChangePasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type ChangePasswordValidationMessages = {
  currentPasswordRequired: string;
  newPasswordRequired: string;
  newPasswordMin: string;
  newPasswordUppercase: string;
  newPasswordLowercase: string;
  newPasswordNumber: string;
  confirmPasswordRequired: string;
  passwordsMismatch: string;
  passwordsSame: string;
};

export const createChangePasswordSchema = ({
  currentPasswordRequired,
  newPasswordRequired,
  newPasswordMin,
  newPasswordUppercase,
  newPasswordLowercase,
  newPasswordNumber,
  confirmPasswordRequired,
  passwordsMismatch,
  passwordsSame,
}: ChangePasswordValidationMessages) =>
  z
    .object({
      currentPassword: z.string().min(1, currentPasswordRequired),
      newPassword: z
        .string()
        .min(1, newPasswordRequired)
        .min(8, newPasswordMin)
        .regex(/[A-Z]/, newPasswordUppercase)
        .regex(/[a-z]/, newPasswordLowercase)
        .regex(/[0-9]/, newPasswordNumber),
      confirmPassword: z.string().min(1, confirmPasswordRequired),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: passwordsMismatch,
      path: ["confirmPassword"],
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
      message: passwordsSame,
      path: ["newPassword"],
    });
