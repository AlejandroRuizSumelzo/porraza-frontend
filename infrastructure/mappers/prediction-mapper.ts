import type { Prediction } from "@/domain/entities/prediction";
import type {
  MatchPrediction,
  PenaltiesWinner,
} from "@/domain/entities/match-prediction";
import type { PredictionStats } from "@/domain/entities/prediction-stats";
import type { PredictionRanking } from "@/domain/entities/prediction-ranking";
import type { PredictionDTO } from "@/infrastructure/http/dtos/prediction-dto";
import type { MatchPredictionDTO } from "@/infrastructure/http/dtos/match-prediction-dto";
import type { PredictionStatsDTO } from "@/infrastructure/http/dtos/prediction-stats-dto";
import type { PredictionRankingDTO } from "@/infrastructure/http/dtos/prediction-ranking-dto";

/**
 * Prediction Mapper
 * Transforms data between DTOs (API format) and Domain Entities (business format)
 */
export class PredictionMapper {
  /**
   * Transform PredictionDTO to Domain Entity
   */
  static predictionToDomain(dto: PredictionDTO): Prediction {
    return {
      id: dto.id,
      userId: dto.userId,
      leagueId: dto.leagueId,
      goldenBootPlayerId: dto.goldenBootPlayerId,
      goldenBallPlayerId: dto.goldenBallPlayerId,
      goldenGlovePlayerId: dto.goldenGlovePlayerId,
      championTeamId: dto.championTeamId,
      totalPoints: dto.totalPoints,
      isLocked: dto.isLocked,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    };
  }

  /**
   * Transform Domain Prediction to DTO
   */
  static predictionToDTO(domain: Prediction): PredictionDTO {
    return {
      id: domain.id,
      userId: domain.userId,
      leagueId: domain.leagueId,
      goldenBootPlayerId: domain.goldenBootPlayerId,
      goldenBallPlayerId: domain.goldenBallPlayerId,
      goldenGlovePlayerId: domain.goldenGlovePlayerId,
      championTeamId: domain.championTeamId,
      totalPoints: domain.totalPoints,
      isLocked: domain.isLocked,
      createdAt: domain.createdAt.toISOString(),
      updatedAt: domain.updatedAt.toISOString(),
    };
  }

  /**
   * Transform MatchPredictionDTO to Domain Entity
   */
  static matchPredictionToDomain(dto: MatchPredictionDTO): MatchPrediction {
    return {
      matchId: dto.matchId,
      homeScore: dto.homeScore,
      awayScore: dto.awayScore,
      homeScoreET: dto.homeScoreET ?? null,
      awayScoreET: dto.awayScoreET ?? null,
      penaltiesWinner: dto.penaltiesWinner
        ? (dto.penaltiesWinner as PenaltiesWinner)
        : null,
    };
  }

  /**
   * Transform Domain MatchPrediction to DTO
   */
  static matchPredictionToDTO(domain: MatchPrediction): MatchPredictionDTO {
    const dto: MatchPredictionDTO = {
      matchId: domain.matchId,
      homeScore: domain.homeScore,
      awayScore: domain.awayScore,
    };

    if (domain.homeScoreET !== null && domain.homeScoreET !== undefined) {
      dto.homeScoreET = domain.homeScoreET;
    }

    if (domain.awayScoreET !== null && domain.awayScoreET !== undefined) {
      dto.awayScoreET = domain.awayScoreET;
    }

    if (domain.penaltiesWinner) {
      dto.penaltiesWinner = domain.penaltiesWinner;
    }

    return dto;
  }

  /**
   * Transform array of MatchPrediction DTOs to Domain
   */
  static matchPredictionsToDomain(
    dtos: MatchPredictionDTO[]
  ): MatchPrediction[] {
    return dtos.map((dto) => this.matchPredictionToDomain(dto));
  }

  /**
   * Transform array of Domain MatchPredictions to DTOs
   */
  static matchPredictionsToDTOs(
    domain: MatchPrediction[]
  ): MatchPredictionDTO[] {
    return domain.map((prediction) => this.matchPredictionToDTO(prediction));
  }

  /**
   * Transform PredictionStatsDTO to Domain Entity
   */
  static statsToDomain(dto: PredictionStatsDTO): PredictionStats {
    return {
      totalMatches: dto.totalMatches,
      predictedMatches: dto.predictedMatches,
      groupsCompleted: dto.groupsCompleted,
      totalGroups: dto.totalGroups,
      hasChampion: dto.hasChampion,
      hasAllAwards: dto.hasAllAwards,
      completionPercentage: dto.completionPercentage,
    };
  }

  /**
   * Transform PredictionRankingDTO to Domain Entity
   */
  static rankingToDomain(dto: PredictionRankingDTO): PredictionRanking {
    return {
      leagueId: dto.leagueId,
      totalParticipants: dto.totalParticipants,
    };
  }
}
