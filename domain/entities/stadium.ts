/**
 * Stadium Entity
 * Represents a football stadium in the domain
 */
export interface Stadium {
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
  timezone: string;
  capacity: number | null;
  createdAt: Date;
  updatedAt: Date;
}
