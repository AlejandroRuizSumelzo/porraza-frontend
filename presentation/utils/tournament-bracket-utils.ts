import type { RoundOf32Match } from "@/domain/entities/round-of-32-match";
import type { Knockouts, KnockoutMatchDetail } from "@/domain/entities/knockouts";

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
 * Helper to create TBD participant
 */
function createTBDParticipant(id: string): Participant {
  return {
    id,
    name: "TBD",
    isWinner: false,
    status: null,
    resultText: null,
    fifaCode: "TBD",
  };
}

/**
 * Helper to create participant from team
 */
function createParticipantFromTeam(team: { id: string; name: string; fifaCode: string; confederation: string }): Participant {
  return {
    id: team.id,
    name: team.name,
    isWinner: false,
    status: null,
    resultText: null,
    fifaCode: team.fifaCode,
    confederation: team.confederation,
  };
}

/**
 * No-op function - Backend now sends knockouts in correct bracket order
 * This function is kept for backward compatibility but returns data unchanged
 */
function reorderKnockoutsForBracket(knockouts: Knockouts): Knockouts {
  // Backend now handles the reordering, so we just return the data as-is
  return knockouts;
}

/**
 * Converts Knockouts structure to @g-loot/react-tournament-brackets format
 * Creates a complete single elimination bracket structure:
 * - Round of 32 (16 matches) -> ids: 1-16
 * - Round of 16 (8 matches) -> ids: 17-24
 * - Quarter Finals (4 matches) -> ids: 25-28
 * - Semi Finals (2 matches) -> ids: 29-30
 * - Final (1 match) -> id: 31
 *
 * IMPORTANT: Expects knockouts data to be in correct bracket order (backend handles this)
 */
export function convertToTournamentBracket(
  roundOf32Matches: RoundOf32Match[]
): TournamentMatch[];
export function convertToTournamentBracket(
  knockouts: Knockouts
): TournamentMatch[];
export function convertToTournamentBracket(
  data: RoundOf32Match[] | Knockouts
): TournamentMatch[] {
  const matches: TournamentMatch[] = [];

  // Check if data is Knockouts object or legacy RoundOf32Match array
  const isKnockoutsObject = !Array.isArray(data);
  const knockouts = isKnockoutsObject ? data : null;

  const roundOf32Matches = isKnockoutsObject ? knockouts!.roundOf32 : data;

  // Round of 32 (16 matches) - IDs 1-16
  roundOf32Matches.forEach((match, index) => {
    const matchId = index + 1;
    const nextMatchId = Math.ceil(matchId / 2) + 16; // Maps to Round of 16

    const homeTeam = match.homeTeam || { id: `tbd-${matchId}-1`, name: "TBD", fifaCode: "TBD", confederation: "" };
    const awayTeam = match.awayTeam || { id: `tbd-${matchId}-2`, name: "TBD", fifaCode: "TBD", confederation: "" };

    matches.push({
      id: matchId,
      name: "",
      nextMatchId,
      tournamentRoundText: "16avos de Final",
      startTime: "",
      state: "SCHEDULED",
      participants: [
        homeTeam.fifaCode === "TBD"
          ? createTBDParticipant(homeTeam.id)
          : createParticipantFromTeam(homeTeam),
        awayTeam.fifaCode === "TBD"
          ? createTBDParticipant(awayTeam.id)
          : createParticipantFromTeam(awayTeam),
      ],
    });
  });

  // Round of 16 (8 matches) - IDs 17-24
  const roundOf16Matches = knockouts?.roundOf16 || [];
  for (let i = 0; i < 8; i++) {
    const matchId = 17 + i;
    const nextMatchId = 25 + Math.floor(i / 2); // Matches 0-1→QF25, 2-3→QF26, 4-5→QF27, 6-7→QF28
    const knockoutMatch = roundOf16Matches[i];

    matches.push({
      id: matchId,
      name: "",
      nextMatchId: matchId <= 24 ? nextMatchId : null,
      tournamentRoundText: "Octavos de Final",
      startTime: "",
      state: "SCHEDULED",
      participants: knockoutMatch && knockoutMatch.homeTeam && knockoutMatch.awayTeam
        ? [
            createParticipantFromTeam(knockoutMatch.homeTeam),
            createParticipantFromTeam(knockoutMatch.awayTeam),
          ]
        : [
            createTBDParticipant(`tbd-${matchId}-1`),
            createTBDParticipant(`tbd-${matchId}-2`),
          ],
    });
  }

  // Quarter Finals (4 matches) - IDs 25-28
  const quarterFinalsMatches = knockouts?.quarterFinals || [];
  for (let i = 0; i < 4; i++) {
    const matchId = 25 + i;
    // Sequential nextMatchId for proper bracket flow
    // i=0,1 → Semi 29 (top half), i=2,3 → Semi 30 (bottom half)
    const nextMatchId = 29 + Math.floor(i / 2);
    const knockoutMatch = quarterFinalsMatches[i];

    matches.push({
      id: matchId,
      name: "",
      nextMatchId,
      tournamentRoundText: "Cuartos de Final",
      startTime: "",
      state: "SCHEDULED",
      participants: knockoutMatch && knockoutMatch.homeTeam && knockoutMatch.awayTeam
        ? [
            createParticipantFromTeam(knockoutMatch.homeTeam),
            createParticipantFromTeam(knockoutMatch.awayTeam),
          ]
        : [
            createTBDParticipant(`tbd-${matchId}-1`),
            createTBDParticipant(`tbd-${matchId}-2`),
          ],
    });
  }

  // Semi Finals (2 matches) - IDs 29-30
  const semiFinalsMatches = knockouts?.semiFinals || [];
  for (let i = 0; i < 2; i++) {
    const matchId = 29 + i;
    const knockoutMatch = semiFinalsMatches[i];

    matches.push({
      id: matchId,
      name: "",
      nextMatchId: 31, // Both semis go to final
      tournamentRoundText: "Semifinales",
      startTime: "",
      state: "SCHEDULED",
      participants: knockoutMatch && knockoutMatch.homeTeam && knockoutMatch.awayTeam
        ? [
            createParticipantFromTeam(knockoutMatch.homeTeam),
            createParticipantFromTeam(knockoutMatch.awayTeam),
          ]
        : [
            createTBDParticipant(`tbd-${matchId}-1`),
            createTBDParticipant(`tbd-${matchId}-2`),
          ],
    });
  }

  // Final (1 match) - ID 31
  const finalMatch = knockouts?.final;
  matches.push({
    id: 31,
    name: "",
    nextMatchId: null,
    tournamentRoundText: "Final",
    startTime: "",
    state: "SCHEDULED",
    participants: finalMatch && finalMatch.homeTeam && finalMatch.awayTeam
      ? [
          createParticipantFromTeam(finalMatch.homeTeam),
          createParticipantFromTeam(finalMatch.awayTeam),
        ]
      : [
          createTBDParticipant("tbd-31-1"),
          createTBDParticipant("tbd-31-2"),
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

/**
 * Reorders knockouts structure for proper bracket visualization
 * Exported for use in components that need to access reordered data
 */
export function reorderKnockouts(knockouts: Knockouts): Knockouts {
  return reorderKnockoutsForBracket(knockouts);
}
