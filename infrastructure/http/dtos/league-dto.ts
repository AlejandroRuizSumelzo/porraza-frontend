/**
 * League DTO from API (Response)
 * Matches the LeagueResponseDto from Swagger
 */
export interface LeagueDTO {
  id: string;
  name: string;
  description: string | null;
  visibility: "public" | "private";
  category: "general" | "corporate" | "friends" | "community";
  requiredEmailDomain: string | null;
  adminUserId: string;
  maxMembers: number;
  currentMembers: number;
  code: string;
  logoUrl: string | null;
  isAdmin: boolean;
  isMember: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create League DTO (Request)
 * Matches the CreateLeagueDto from Swagger
 */
export interface CreateLeagueDTO {
  name: string;
  description?: string;
  visibility: "public" | "private";
  category: "general" | "corporate" | "friends" | "community";
  code?: string;
  requiredEmailDomain?: string;
}

/**
 * Update League DTO (Request)
 * Matches the UpdateLeagueDto from Swagger
 */
export interface UpdateLeagueDTO {
  name?: string;
  description?: string;
  visibility?: "public" | "private";
  category?: "general" | "corporate" | "friends" | "community";
  requiredEmailDomain?: string;
}

/**
 * Join League DTO (Request)
 * Matches the JoinLeagueDto from Swagger
 */
export interface JoinLeagueDTO {
  code?: string;
}

/**
 * Transfer Admin DTO (Request)
 * Matches the TransferAdminDto from Swagger
 */
export interface TransferAdminDTO {
  newAdminUserId: string;
}

/**
 * League Member DTO (Response)
 * Matches the User response from GET /leagues/{id}/members
 */
export interface LeagueMemberDTO {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
  hasPaid: boolean;
  paymentDate: string | null;
  stripeCustomerId: string | null;
}

/**
 * User Ranking DTO (Response)
 * Matches the user object from LeagueRankingEntryDto in Swagger
 */
export interface UserRankingDTO {
  id: string;
  name: string;
  email: string; // Partially masked (e.g., a***@example.com)
}

/**
 * League Ranking Entry DTO (Response)
 * Matches the LeagueRankingEntryDto from Swagger
 */
export interface LeagueRankingEntryDTO {
  position: number;
  user: UserRankingDTO;
  totalPoints: number;
  predictionId: string | null;
  isLocked: boolean;
  groupsCompleted: boolean;
  knockoutsCompleted: boolean;
  awardsCompleted: boolean;
  lastPointsCalculation: string | null;
  joinedAt: string;
}

/**
 * League Ranking Response DTO (Response)
 * Matches the LeagueRankingResponseDto from Swagger
 */
export interface LeagueRankingResponseDTO {
  leagueId: string;
  totalMembers: number;
  activePredictions: number;
  ranking: LeagueRankingEntryDTO[];
  generatedAt: string;
}
