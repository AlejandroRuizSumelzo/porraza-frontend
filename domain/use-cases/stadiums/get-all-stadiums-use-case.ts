import type { Stadium } from "@/domain/entities/stadium";
import type { StadiumRepository } from "@/domain/repositories/stadium-repository";

/**
 * Get All Stadiums Use Case
 * Business logic for retrieving all stadiums
 */
export class GetAllStadiumsUseCase {
  constructor(private readonly repository: StadiumRepository) {}

  /**
   * Execute the use case
   * @returns Promise with array of all stadiums
   */
  async execute(): Promise<Stadium[]> {
    const stadiums = await this.repository.findAll();

    return stadiums;
  }
}
