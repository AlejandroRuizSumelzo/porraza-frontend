import { z } from "zod";

/**
 * League Form Schema
 * Validation schema for creating a new league
 *
 * Matches the CreateLeagueDto from the backend
 * - name: 3-100 characters (required)
 * - description: optional string
 * - type: 'public' or 'private' (required)
 */
export const createLeagueSchema = z.object({
  name: z
    .string()
    .min(3, "League name must be at least 3 characters")
    .max(100, "League name must not exceed 100 characters")
    .trim(),

  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
    .trim()
    .optional()
    .or(z.literal("")),

  type: z.enum(["public", "private"], {
    message: "League type must be either 'public' or 'private'",
  }),
});

/**
 * Type inference from the schema
 */
export type CreateLeagueFormData = z.infer<typeof createLeagueSchema>;

/**
 * Join League with Code Schema
 * Validation for joining a league with code
 * - code: 6-20 alphanumeric characters (case-insensitive)
 */
export const joinLeagueCodeSchema = z.object({
  code: z
    .string()
    .min(6, "El código debe tener al menos 6 caracteres")
    .max(20, "El código no puede exceder 20 caracteres")
    .regex(
      /^[A-Z0-9]+$/i,
      "El código debe contener solo letras y números"
    )
    .trim()
    .transform((val) => val.toUpperCase()),
});

export type JoinLeagueCodeFormData = z.infer<typeof joinLeagueCodeSchema>;
