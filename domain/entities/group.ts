/**
 * Group Entity
 * Represents a World Cup group (A, B, C, etc.)
 */
export interface Group {
  /**
   * Unique identifier of the group (UUID)
   */
  id: string;

  /**
   * Group name/letter (e.g., "A", "B", "C")
   */
  name: string;
}
