import { z } from "zod";

export type UpdateProfileFormData = {
  name: string;
  email: string;
};

export type UpdateProfileValidationMessages = {
  nameRequired: string;
  nameMin: string;
  emailRequired: string;
  emailInvalid: string;
};

export const createUpdateProfileSchema = ({
  nameRequired,
  nameMin,
  emailRequired,
  emailInvalid,
}: UpdateProfileValidationMessages) =>
  z.object({
    name: z.string().min(1, nameRequired).min(2, nameMin),
    email: z.string().min(1, emailRequired).email(emailInvalid),
  });
