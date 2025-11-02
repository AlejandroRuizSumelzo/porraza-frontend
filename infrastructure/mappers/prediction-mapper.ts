import type { Prediction } from "@/domain/entities/prediction";
import type {
  MatchPrediction,
  PenaltiesWinner,
} from "@/domain/entities/match-prediction";
import type { PredictionStats } from "@/domain/entities/prediction-stats";
import type { PredictionRanking } from "@/domain/entities/prediction-ranking";
import type {
  MatchWithPrediction,
  RawMatch,
  UserMatchPrediction,
} from "@/domain/entities/match-with-prediction";
import type { GroupStanding } from "@/domain/entities/group-standing";
import type { BestThirdPlace } from "@/domain/entities/best-third-place";
import type { RoundOf32Match } from "@/domain/entities/round-of-32-match";
import type { KnockoutMatch } from "@/domain/entities/knockout-match";
import type { KnockoutMatchWithPrediction } from "@/domain/entities/knockout-match-with-prediction";
import type { MatchPhase } from "@/domain/entities/match";
import type { SaveKnockoutPredictionsResponse } from "@/domain/repositories/prediction-repository";
import type { PredictionDTO } from "@/infrastructure/http/dtos/prediction-dto";
import type { MatchPredictionDTO } from "@/infrastructure/http/dtos/match-prediction-dto";
import type { PredictionStatsDTO } from "@/infrastructure/http/dtos/prediction-stats-dto";
import type { PredictionRankingDTO } from "@/infrastructure/http/dtos/prediction-ranking-dto";
import type {
  MatchWithPredictionDTO,
  RawMatchDTO,
  UserMatchPredictionDTO,
} from "@/infrastructure/http/dtos/match-with-prediction-dto";
import type { GroupStandingDTO } from "@/infrastructure/http/dtos/group-standing-dto";
import type { BestThirdPlaceDTO } from "@/infrastructure/http/dtos/best-third-place-dto";
import type { RoundOf32MatchDTO } from "@/infrastructure/http/dtos/round-of-32-match-dto";
import type { KnockoutMatchDTO } from "@/infrastructure/http/dtos/knockout-match-dto";
import type { KnockoutMatchWithPredictionDTO } from "@/infrastructure/http/dtos/knockout-match-with-prediction-dto";
import type { SaveKnockoutPredictionsRequestDTO } from "@/infrastructure/http/dtos/knockout-predictions-request-dto";
import type { SaveKnockoutPredictionsResponseDTO } from "@/infrastructure/http/dtos/knockout-predictions-response-dto";
import { TeamMapper } from "@/infrastructure/mappers/team-mapper";
import { StadiumMapper } from "@/infrastructure/mappers/stadium-mapper";
import { GroupMapper } from "@/infrastructure/mappers/group-mapper";

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
      homeTeamId: dto.homeTeamId,
      awayTeamId: dto.awayTeamId,
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
      homeTeamId: domain.homeTeamId,
      awayTeamId: domain.awayTeamId,
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

  /**
   * Transform RawMatchDTO to Domain Entity
   */
  static rawMatchToDomain(dto: RawMatchDTO): RawMatch {
    return {
      id: dto.id,
      matchNumber: dto.matchNumber,
      homeTeam: TeamMapper.toDomain(dto.homeTeam),
      awayTeam: TeamMapper.toDomain(dto.awayTeam),
      homeTeamPlaceholder: dto.homeTeamPlaceholder,
      awayTeamPlaceholder: dto.awayTeamPlaceholder,
      stadium: StadiumMapper.toDomain(dto.stadium),
      group: GroupMapper.toDomain(dto.group),
      phase: dto.phase,
      matchDate: new Date(dto.matchDate),
      matchTime: dto.matchTime,
      homeScore: dto.homeScore,
      awayScore: dto.awayScore,
      homeScoreEt: dto.homeScoreEt,
      awayScoreEt: dto.awayScoreEt,
      homePenalties: dto.homePenalties,
      awayPenalties: dto.awayPenalties,
      status: dto.status,
      predictionsLockedAt: new Date(dto.predictionsLockedAt),
      dependsOnMatchIds: dto.dependsOnMatchIds,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    };
  }

  /**
   * Transform UserMatchPredictionDTO to Domain Entity
   */
  static userMatchPredictionToDomain(
    dto: UserMatchPredictionDTO
  ): UserMatchPrediction {
    return {
      id: dto.id,
      predictionId: dto.predictionId,
      matchId: dto.matchId,
      homeScore: dto.homeScore,
      awayScore: dto.awayScore,
      homeScoreET: dto.homeScoreET,
      awayScoreET: dto.awayScoreET,
      penaltiesWinner: dto.penaltiesWinner,
      pointsEarned: dto.pointsEarned,
      pointsBreakdown: dto.pointsBreakdown,
      createdAt: dto.createdAt ? new Date(dto.createdAt) : null,
      updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : null,
    };
  }

  /**
   * Transform MatchWithPredictionDTO to Domain Entity
   */
  static matchWithPredictionToDomain(
    dto: MatchWithPredictionDTO
  ): MatchWithPrediction {
    return {
      match: this.rawMatchToDomain(dto.match),
      userPrediction: this.userMatchPredictionToDomain(dto.userPrediction),
    };
  }

  /**
   * Transform array of MatchWithPredictionDTO to Domain
   */
  static matchesWithPredictionsToDomain(
    dtos: MatchWithPredictionDTO[]
  ): MatchWithPrediction[] {
    return dtos.map((dto) => this.matchWithPredictionToDomain(dto));
  }

  /**
   * Transform GroupStandingDTO to Domain Entity
   */
  static groupStandingToDomain(dto: GroupStandingDTO): GroupStanding {
    return {
      teamId: dto.teamId,
      position: dto.position,
      points: dto.points,
      played: dto.played,
      wins: dto.wins,
      draws: dto.draws,
      losses: dto.losses,
      goalsFor: dto.goalsFor,
      goalsAgainst: dto.goalsAgainst,
      goalDifference: dto.goalDifference,
    };
  }

  /**
   * Transform Domain GroupStanding to DTO
   */
  static groupStandingToDTO(domain: GroupStanding): GroupStandingDTO {
    return {
      teamId: domain.teamId,
      position: domain.position,
      points: domain.points,
      played: domain.played,
      wins: domain.wins,
      draws: domain.draws,
      losses: domain.losses,
      goalsFor: domain.goalsFor,
      goalsAgainst: domain.goalsAgainst,
      goalDifference: domain.goalDifference,
    };
  }

  /**
   * Transform array of GroupStanding DTOs to Domain
   */
  static groupStandingsToDomain(dtos: GroupStandingDTO[]): GroupStanding[] {
    return dtos.map((dto) => this.groupStandingToDomain(dto));
  }

  /**
   * Transform array of Domain GroupStandings to DTOs
   */
  static groupStandingsToDTOs(domain: GroupStanding[]): GroupStandingDTO[] {
    return domain.map((standing) => this.groupStandingToDTO(standing));
  }

  /**
   * Transform BestThirdPlaceDTO to Domain Entity
   */
  static bestThirdPlaceToDomain(dto: BestThirdPlaceDTO): BestThirdPlace {
    return {
      id: dto.id,
      predictionId: dto.predictionId,
      teamId: dto.teamId,
      rankingPosition: dto.rankingPosition,
      points: dto.points,
      goalDifference: dto.goalDifference,
      goalsFor: dto.goalsFor,
      fromGroupId: dto.fromGroupId,
      hasTiebreakConflict: dto.hasTiebreakConflict,
      tiebreakGroup: dto.tiebreakGroup,
      manualTiebreakOrder: dto.manualTiebreakOrder,
      pointsEarned: dto.pointsEarned,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    };
  }

  /**
   * Transform Domain BestThirdPlace to DTO
   */
  static bestThirdPlaceToDTO(domain: BestThirdPlace): BestThirdPlaceDTO {
    return {
      id: domain.id,
      predictionId: domain.predictionId,
      teamId: domain.teamId,
      rankingPosition: domain.rankingPosition,
      points: domain.points,
      goalDifference: domain.goalDifference,
      goalsFor: domain.goalsFor,
      fromGroupId: domain.fromGroupId,
      hasTiebreakConflict: domain.hasTiebreakConflict,
      tiebreakGroup: domain.tiebreakGroup,
      manualTiebreakOrder: domain.manualTiebreakOrder,
      pointsEarned: domain.pointsEarned,
      createdAt: domain.createdAt.toISOString(),
      updatedAt: domain.updatedAt.toISOString(),
    };
  }

  /**
   * Transform array of BestThirdPlace DTOs to Domain
   */
  static bestThirdPlacesToDomain(dtos: BestThirdPlaceDTO[]): BestThirdPlace[] {
    return dtos.map((dto) => this.bestThirdPlaceToDomain(dto));
  }

  /**
   * Transform array of Domain BestThirdPlaces to DTOs
   */
  static bestThirdPlacesToDTOs(domain: BestThirdPlace[]): BestThirdPlaceDTO[] {
    return domain.map((place) => this.bestThirdPlaceToDTO(place));
  }

  /**
   * Transform RoundOf32MatchDTO to Domain Entity
   */
  static roundOf32MatchToDomain(dto: RoundOf32MatchDTO): RoundOf32Match {
    return {
      id: dto.id,
      matchNumber: dto.matchNumber,
      homeTeam: TeamMapper.toDomain(dto.homeTeam),
      awayTeam: TeamMapper.toDomain(dto.awayTeam),
      stadium: StadiumMapper.toDomain(dto.stadium),
      matchDate: new Date(dto.matchDate),
      matchTime: dto.matchTime,
      phase: dto.phase,
      predictionsLockedAt: new Date(dto.predictionsLockedAt),
    };
  }

  /**
   * Transform Domain RoundOf32Match to DTO
   */
  static roundOf32MatchToDTO(domain: RoundOf32Match): RoundOf32MatchDTO {
    return {
      id: domain.id,
      matchNumber: domain.matchNumber,
      homeTeam: TeamMapper.toDTO(domain.homeTeam),
      awayTeam: TeamMapper.toDTO(domain.awayTeam),
      stadium: StadiumMapper.toDTO(domain.stadium),
      matchDate: domain.matchDate.toISOString(),
      matchTime: domain.matchTime,
      phase: domain.phase,
      predictionsLockedAt: domain.predictionsLockedAt.toISOString(),
    };
  }

  /**
   * Transform array of RoundOf32Match DTOs to Domain
   */
  static roundOf32MatchesToDomain(
    dtos: RoundOf32MatchDTO[]
  ): RoundOf32Match[] {
    return dtos.map((dto) => this.roundOf32MatchToDomain(dto));
  }

  /**
   * Transform array of Domain RoundOf32Matches to DTOs
   */
  static roundOf32MatchesToDTOs(
    domain: RoundOf32Match[]
  ): RoundOf32MatchDTO[] {
    return domain.map((match) => this.roundOf32MatchToDTO(match));
  }

  /**
   * Prepare SaveKnockoutPredictions request from Domain to DTO
   * @param phase - Knockout phase (ROUND_OF_32, etc)
   * @param predictions - Array of match predictions
   * @returns SaveKnockoutPredictionsRequestDTO ready for API
   */
  static saveKnockoutRequestToDTO(
    phase: MatchPhase,
    predictions: MatchPrediction[]
  ): SaveKnockoutPredictionsRequestDTO {
    return {
      phase: phase,
      predictions: this.matchPredictionsToDTOs(predictions),
    };
  }

  /**
   * Transform SaveKnockoutPredictionsResponseDTO to Domain Entity
   * @param dto - Response DTO from API
   * @returns SaveKnockoutPredictionsResponse domain entity
   */
  static knockoutResponseToDomain(
    dto: SaveKnockoutPredictionsResponseDTO
  ): SaveKnockoutPredictionsResponse {
    return {
      success: dto.success,
      message: dto.message,
      phase: dto.phase as MatchPhase,
      matchesSaved: dto.matchesSaved,
      knockoutsCompleted: dto.knockoutsCompleted,
    };
  }

  /**
   * Transform KnockoutMatchDTO to Domain Entity
   * @param dto - Knockout match DTO from API
   * @returns KnockoutMatch domain entity
   */
  static knockoutMatchToDomain(dto: KnockoutMatchDTO): KnockoutMatch {
    return {
      id: dto.id,
      matchNumber: dto.matchNumber,
      homeTeam: dto.homeTeam ? TeamMapper.toDomain(dto.homeTeam) : null,
      awayTeam: dto.awayTeam ? TeamMapper.toDomain(dto.awayTeam) : null,
      homeTeamPlaceholder: dto.homeTeamPlaceholder,
      awayTeamPlaceholder: dto.awayTeamPlaceholder,
      stadium: StadiumMapper.toDomain(dto.stadium),
      matchDate: new Date(dto.matchDate),
      matchTime: dto.matchTime,
      phase: dto.phase,
      predictionsLockedAt: new Date(dto.predictionsLockedAt),
    };
  }

  /**
   * Transform KnockoutMatchWithPredictionDTO to Domain Entity
   * @param dto - Knockout match with prediction DTO from API
   * @returns KnockoutMatchWithPrediction domain entity
   */
  static knockoutMatchWithPredictionToDomain(
    dto: KnockoutMatchWithPredictionDTO
  ): KnockoutMatchWithPrediction {
    return {
      match: this.knockoutMatchToDomain(dto.match),
      userPrediction: this.userMatchPredictionToDomain(dto.userPrediction),
    };
  }

  /**
   * Transform array of KnockoutMatchWithPrediction DTOs to Domain
   * @param dtos - Array of knockout match with prediction DTOs
   * @returns Array of KnockoutMatchWithPrediction domain entities
   */
  static knockoutMatchesWithPredictionsToDomain(
    dtos: KnockoutMatchWithPredictionDTO[]
  ): KnockoutMatchWithPrediction[] {
    return dtos.map((dto) => this.knockoutMatchWithPredictionToDomain(dto));
  }
}
