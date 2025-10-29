import { MatchPrediction } from "@/domain/entities/match-prediction";
import { GroupStanding } from "@/domain/entities/group-standing";
import {
  PredictionRepository,
  SaveGroupPredictionsResponse,
} from "@/domain/repositories/prediction-repository";

/**
 * SaveGroupPredictionsUseCase
 * Use case for saving match predictions for a group (6 matches) and group standings (4 teams)
 */
export class SaveGroupPredictionsUseCase {
  constructor(private readonly predictionRepository: PredictionRepository) {}

  /**
   * Execute the use case
   * @param leagueId - League UUID
   * @param groupId - Group UUID
   * @param matchPredictions - Array of 6 match predictions
   * @param groupStandings - Array of 4 team standings
   * @returns Promise with updated prediction and optionally bestThirdPlaces (when all 12 groups completed)
   */
  async execute(
    leagueId: string,
    groupId: string,
    matchPredictions: MatchPrediction[],
    groupStandings: GroupStanding[]
  ): Promise<SaveGroupPredictionsResponse> {
    // Validations
    if (!leagueId || leagueId.trim() === "") {
      throw new Error("League ID is required");
    }

    if (!groupId || groupId.trim() === "") {
      throw new Error("Group ID is required");
    }

    if (!matchPredictions || matchPredictions.length !== 6) {
      throw new Error("Exactly 6 match predictions are required for a group");
    }

    if (!groupStandings || groupStandings.length !== 4) {
      throw new Error("Exactly 4 team standings are required for a group");
    }

    // Validate each match prediction
    matchPredictions.forEach((prediction, index) => {
      if (!prediction.matchId || prediction.matchId.trim() === "") {
        throw new Error(
          `Match ID is required for prediction at index ${index}`
        );
      }

      if (
        prediction.homeScore < 0 ||
        prediction.awayScore < 0 ||
        !Number.isInteger(prediction.homeScore) ||
        !Number.isInteger(prediction.awayScore)
      ) {
        throw new Error(`Invalid scores for match at index ${index}`);
      }
    });

    // Validate each group standing
    groupStandings.forEach((standing, index) => {
      if (!standing.teamId || standing.teamId.trim() === "") {
        throw new Error(`Team ID is required for standing at index ${index}`);
      }

      if (
        standing.position < 1 ||
        standing.position > 4 ||
        !Number.isInteger(standing.position)
      ) {
        throw new Error(
          `Position must be between 1 and 4 for standing at index ${index}`
        );
      }

      if (standing.points < 0 || !Number.isInteger(standing.points)) {
        throw new Error(`Invalid points for standing at index ${index}`);
      }

      if (standing.played !== 3) {
        throw new Error(
          `Played matches must be 3 for group stage at index ${index}`
        );
      }

      if (
        standing.wins < 0 ||
        standing.draws < 0 ||
        standing.losses < 0 ||
        !Number.isInteger(standing.wins) ||
        !Number.isInteger(standing.draws) ||
        !Number.isInteger(standing.losses)
      ) {
        throw new Error(
          `Invalid wins/draws/losses for standing at index ${index}`
        );
      }

      if (standing.wins + standing.draws + standing.losses !== 3) {
        throw new Error(
          `Wins + draws + losses must equal 3 for standing at index ${index}`
        );
      }

      if (
        standing.goalsFor < 0 ||
        standing.goalsAgainst < 0 ||
        !Number.isInteger(standing.goalsFor) ||
        !Number.isInteger(standing.goalsAgainst)
      ) {
        throw new Error(`Invalid goals for standing at index ${index}`);
      }

      if (standing.goalDifference !== standing.goalsFor - standing.goalsAgainst) {
        throw new Error(
          `Goal difference mismatch for standing at index ${index}`
        );
      }
    });

    // Validate that positions are unique and consecutive (1, 2, 3, 4)
    const positions = groupStandings.map((s) => s.position).sort((a, b) => a - b);
    if (positions.join(",") !== "1,2,3,4") {
      throw new Error("Standings must have unique positions 1, 2, 3, 4");
    }

    return await this.predictionRepository.saveGroupPredictions(
      leagueId,
      groupId,
      matchPredictions,
      groupStandings
    );
  }
}
