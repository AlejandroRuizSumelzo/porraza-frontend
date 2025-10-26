import type { TeamDTO } from "@/infrastructure/http/dtos/team-dto";
import type { StadiumDTO } from "@/infrastructure/http/dtos/stadium-dto";
import type { GroupDTO } from "@/infrastructure/http/dtos/group-dto";

/**
 * Raw Match DTO (as returned by prediction endpoint)
 * This matches the actual backend response with populated Team, Stadium, and Group objects
 */
export interface RawMatchDTO {
  id: string;
  matchNumber: number;
  homeTeam: TeamDTO;
  awayTeam: TeamDTO;
  homeTeamPlaceholder: string | null;
  awayTeamPlaceholder: string | null;
  stadium: StadiumDTO;
  group: GroupDTO;
  phase: string;
  matchDate: string; // ISO 8601 timestamp
  matchTime: string; // HH:MM:SS format
  homeScore: number | null;
  awayScore: number | null;
  homeScoreEt: number | null;
  awayScoreEt: number | null;
  homePenalties: number | null;
  awayPenalties: number | null;
  status: string;
  predictionsLockedAt: string; // ISO 8601 timestamp
  dependsOnMatchIds: string[] | null;
  createdAt: string; // ISO 8601 timestamp
  updatedAt: string; // ISO 8601 timestamp
}

/**
 * User Match Prediction DTO
 * Represents the user's prediction for a specific match
 */
export interface UserMatchPredictionDTO {
  id: string | null;
  predictionId: string | null;
  matchId: string;
  homeScore: number;
  awayScore: number;
  homeScoreET: number | null;
  awayScoreET: number | null;
  penaltiesWinner: string | null;
  pointsEarned: number;
  pointsBreakdown: Record<string, unknown>; // Can be empty object {}
  createdAt: string | null;
  updatedAt: string | null;
}

/**
 * Match with Prediction DTO
 * Combines match data with user's prediction
 */
export interface MatchWithPredictionDTO {
  match: RawMatchDTO;
  userPrediction: UserMatchPredictionDTO;
}
