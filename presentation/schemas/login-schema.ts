import { z } from "zod";

export type LoginFormData = {
  email: string;
  password: string;
};

export type LoginValidationMessages = {
  emailRequired: string;
  emailInvalid: string;
  passwordRequired: string;
  passwordMin: string;
};

export const createLoginSchema = ({
  emailRequired,
  emailInvalid,
  passwordRequired,
  passwordMin,
}: LoginValidationMessages) =>
  z.object({
    email: z.email(emailInvalid).min(1, emailRequired),
    password: z.string().min(1, passwordRequired).min(8, passwordMin),
  });
