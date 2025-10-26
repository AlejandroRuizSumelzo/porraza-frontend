/**
 * Group DTO (Data Transfer Object)
 * Represents the raw group data structure from the API
 */
export interface GroupDTO {
  /**
   * Unique identifier of the group (UUID)
   */
  id: string;

  /**
   * Group name/letter (e.g., "A", "B", "C")
   */
  name: string;
}
