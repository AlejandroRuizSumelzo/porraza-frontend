import { GetAllStadiumsUseCase } from "@/domain/use-cases/stadiums/get-all-stadiums-use-case";
import type { StadiumRepository } from "@/domain/repositories/stadium-repository";

/**
 * Factory functions to create Stadium Use Cases
 * Used in Server Components for direct instantiation
 */

export function createGetAllStadiumsUseCase(
  stadiumRepository: StadiumRepository
) {
  return new GetAllStadiumsUseCase(stadiumRepository);
}
