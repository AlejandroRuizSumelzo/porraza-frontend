/**
 * League visibility enumeration
 */
export type LeagueVisibility = "public" | "private";

/**
 * League category enumeration
 */
export type LeagueCategory = "general" | "corporate" | "friends" | "community";

/**
 * League Entity
 * Represents a competition league where users can participate
 */
export interface League {
  id: string;
  name: string;
  description: string | null;
  visibility: LeagueVisibility;
  category: LeagueCategory;
  requiredEmailDomain: string | null;
  adminUserId: string;
  maxMembers: number;
  currentMembers: number;
  code: string;
  logoUrl: string | null;
  isAdmin: boolean;
  isMember: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * League Member Entity
 * Represents a user who is a member of a league
 */
export interface LeagueMember {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date | null;
  hasPaid: boolean;
  paymentDate: Date | null;
  stripeCustomerId: string | null;
}

/**
 * User Ranking Info
 * Represents basic user information for ranking display
 */
export interface UserRanking {
  id: string;
  name: string;
  email: string; // Partially masked (e.g., a***@example.com)
}

/**
 * League Ranking Entry
 * Represents a single entry in the league ranking
 */
export interface LeagueRankingEntry {
  position: number;
  user: UserRanking;
  totalPoints: number;
  predictionId: string | null;
  isLocked: boolean;
  groupsCompleted: boolean;
  knockoutsCompleted: boolean;
  awardsCompleted: boolean;
  lastPointsCalculation: Date | null;
  joinedAt: Date;
}

/**
 * League Ranking
 * Represents the complete ranking/leaderboard of a league
 */
export interface LeagueRanking {
  leagueId: string;
  totalMembers: number;
  activePredictions: number;
  ranking: LeagueRankingEntry[];
  generatedAt: Date;
}
