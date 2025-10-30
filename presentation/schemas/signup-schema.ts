import { z } from "zod";

export type SignupFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignupValidationMessages = {
  nameMin: string;
  emailRequired: string;
  emailInvalid: string;
  passwordRequired: string;
  passwordMin: string;
  confirmPasswordRequired: string;
  passwordsMismatch: string;
};

export const createSignupSchema = ({
  nameMin,
  emailRequired,
  emailInvalid,
  passwordRequired,
  passwordMin,
  confirmPasswordRequired,
  passwordsMismatch,
}: SignupValidationMessages) =>
  z
    .object({
      name: z.string().min(2, nameMin),
      email: z.email(emailInvalid).min(1, emailRequired),
      password: z.string().min(1, passwordRequired).min(8, passwordMin),
      confirmPassword: z.string().min(1, confirmPasswordRequired),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: passwordsMismatch,
      path: ["confirmPassword"],
    });
