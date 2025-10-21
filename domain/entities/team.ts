/**
 * Team Entity
 * Represents a national football team in the domain
 */
export interface Team {
  id: string;
  name: string;
  fifaCode: string;
  confederation: string;
  isHost: boolean;
  placeholder: string | null;
}
