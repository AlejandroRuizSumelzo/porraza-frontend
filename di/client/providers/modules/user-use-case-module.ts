import type { DependencyModule } from "@/di/client/providers/modules/base-module";
import type { UserRepository } from "@/domain/repositories/user-repository";
import { UpdateUserUseCase } from "@/domain/use-cases/users/update-user-use-case";
import { DeleteUserUseCase } from "@/domain/use-cases/users/delete-user-use-case";
import { UploadProfilePictureUseCase } from "@/domain/use-cases/users/upload-profile-picture-use-case";
import { ChangePasswordUseCase } from "@/domain/use-cases/users/change-password-use-case";

/**
 * User Use Case Module
 * Registers all user-related use cases in the DI container
 */

interface UserUseCaseModuleDeps {
  userRepository: UserRepository;
}

export class UserUseCaseModule implements DependencyModule {
  constructor(private deps: UserUseCaseModuleDeps) {}

  register() {
    const updateUserUseCase = new UpdateUserUseCase(this.deps.userRepository);
    const deleteUserUseCase = new DeleteUserUseCase(this.deps.userRepository);
    const uploadProfilePictureUseCase = new UploadProfilePictureUseCase(
      this.deps.userRepository
    );
    const changePasswordUseCase = new ChangePasswordUseCase(
      this.deps.userRepository
    );

    console.log("[UserUseCaseModule] User use cases registered");

    return {
      updateUserUseCase,
      deleteUserUseCase,
      uploadProfilePictureUseCase,
      changePasswordUseCase,
    };
  }
}
