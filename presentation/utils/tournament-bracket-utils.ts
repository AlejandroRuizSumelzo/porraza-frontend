import type { RoundOf32Match } from "@/domain/entities/round-of-32-match";

/**
 * Types for @g-loot/react-tournament-brackets library
 */
export interface TournamentMatch {
  id: string | number;
  name: string;
  nextMatchId: string | number | null;
  tournamentRoundText: string;
  startTime: string;
  state: MatchState;
  participants: Participant[];
}

export type MatchState =
  | "NO_SHOW"
  | "WALK_OVER"
  | "NO_PARTY"
  | "DONE"
  | "SCORE_DONE"
  | "SCHEDULED";

export type ParticipantStatus =
  | "PLAYED"
  | "NO_SHOW"
  | "WALK_OVER"
  | "NO_PARTY"
  | null;

export interface Participant {
  id: string;
  resultText?: string | null;
  isWinner: boolean;
  status: ParticipantStatus;
  name: string;
  // Custom fields for our use
  fifaCode?: string;
  confederation?: string;
}

/**
 * Converts RoundOf32Match array to @g-loot/react-tournament-brackets format
 * Creates a complete single elimination bracket structure:
 * - Round of 32 (16 matches) -> ids: 1-16
 * - Round of 16 (8 matches) -> ids: 17-24
 * - Quarter Finals (4 matches) -> ids: 25-28
 * - Semi Finals (2 matches) -> ids: 29-30
 * - Final (1 match) -> id: 31
 */
export function convertToTournamentBracket(
  roundOf32Matches: RoundOf32Match[]
): TournamentMatch[] {
  const matches: TournamentMatch[] = [];

  // Round of 32 (16 matches) - IDs 1-16
  roundOf32Matches.forEach((match, index) => {
    const matchId = index + 1;
    const nextMatchId = Math.ceil(matchId / 2) + 16; // Maps to Round of 16

    matches.push({
      id: matchId,
      name: "", // Empty to avoid showing "Match 73"
      nextMatchId,
      tournamentRoundText: "16avos de Final",
      startTime: "", // Empty to avoid showing ISO date
      state: "SCHEDULED",
      participants: [
        {
          id: match.homeTeam.id,
          name: match.homeTeam.name,
          isWinner: false,
          status: null,
          resultText: null,
          fifaCode: match.homeTeam.fifaCode,
          confederation: match.homeTeam.confederation,
        },
        {
          id: match.awayTeam.id,
          name: match.awayTeam.name,
          isWinner: false,
          status: null,
          resultText: null,
          fifaCode: match.awayTeam.fifaCode,
          confederation: match.awayTeam.confederation,
        },
      ],
    });
  });

  // Round of 16 (8 matches) - IDs 17-24
  for (let i = 0; i < 8; i++) {
    const matchId = 17 + i;
    const nextMatchId = i < 4 ? 25 + Math.floor(i / 2) : 25 + Math.floor((i - 4) / 2);

    matches.push({
      id: matchId,
      name: "",
      nextMatchId: matchId <= 24 ? nextMatchId : null,
      tournamentRoundText: "Octavos de Final",
      startTime: "",
      state: "SCHEDULED",
      participants: [
        {
          id: `tbd-${matchId}-1`,
          name: "TBD",
          isWinner: false,
          status: null,
          resultText: null,
          fifaCode: "TBD",
        },
        {
          id: `tbd-${matchId}-2`,
          name: "TBD",
          isWinner: false,
          status: null,
          resultText: null,
          fifaCode: "TBD",
        },
      ],
    });
  }

  // Quarter Finals (4 matches) - IDs 25-28
  for (let i = 0; i < 4; i++) {
    const matchId = 25 + i;
    const nextMatchId = 29 + Math.floor(i / 2); // Maps to Semi Finals

    matches.push({
      id: matchId,
      name: "",
      nextMatchId,
      tournamentRoundText: "Cuartos de Final",
      startTime: "",
      state: "SCHEDULED",
      participants: [
        {
          id: `tbd-${matchId}-1`,
          name: "TBD",
          isWinner: false,
          status: null,
          resultText: null,
          fifaCode: "TBD",
        },
        {
          id: `tbd-${matchId}-2`,
          name: "TBD",
          isWinner: false,
          status: null,
          resultText: null,
          fifaCode: "TBD",
        },
      ],
    });
  }

  // Semi Finals (2 matches) - IDs 29-30
  for (let i = 0; i < 2; i++) {
    const matchId = 29 + i;

    matches.push({
      id: matchId,
      name: "",
      nextMatchId: 31, // Both semis go to final
      tournamentRoundText: "Semifinales",
      startTime: "",
      state: "SCHEDULED",
      participants: [
        {
          id: `tbd-${matchId}-1`,
          name: "TBD",
          isWinner: false,
          status: null,
          resultText: null,
          fifaCode: "TBD",
        },
        {
          id: `tbd-${matchId}-2`,
          name: "TBD",
          isWinner: false,
          status: null,
          resultText: null,
          fifaCode: "TBD",
        },
      ],
    });
  }

  // Final (1 match) - ID 31
  matches.push({
    id: 31,
    name: "",
    nextMatchId: null,
    tournamentRoundText: "Final",
    startTime: "",
    state: "SCHEDULED",
    participants: [
      {
        id: "tbd-31-1",
        name: "TBD",
        isWinner: false,
        status: null,
        resultText: null,
        fifaCode: "TBD",
      },
      {
        id: "tbd-31-2",
        name: "TBD",
        isWinner: false,
        status: null,
        resultText: null,
        fifaCode: "TBD",
      },
    ],
  });

  return matches;
}

/**
 * Checks if a participant is TBD (To Be Determined)
 */
export function isTBDParticipant(fifaCode?: string): boolean {
  return !fifaCode || fifaCode === "TBD";
}
