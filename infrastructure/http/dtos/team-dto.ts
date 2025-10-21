/**
 * Team DTO (Data Transfer Object)
 * Represents the raw team data structure from the API
 * Matches the backend response format exactly
 */
export interface TeamDTO {
  id: string;
  name: string;
  fifaCode: string;
  confederation: string;
  isHost: boolean;
  placeholder: string | null;
}
