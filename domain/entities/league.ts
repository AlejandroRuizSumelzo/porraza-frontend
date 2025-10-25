/**
 * League Entity
 * Represents a competition league where users can participate
 */
export interface League {
  id: string;
  name: string;
  description: string | null;
  type: "public" | "private";
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
 * League type enumeration
 */
export type LeagueType = "public" | "private";

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
