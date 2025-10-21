/**
 * Stadium DTO (Data Transfer Object)
 * Represents the raw data structure from the API
 * Matches the backend response format exactly
 */
export interface StadiumDTO {
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
  timezone: string;
  capacity: number | null;
  createdAt: string; // ISO date string from backend
  updatedAt: string; // ISO date string from backend
}

/**
 * API Response wrapper for stadiums list
 */
export interface StadiumsListResponse {
  data: StadiumDTO[];
  total?: number;
  page?: number;
  limit?: number;
}

/**
 * API Response wrapper for single stadium
 */
export interface StadiumResponse {
  data: StadiumDTO;
}
