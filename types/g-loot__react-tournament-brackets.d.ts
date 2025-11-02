/**
 * Type definitions for @g-loot/react-tournament-brackets
 * Project: https://github.com/g-loot/react-tournament-brackets
 */

declare module "@g-loot/react-tournament-brackets" {
  import { ComponentType, ReactNode } from "react";

  // ============================================
  // Theme Configuration
  // ============================================
  export interface Theme {
    textColor: {
      main: string;
      highlighted: string;
      dark: string;
    };
    matchBackground: {
      wonColor: string;
      lostColor: string;
    };
    score: {
      background: {
        wonColor: string;
        lostColor: string;
      };
      text: {
        highlightedWonColor: string;
        highlightedLostColor: string;
      };
    };
    border: {
      color: string;
      highlightedColor: string;
    };
    roundHeader: {
      backgroundColor: string;
      fontColor: string;
    };
    connectorColor: string;
    connectorColorHighlight: string;
    svgBackground: string;
  }

  export function createTheme(theme: Partial<Theme>): Theme;

  // ============================================
  // Match State Types
  // ============================================
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

  // ============================================
  // Participant Interface
  // ============================================
  export interface Participant {
    id: string | number;
    resultText?: string | null;
    isWinner: boolean;
    status: ParticipantStatus;
    name: string;
    // Custom fields
    [key: string]: any;
  }

  // ============================================
  // Match Interface
  // ============================================
  export interface Match {
    id: string | number;
    name?: string;
    nextMatchId: string | number | null;
    tournamentRoundText: string;
    startTime: string;
    state: MatchState;
    participants: Participant[];
  }

  // ============================================
  // Bracket Options
  // ============================================
  export interface BracketOptions {
    style?: {
      roundHeader?: {
        backgroundColor?: string;
        fontColor?: string;
        fontFamily?: string;
        fontSize?: number;
        fontWeight?: number | string;
      };
      connectorColor?: string;
      connectorColorHighlight?: string;
      [key: string]: any;
    };
    [key: string]: any;
  }

  // ============================================
  // SVG Wrapper Props
  // ============================================
  export interface SVGWrapperProps {
    children: ReactNode;
    width: number;
    height: number;
    [key: string]: any;
  }

  // ============================================
  // Single Elimination Bracket Props
  // ============================================
  export interface SingleEliminationBracketProps {
    matches: Match[];
    matchComponent?: ComponentType<MatchComponentProps>;
    theme?: Theme;
    options?: BracketOptions;
    onMatchClick?: (args: { match: Match }) => void;
    onPartyClick?: (party: Participant, partyWon: boolean) => void;
    svgWrapper?: ComponentType<SVGWrapperProps>;
  }

  export const SingleEliminationBracket: ComponentType<SingleEliminationBracketProps>;

  // ============================================
  // SVG Viewer Component
  // ============================================
  export interface SVGViewerProps {
    width: number;
    height: number;
    background?: string;
    SVGBackground?: string;
    children: ReactNode;
  }

  export const SVGViewer: ComponentType<SVGViewerProps>;
}

// ============================================
// Types Module
// ============================================
declare module "@g-loot/react-tournament-brackets/dist/types" {
  import {
    Match,
    Participant,
    MatchState,
    ParticipantStatus,
  } from "@g-loot/react-tournament-brackets";

  /**
   * Match Component Props
   * Props passed to custom match components
   */
  export interface MatchComponentProps {
    match: Match;
    onMatchClick?: (args: { match: Match }) => void;
    onPartyClick?: (party: Participant, partyWon: boolean) => void;
    onMouseEnter?: (partyId: string | number) => void;
    onMouseLeave?: () => void;
    topParty: Participant & { fifaCode?: string };
    bottomParty: Participant & { fifaCode?: string };
    topWon: boolean;
    bottomWon: boolean;
    topHovered: boolean;
    bottomHovered: boolean;
    topText: string;
    bottomText: string;
    connectorColor?: string;
    computedStyles: any;
    teamNameFallback: string;
    resultFallback: (participant: Participant) => string;
  }

  export { Match, Participant, MatchState, ParticipantStatus };
}
