import type { HttpClient } from "@/infrastructure/http/client";
import type { DependencyModule } from "@/di/client/providers/modules/base-module";
import type { AuthRepository } from "@/domain/repositories/auth-repository";
import type { UserRepository } from "@/domain/repositories/user-repository";
import type { PaymentRepository } from "@/domain/repositories/payment-repository";
import type { MatchRepository } from "@/domain/repositories/match-repository";
import type { StadiumRepository } from "@/domain/repositories/stadium-repository";
import type { TeamRepository } from "@/domain/repositories/team-repository";
import type { PlayerRepository } from "@/domain/repositories/player-repository";
import type { PredictionRepository } from "@/domain/repositories/prediction-repository";
import type { LeagueRepository } from "@/domain/repositories/league-repository";
import { AuthRepositoryImpl } from "@/infrastructure/repositories/auth-repository-impl";
import { UserRepositoryImpl } from "@/infrastructure/repositories/user-repository-impl";
import { PaymentRepositoryImpl } from "@/infrastructure/repositories/payment-repository-impl";
import { MatchRepositoryImpl } from "@/infrastructure/repositories/match-repository-impl";
import { StadiumRepositoryImpl } from "@/infrastructure/repositories/stadium-repository-impl";
import { TeamRepositoryImpl } from "@/infrastructure/repositories/team-repository-impl";
import { PlayerRepositoryImpl } from "@/infrastructure/repositories/player-repository-impl";
import { PredictionRepositoryImpl } from "@/infrastructure/repositories/prediction-repository-impl";
import { LeagueRepositoryImpl } from "@/infrastructure/repositories/league-repository-impl";

/**
 * Repository Module
 * Registers all repository implementations in the DI container
 *
 * IMPORTANT: Only add repositories here if they are used in CLIENT COMPONENTS
 * For Server Components, use factories from di/server/factories instead
 */

interface RepositoryModuleDeps {
  httpClient: HttpClient;
}

export class RepositoryModule implements DependencyModule {
  constructor(private deps: RepositoryModuleDeps) {}

  register() {
    // Register repositories needed by Client Components here
    const authRepository: AuthRepository = new AuthRepositoryImpl(
      this.deps.httpClient
    );

    const userRepository: UserRepository = new UserRepositoryImpl(
      this.deps.httpClient
    );

    const paymentRepository: PaymentRepository = new PaymentRepositoryImpl(
      this.deps.httpClient
    );

    const matchRepository: MatchRepository = new MatchRepositoryImpl(
      this.deps.httpClient
    );

    const stadiumRepository: StadiumRepository = new StadiumRepositoryImpl(
      this.deps.httpClient
    );

    const teamRepository: TeamRepository = new TeamRepositoryImpl(
      this.deps.httpClient
    );

    const playerRepository: PlayerRepository = new PlayerRepositoryImpl(
      this.deps.httpClient
    );

    const predictionRepository: PredictionRepository =
      new PredictionRepositoryImpl(this.deps.httpClient);

    const leagueRepository: LeagueRepository = new LeagueRepositoryImpl(
      this.deps.httpClient
    );

    return {
      authRepository,
      userRepository,
      paymentRepository,
      matchRepository,
      stadiumRepository,
      teamRepository,
      playerRepository,
      predictionRepository,
      leagueRepository,
    };
  }
}
