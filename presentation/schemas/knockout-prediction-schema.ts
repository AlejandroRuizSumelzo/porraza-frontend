import { z } from "zod";

/**
 * Valid knockout phases enum for Zod validation
 */
export const knockoutPhaseEnum = z.enum([
  "ROUND_OF_32",
  "ROUND_OF_16",
  "QUARTER_FINALS",
  "SEMI_FINALS",
  "FINAL",
]);

/**
 * Penalties winner enum
 */
export const penaltiesWinnerEnum = z.enum(["home", "away"]);

/**
 * Single knockout match prediction schema
 * Includes knockout-specific validation rules:
 * - Tied matches must have extra time or penalties
 * - Tied matches after ET must have penalties winner
 */
export const knockoutMatchPredictionSchema = z
  .object({
    /**
     * Match UUID
     */
    matchId: z.string().uuid({ message: "Match ID must be a valid UUID" }),

    /**
     * Home team UUID
     */
    homeTeamId: z
      .string()
      .uuid({ message: "Home team ID must be a valid UUID" }),

    /**
     * Away team UUID
     */
    awayTeamId: z
      .string()
      .uuid({ message: "Away team ID must be a valid UUID" }),

    /**
     * Home team score (90 minutes)
     */
    homeScore: z
      .number({
        message: "El marcador local es requerido y debe ser un número válido",
      })
      .int("El marcador local debe ser un número entero")
      .min(0, "El marcador local no puede ser negativo"),

    /**
     * Away team score (90 minutes)
     */
    awayScore: z
      .number({
        message:
          "El marcador visitante es requerido y debe ser un número válido",
      })
      .int("El marcador visitante debe ser un número entero")
      .min(0, "El marcador visitante no puede ser negativo"),

    /**
     * Home team score in extra time (optional, only for knockouts)
     */
    homeScoreET: z
      .number()
      .int("Home score ET must be an integer")
      .min(0, "Home score ET cannot be negative")
      .nullable()
      .optional(),

    /**
     * Away team score in extra time (optional, only for knockouts)
     */
    awayScoreET: z
      .number()
      .int("Away score ET must be an integer")
      .min(0, "Away score ET cannot be negative")
      .nullable()
      .optional(),

    /**
     * Penalties winner (only for knockout matches that go to penalties)
     */
    penaltiesWinner: penaltiesWinnerEnum.nullable().optional(),
  })
  .refine(
    (data) => {
      // Rule 1: Home and away teams cannot be the same
      return data.homeTeamId !== data.awayTeamId;
    },
    {
      message: "Home and away teams cannot be the same",
      path: ["awayTeamId"],
    }
  )
  .refine(
    (data) => {
      // Rule 2: If tied in 90 min, MUST have extra time scores defined
      // Users cannot skip ET and go directly to penalties
      const isTied = data.homeScore === data.awayScore;

      if (isTied) {
        const hasExtraTime =
          data.homeScoreET !== null &&
          data.homeScoreET !== undefined &&
          data.awayScoreET !== null &&
          data.awayScoreET !== undefined;

        return hasExtraTime;
      }

      return true;
    },
    {
      message:
        "Si hay empate en tiempo regular, debes completar la prórroga antes de elegir ganador por penaltis",
      path: ["homeScoreET"],
    }
  )
  .refine(
    (data) => {
      // Rule 3: If tied after ET, must have penalties winner
      const hasExtraTime =
        data.homeScoreET !== null &&
        data.homeScoreET !== undefined &&
        data.awayScoreET !== null &&
        data.awayScoreET !== undefined;

      if (hasExtraTime) {
        const isTiedAfterET = data.homeScoreET === data.awayScoreET;

        if (isTiedAfterET) {
          return (
            data.penaltiesWinner !== null && data.penaltiesWinner !== undefined
          );
        }
      }

      return true;
    },
    {
      message:
        "Tied matches after extra time must have a penalties winner (home or away)",
      path: ["penaltiesWinner"],
    }
  )
  .refine(
    (data) => {
      // Rule 4: If ET resolves the tie, penalties should NOT be set
      const isTiedRegularTime = data.homeScore === data.awayScore;

      if (!isTiedRegularTime) {
        // Not tied in regular time, no need for ET/penalties
        return true;
      }

      const hasExtraTime =
        data.homeScoreET !== null &&
        data.homeScoreET !== undefined &&
        data.awayScoreET !== null &&
        data.awayScoreET !== undefined;

      if (hasExtraTime) {
        const isTiedAfterET = data.homeScoreET === data.awayScoreET;

        // If NOT tied after ET, penalties should not be set
        if (!isTiedAfterET) {
          return (
            data.penaltiesWinner === null || data.penaltiesWinner === undefined
          );
        }
      }

      return true;
    },
    {
      message:
        "Penalties winner should not be set if extra time resolves the tie",
      path: ["penaltiesWinner"],
    }
  );

/**
 * Save knockout predictions schema
 * Full form schema for saving a complete knockout phase
 */
export const saveKnockoutPredictionsSchema = z.object({
  /**
   * Prediction UUID
   */
  predictionId: z
    .string()
    .uuid({ message: "Prediction ID must be a valid UUID" }),

  /**
   * Knockout phase
   */
  phase: knockoutPhaseEnum,

  /**
   * Array of match predictions for this phase
   * Number of predictions must match the phase:
   * - ROUND_OF_32: 16 matches
   * - ROUND_OF_16: 8 matches
   * - QUARTER_FINALS: 4 matches
   * - SEMI_FINALS: 2 matches
   * - FINAL: 1 match
   */
  predictions: z
    .array(knockoutMatchPredictionSchema)
    .min(1, "At least one match prediction is required"),
});

/**
 * TypeScript type inferred from the schema
 */
export type KnockoutMatchPredictionFormData = z.infer<
  typeof knockoutMatchPredictionSchema
>;

/**
 * TypeScript type inferred from the full save schema
 */
export type SaveKnockoutPredictionsFormData = z.infer<
  typeof saveKnockoutPredictionsSchema
>;
