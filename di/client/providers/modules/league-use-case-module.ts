import type { DependencyModule } from "@/di/client/providers/modules/base-module";
import type { LeagueRepository } from "@/domain/repositories/league-repository";
import { CreateLeagueUseCase } from "@/domain/use-cases/leagues/create-league-use-case";
import { GetAllLeaguesUseCase } from "@/domain/use-cases/leagues/get-all-leagues-use-case";
import { GetPublicLeaguesUseCase } from "@/domain/use-cases/leagues/get-public-leagues-use-case";
import { GetMyLeaguesUseCase } from "@/domain/use-cases/leagues/get-my-leagues-use-case";
import { GetLeagueByIdUseCase } from "@/domain/use-cases/leagues/get-league-by-id-use-case";
import { UpdateLeagueUseCase } from "@/domain/use-cases/leagues/update-league-use-case";
import { DeleteLeagueUseCase } from "@/domain/use-cases/leagues/delete-league-use-case";
import { JoinLeagueUseCase } from "@/domain/use-cases/leagues/join-league-use-case";
import { LeaveLeagueUseCase } from "@/domain/use-cases/leagues/leave-league-use-case";
import { GetLeagueMembersUseCase } from "@/domain/use-cases/leagues/get-league-members-use-case";
import { RemoveMemberUseCase } from "@/domain/use-cases/leagues/remove-member-use-case";
import { TransferAdminUseCase } from "@/domain/use-cases/leagues/transfer-admin-use-case";

/**
 * League Use Case Module
 * Registers all league-related use cases in the DI container
 *
 * IMPORTANT: Only for CLIENT COMPONENTS
 * Server Components should use factories from di/server/factories
 */

interface LeagueUseCaseModuleDeps {
  leagueRepository: LeagueRepository;
}

export class LeagueUseCaseModule implements DependencyModule {
  constructor(private deps: LeagueUseCaseModuleDeps) {}

  register() {
    const createLeagueUseCase = new CreateLeagueUseCase(
      this.deps.leagueRepository
    );

    const getAllLeaguesUseCase = new GetAllLeaguesUseCase(
      this.deps.leagueRepository
    );

    const getPublicLeaguesUseCase = new GetPublicLeaguesUseCase(
      this.deps.leagueRepository
    );

    const getMyLeaguesUseCase = new GetMyLeaguesUseCase(
      this.deps.leagueRepository
    );

    const getLeagueByIdUseCase = new GetLeagueByIdUseCase(
      this.deps.leagueRepository
    );

    const updateLeagueUseCase = new UpdateLeagueUseCase(
      this.deps.leagueRepository
    );

    const deleteLeagueUseCase = new DeleteLeagueUseCase(
      this.deps.leagueRepository
    );

    const joinLeagueUseCase = new JoinLeagueUseCase(this.deps.leagueRepository);

    const leaveLeagueUseCase = new LeaveLeagueUseCase(
      this.deps.leagueRepository
    );

    const getLeagueMembersUseCase = new GetLeagueMembersUseCase(
      this.deps.leagueRepository
    );

    const removeMemberUseCase = new RemoveMemberUseCase(
      this.deps.leagueRepository
    );

    const transferAdminUseCase = new TransferAdminUseCase(
      this.deps.leagueRepository
    );

    return {
      createLeagueUseCase,
      getAllLeaguesUseCase,
      getPublicLeaguesUseCase,
      getMyLeaguesUseCase,
      getLeagueByIdUseCase,
      updateLeagueUseCase,
      deleteLeagueUseCase,
      joinLeagueUseCase,
      leaveLeagueUseCase,
      getLeagueMembersUseCase,
      removeMemberUseCase,
      transferAdminUseCase,
    };
  }
}
