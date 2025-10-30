import { z } from "zod";

export type ForgotPasswordFormData = {
  email: string;
};

export type ForgotPasswordValidationMessages = {
  emailRequired: string;
  emailInvalid: string;
};

export const createForgotPasswordSchema = ({
  emailRequired,
  emailInvalid,
}: ForgotPasswordValidationMessages) =>
  z.object({
    email: z.email(emailInvalid).min(1, emailRequired),
  });
