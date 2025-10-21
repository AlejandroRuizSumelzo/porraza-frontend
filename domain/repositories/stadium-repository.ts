import type { Stadium } from "@/domain/entities/stadium";

/**
 * Stadium Repository Interface
 * Defines the contract for stadium data access
 */
export interface StadiumRepository {
  /**
   * Get all stadiums
   * @returns Promise with array of all stadiums
   */
  findAll(): Promise<Stadium[]>;

  /**
   * Get a single stadium by ID
   * @param id - Stadium ID
   * @returns Promise with stadium or null if not found
   */
  findById(id: string): Promise<Stadium | null>;

  /**
   * Get stadiums by country
   * @param country - Country name
   * @returns Promise with array of stadiums in that country
   */
  findByCountry(country: string): Promise<Stadium[]>;
}
