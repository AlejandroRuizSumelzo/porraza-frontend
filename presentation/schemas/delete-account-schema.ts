import { z } from "zod";

export type DeleteAccountFormData = {
  password: string;
  confirmation: boolean;
};

export type DeleteAccountValidationMessages = {
  passwordRequired: string;
  confirmationRequired: string;
};

export const createDeleteAccountSchema = ({
  passwordRequired,
  confirmationRequired,
}: DeleteAccountValidationMessages) =>
  z
    .object({
      password: z.string().min(1, passwordRequired),
      confirmation: z.boolean(),
    })
    .refine((data) => data.confirmation === true, {
      message: confirmationRequired,
      path: ["confirmation"],
    });
