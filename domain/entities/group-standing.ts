/**
 * Group Standing Entity
 * Represents a team's standing/position in a World Cup group
 */

export interface GroupStanding {
  /**
   * Team UUID
   */
  teamId: string;

  /**
   * Position in the group (1-4)
   */
  position: number;

  /**
   * Total points earned
   */
  points: number;

  /**
   * Matches played
   */
  played: number;

  /**
   * Matches won
   */
  wins: number;

  /**
   * Matches drawn
   */
  draws: number;

  /**
   * Matches lost
   */
  losses: number;

  /**
   * Goals scored (for)
   */
  goalsFor: number;

  /**
   * Goals conceded (against)
   */
  goalsAgainst: number;

  /**
   * Goal difference (goalsFor - goalsAgainst)
   */
  goalDifference: number;
}
