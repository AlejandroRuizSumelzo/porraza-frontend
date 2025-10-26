import type { Team } from "@/domain/entities/team";
import type { Stadium } from "@/domain/entities/stadium";
import type { Group } from "@/domain/entities/group";

/**
 * User Match Prediction Entity
 * Represents a user's prediction for a specific match with scoring details
 */
export interface UserMatchPrediction {
  id: string | null;
  predictionId: string | null;
  matchId: string;
  homeScore: number;
  awayScore: number;
  homeScoreET: number | null;
  awayScoreET: number | null;
  penaltiesWinner: string | null;
  pointsEarned: number;
  pointsBreakdown: Record<string, unknown>;
  createdAt: Date | null;
  updatedAt: Date | null;
}

/**
 * Raw Match Entity
 * This represents match data as returned by the prediction endpoint
 * Contains populated Team, Stadium, and Group objects
 */
export interface RawMatch {
  id: string;
  matchNumber: number;
  homeTeam: Team;
  awayTeam: Team;
  homeTeamPlaceholder: string | null;
  awayTeamPlaceholder: string | null;
  stadium: Stadium;
  group: Group;
  phase: string;
  matchDate: Date;
  matchTime: string;
  homeScore: number | null;
  awayScore: number | null;
  homeScoreEt: number | null;
  awayScoreEt: number | null;
  homePenalties: number | null;
  awayPenalties: number | null;
  status: string;
  predictionsLockedAt: Date;
  dependsOnMatchIds: string[] | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Match With Prediction Entity
 * Combines match data with user's prediction
 * Used in the predictions page to show matches and allow users to make predictions
 */
export interface MatchWithPrediction {
  match: RawMatch;
  userPrediction: UserMatchPrediction;
}
