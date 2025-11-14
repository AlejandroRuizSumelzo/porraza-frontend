import type {
  League,
  LeagueCategory,
  LeagueMember,
  LeagueRanking,
  LeagueRankingEntry,
  LeagueVisibility,
  UserRanking,
} from "@/domain/entities/league";
import type {
  CreateLeagueDTO,
  JoinLeagueDTO,
  LeagueDTO,
  LeagueMemberDTO,
  LeagueRankingEntryDTO,
  LeagueRankingResponseDTO,
  TransferAdminDTO,
  UpdateLeagueDTO,
  UserRankingDTO,
} from "@/infrastructure/http/dtos/league-dto";

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
      visibility: dto.visibility,
      category: dto.category,
      requiredEmailDomain: dto.requiredEmailDomain,
      adminUserId: dto.adminUserId,
      maxMembers: dto.maxMembers,
      currentMembers: dto.currentMembers,
      code: dto.code,
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
    visibility: LeagueVisibility;
    category: LeagueCategory;
    code?: string;
    requiredEmailDomain?: string;
  }): CreateLeagueDTO {
    return {
      name: data.name,
      description: data.description,
      visibility: data.visibility,
      category: data.category,
      code: data.code,
      requiredEmailDomain: data.requiredEmailDomain,
    };
  }

  /**
   * Transform domain entity to update DTO
   */
  static toUpdateDTO(data: {
    name?: string;
    description?: string;
    visibility?: LeagueVisibility;
    category?: LeagueCategory;
    requiredEmailDomain?: string;
  }): UpdateLeagueDTO {
    return {
      name: data.name,
      description: data.description,
      visibility: data.visibility,
      category: data.category,
      requiredEmailDomain: data.requiredEmailDomain,
    };
  }

  /**
   * Transform join league parameters to DTO
   */
  static toJoinDTO(code?: string): JoinLeagueDTO {
    return {
      code,
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

  /**
   * Transform user ranking DTO to domain entity
   */
  static toUserRankingDomain(dto: UserRankingDTO): UserRanking {
    return {
      id: dto.id,
      name: dto.name,
      email: dto.email, // Already masked from API
    };
  }

  /**
   * Transform league ranking entry DTO to domain entity
   */
  static toRankingEntryDomain(dto: LeagueRankingEntryDTO): LeagueRankingEntry {
    return {
      position: dto.position,
      user: this.toUserRankingDomain(dto.user),
      totalPoints: dto.totalPoints,
      predictionId: dto.predictionId,
      isLocked: dto.isLocked,
      groupsCompleted: dto.groupsCompleted,
      knockoutsCompleted: dto.knockoutsCompleted,
      awardsCompleted: dto.awardsCompleted,
      lastPointsCalculation: dto.lastPointsCalculation
        ? new Date(dto.lastPointsCalculation)
        : null,
      joinedAt: new Date(dto.joinedAt),
    };
  }

  /**
   * Transform league ranking response DTO to domain entity
   */
  static toRankingDomain(dto: LeagueRankingResponseDTO): LeagueRanking {
    return {
      leagueId: dto.leagueId,
      totalMembers: dto.totalMembers,
      activePredictions: dto.activePredictions,
      ranking: dto.ranking.map((entry) => this.toRankingEntryDomain(entry)),
      generatedAt: new Date(dto.generatedAt),
    };
  }
}
