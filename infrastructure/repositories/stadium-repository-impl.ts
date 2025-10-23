import type { Stadium } from "@/domain/entities/stadium";
import type { StadiumRepository } from "@/domain/repositories/stadium-repository";
import type { HttpClient } from "@/infrastructure/http/client";
import type { StadiumDTO } from "@/infrastructure/http/dtos/stadium-dto";
import { StadiumMapper } from "@/infrastructure/mappers/stadium-mapper";
import { HttpError } from "@/infrastructure/http/client";

/**
 * Stadium Repository Implementation
 * Implements the StadiumRepository interface from domain layer
 * Handles all HTTP communication with the stadiums API
 */
export class StadiumRepositoryImpl implements StadiumRepository {
  private readonly baseUrl = "/stadiums";

  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get all stadiums
   * @returns Promise with array of all stadiums
   */
  async findAll(): Promise<Stadium[]> {
    try {
      const response = await this.httpClient.get<StadiumDTO[]>(this.baseUrl);
      return StadiumMapper.toDomainList(response.data);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error("[StadiumRepository] Error fetching stadiums:", {
          status: error.status,
          message: error.message,
          response: error.response,
        });
        throw new Error(`Failed to fetch stadiums: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Get a single stadium by ID
   * @param id - Stadium ID
   * @returns Promise with stadium or null if not found
   */
  async findById(id: string): Promise<Stadium | null> {
    try {
      const response = await this.httpClient.get<StadiumDTO>(
        `${this.baseUrl}/${id}`
      );
      return StadiumMapper.toDomain(response.data);
    } catch (error) {
      if (error instanceof HttpError) {
        // Return null for 404 errors (stadium not found)
        if (error.status === 404) {
          return null;
        }

        console.error("[StadiumRepository] Error fetching stadium by id:", {
          id,
          status: error.status,
          message: error.message,
          response: error.response,
        });
        throw new Error(`Failed to fetch stadium ${id}: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Get stadiums by country
   * @param country - Country name
   * @returns Promise with array of stadiums in that country
   */
  async findByCountry(country: string): Promise<Stadium[]> {
    try {
      // Assuming the API supports query parameters for filtering
      const response = await this.httpClient.get<StadiumDTO[]>(
        `${this.baseUrl}?country=${encodeURIComponent(country)}`
      );
      return StadiumMapper.toDomainList(response.data);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error(
          "[StadiumRepository] Error fetching stadiums by country:",
          {
            country,
            status: error.status,
            message: error.message,
            response: error.response,
          }
        );
        throw new Error(
          `Failed to fetch stadiums for country ${country}: ${error.message}`
        );
      }
      throw error;
    }
  }
}
