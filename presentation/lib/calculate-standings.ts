import type { MatchWithPrediction } from "@/domain/entities/match-with-prediction";
import type { Team } from "@/domain/entities/team";

/**
 * Team Standing
 * Represents a team's standing in a group with all statistics
 */
export interface TeamStanding {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  position: number;

  // Tiebreaker info
  isTied: boolean; // True if tied with another team in ALL criteria
  tiedWith: string[]; // Team IDs that are tied with this team
}

/**
 * Calculate Group Standings
 *
 * Calculates the standings table for a group based on match predictions.
 * Includes detection of absolute ties (same points, goal difference, and goals for).
 *
 * @param matches - Array of matches with predictions for the group
 * @param predictions - User predictions (matchId -> {homeScore, awayScore})
 * @param manualTiebreaker - Manual order for tied teams (teamId -> order number)
 * @returns Array of TeamStanding sorted by FIFA rules + manual tiebreaker
 */
export function calculateGroupStandings(
  matches: MatchWithPrediction[],
  predictions: Record<string, { homeScore: string; awayScore: string }>,
  manualTiebreaker?: Record<string, number>
): TeamStanding[] {
  // Step 1: Initialize standings for each unique team
  const standingsMap = new Map<string, TeamStanding>();

  matches.forEach((matchWithPrediction) => {
    const { match } = matchWithPrediction;

    // Initialize home team if not exists
    if (!standingsMap.has(match.homeTeam.id)) {
      standingsMap.set(match.homeTeam.id, {
        team: match.homeTeam,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
        position: 0,
        isTied: false,
        tiedWith: [],
      });
    }

    // Initialize away team if not exists
    if (!standingsMap.has(match.awayTeam.id)) {
      standingsMap.set(match.awayTeam.id, {
        team: match.awayTeam,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
        position: 0,
        isTied: false,
        tiedWith: [],
      });
    }
  });

  // Step 2: Process each match and update standings
  matches.forEach((matchWithPrediction) => {
    const { match } = matchWithPrediction;
    const prediction = predictions[match.id];

    // Skip if no prediction (shouldn't happen with default 0-0)
    if (!prediction) return;

    const homeScore = parseInt(prediction.homeScore, 10) || 0;
    const awayScore = parseInt(prediction.awayScore, 10) || 0;

    const homeStanding = standingsMap.get(match.homeTeam.id)!;
    const awayStanding = standingsMap.get(match.awayTeam.id)!;

    // Update played
    homeStanding.played++;
    awayStanding.played++;

    // Update goals
    homeStanding.goalsFor += homeScore;
    homeStanding.goalsAgainst += awayScore;
    awayStanding.goalsFor += awayScore;
    awayStanding.goalsAgainst += homeScore;

    // Determine result and update points/W-D-L
    if (homeScore > awayScore) {
      // Home win
      homeStanding.won++;
      homeStanding.points += 3;
      awayStanding.lost++;
    } else if (homeScore < awayScore) {
      // Away win
      awayStanding.won++;
      awayStanding.points += 3;
      homeStanding.lost++;
    } else {
      // Draw
      homeStanding.drawn++;
      homeStanding.points++;
      awayStanding.drawn++;
      awayStanding.points++;
    }
  });

  // Step 3: Calculate goal difference for all teams
  standingsMap.forEach((standing) => {
    standing.goalDifference = standing.goalsFor - standing.goalsAgainst;
  });

  // Step 4: Convert to array
  let standings = Array.from(standingsMap.values());

  // Step 5: Detect absolute ties (same points, GD, and GF)
  standings = detectAbsoluteTies(standings);

  // Step 6: Sort by FIFA rules + manual tiebreaker
  standings = sortStandings(standings, manualTiebreaker);

  // Step 7: Assign positions
  standings.forEach((standing, index) => {
    standing.position = index + 1;
  });

  return standings;
}

/**
 * Detect Absolute Ties
 *
 * Marks teams that are tied in ALL criteria (points, goal difference, goals for)
 */
function detectAbsoluteTies(standings: TeamStanding[]): TeamStanding[] {
  // Group teams by their stats signature
  const groups = new Map<string, TeamStanding[]>();

  standings.forEach((standing) => {
    const key = `${standing.points}-${standing.goalDifference}-${standing.goalsFor}`;
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(standing);
  });

  // Mark teams that are in groups with more than 1 team (tied)
  return standings.map((standing) => {
    const key = `${standing.points}-${standing.goalDifference}-${standing.goalsFor}`;
    const tiedTeams = groups.get(key)!;

    if (tiedTeams.length > 1) {
      return {
        ...standing,
        isTied: true,
        tiedWith: tiedTeams
          .map((t) => t.team.id)
          .filter((id) => id !== standing.team.id),
      };
    }

    return { ...standing, isTied: false, tiedWith: [] };
  });
}

/**
 * Sort Standings
 *
 * Sorts teams by FIFA World Cup group stage rules:
 * 1. Points (descending)
 * 2. Goal difference (descending)
 * 3. Goals for (descending)
 * 4. Manual tiebreaker (if provided)
 * 5. Alphabetical (fallback)
 */
function sortStandings(
  standings: TeamStanding[],
  manualTiebreaker?: Record<string, number>
): TeamStanding[] {
  return standings.sort((a, b) => {
    // Criterion 1: Points (descending)
    if (a.points !== b.points) {
      return b.points - a.points;
    }

    // Criterion 2: Goal difference (descending)
    if (a.goalDifference !== b.goalDifference) {
      return b.goalDifference - a.goalDifference;
    }

    // Criterion 3: Goals for (descending)
    if (a.goalsFor !== b.goalsFor) {
      return b.goalsFor - a.goalsFor;
    }

    // Criterion 4: Manual tiebreaker (if applicable and provided)
    if (
      a.isTied &&
      b.isTied &&
      a.tiedWith.includes(b.team.id) &&
      manualTiebreaker
    ) {
      const orderA = manualTiebreaker[a.team.id] ?? 999;
      const orderB = manualTiebreaker[b.team.id] ?? 999;
      if (orderA !== orderB) {
        return orderA - orderB;
      }
    }

    // Criterion 5: Alphabetical (fallback)
    return a.team.name.localeCompare(b.team.name);
  });
}

/**
 * Get Tied Teams
 *
 * Returns groups of teams that are tied in all criteria
 * Useful for rendering tiebreaker UI
 */
export function getTiedTeamGroups(standings: TeamStanding[]): TeamStanding[][] {
  const groups: TeamStanding[][] = [];
  const processed = new Set<string>();

  standings.forEach((standing) => {
    if (standing.isTied && !processed.has(standing.team.id)) {
      // Find all teams tied with this one
      const tiedGroup = standings.filter(
        (s) =>
          s.team.id === standing.team.id ||
          standing.tiedWith.includes(s.team.id)
      );

      // Mark all as processed
      tiedGroup.forEach((t) => processed.add(t.team.id));

      groups.push(tiedGroup);
    }
  });

  return groups;
}
