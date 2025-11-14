import { z } from "zod";

/**
 * League Form Schema
 * Validation schema for creating a new league
 *
 * Matches the CreateLeagueDto from the backend
 * - name: 3-100 characters (required)
 * - description: optional string
 * - visibility: 'public' or 'private' (required)
 * - category: 'general', 'corporate', 'friends', 'community' (required)
 * - code: optional custom league code (6-20 uppercase alphanumeric)
 * - requiredEmailDomain: optional (required for corporate leagues)
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

  visibility: z.enum(["public", "private"], {
    message: "League visibility must be either 'public' or 'private'",
  }),

  category: z.enum(["general", "corporate", "friends", "community"], {
    message: "League category must be general, corporate, friends, or community",
  }),

  code: z
    .string()
    .regex(/^[A-Z0-9]{6,20}$/, "Code must be 6-20 uppercase alphanumeric characters")
    .optional()
    .or(z.literal("")),

  requiredEmailDomain: z
    .string()
    .regex(/^@.+\..+$/, "Email domain must start with @ (e.g., @google.com)")
    .optional()
    .or(z.literal("")),
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
    .regex(/^[A-Z0-9]+$/i, "El código debe contener solo letras y números")
    .trim()
    .transform((val) => val.toUpperCase()),
});

export type JoinLeagueCodeFormData = z.infer<typeof joinLeagueCodeSchema>;

/**
 * Edit League Schema
 * Validation schema for editing an existing league
 *
 * IMPORTANT: Only name and description can be edited
 * - Visibility (public/private) cannot be changed
 * - Category cannot be changed
 * - Code cannot be changed
 * - RequiredEmailDomain cannot be changed
 *
 * Matches the UpdateLeagueDto from the backend (but only uses allowed fields)
 */
export const editLeagueSchema = z.object({
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
});

export type EditLeagueFormData = z.infer<typeof editLeagueSchema>;
