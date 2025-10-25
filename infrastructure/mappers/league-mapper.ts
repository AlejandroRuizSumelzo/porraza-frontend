import type { League, LeagueMember } from "@/domain/entities/league";

/**
 * League DTO from API (Response)
 * Matches the LeagueResponseDto from Swagger
 */
export interface LeagueDTO {
  id: string;
  name: string;
  description: string | null;
  type: "public" | "private";
  adminUserId: string;
  maxMembers: number;
  currentMembers: number;
  inviteCode: string | null;
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
  type: "public" | "private";
}

/**
 * Update League DTO (Request)
 * Matches the UpdateLeagueDto from Swagger
 */
export interface UpdateLeagueDTO {
  name?: string;
  description?: string;
  type?: "public" | "private";
}

/**
 * Join League DTO (Request)
 * Matches the JoinLeagueDto from Swagger
 */
export interface JoinLeagueDTO {
  inviteCode?: string;
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
 * Mapper to transform between League domain entity and DTOs
 */
export class LeagueMapper {
  /**
   * Transform API DTO to domain entity
   */
  static toDomain(dto: LeagueDTO): League {
    return {
      id: dto.id,
      name: dto.name,
      description: dto.description,
      type: dto.type,
      adminUserId: dto.adminUserId,
      maxMembers: dto.maxMembers,
      currentMembers: dto.currentMembers,
      inviteCode: dto.inviteCode,
      logoUrl: dto.logoUrl,
      isAdmin: dto.isAdmin,
      isMember: dto.isMember,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    };
  }

  /**
   * Transform domain entity to create DTO
   */
  static toCreateDTO(data: {
    name: string;
    description?: string;
    type: "public" | "private";
  }): CreateLeagueDTO {
    return {
      name: data.name,
      description: data.description,
      type: data.type,
    };
  }

  /**
   * Transform domain entity to update DTO
   */
  static toUpdateDTO(data: {
    name?: string;
    description?: string;
    type?: "public" | "private";
  }): UpdateLeagueDTO {
    return {
      name: data.name,
      description: data.description,
      type: data.type,
    };
  }

  /**
   * Transform join league parameters to DTO
   */
  static toJoinDTO(inviteCode?: string): JoinLeagueDTO {
    return {
      inviteCode,
    };
  }

  /**
   * Transform transfer admin parameters to DTO
   */
  static toTransferAdminDTO(newAdminUserId: string): TransferAdminDTO {
    return {
      newAdminUserId,
    };
  }

  /**
   * Transform league member DTO to domain entity
   */
  static toMemberDomain(dto: LeagueMemberDTO): LeagueMember {
    return {
      id: dto.id,
      email: dto.email,
      name: dto.name,
      isActive: dto.isActive,
      isEmailVerified: dto.isEmailVerified,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
      lastLoginAt: dto.lastLoginAt ? new Date(dto.lastLoginAt) : null,
      hasPaid: dto.hasPaid,
      paymentDate: dto.paymentDate ? new Date(dto.paymentDate) : null,
      stripeCustomerId: dto.stripeCustomerId,
    };
  }
}
