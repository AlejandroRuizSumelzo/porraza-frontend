import { GetMatchCalendarUseCase } from "@/domain/use-cases/matches/get-match-calendar-use-case";
import type { MatchRepository } from "@/domain/repositories/match-repository";

/**
 * Factory functions to create Match Use Cases
 * Used in Server Components for direct instantiation
 */

export function createGetMatchCalendarUseCase(
  matchRepository: MatchRepository
) {
  return new GetMatchCalendarUseCase(matchRepository);
}
