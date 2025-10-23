import type { AuthResponse } from "@/domain/entities/auth-response";
import type { AuthRepository } from "@/domain/repositories/auth-repository";

/**
 * Login Use Case
 * Business logic for user authentication
 */
export class LoginUseCase {
  constructor(private readonly repository: AuthRepository) {}

  /**
   * Execute the login use case
   * @param email - User's email address
   * @param password - User's password
   * @returns Promise with authentication response (tokens + user data)
   * @throws Error if credentials are invalid, account is inactive, or validation fails
   */
  async execute(email: string, password: string): Promise<AuthResponse> {
    // Business validation (could add more rules here)
    if (!email || !email.trim()) {
      throw new Error("El email es requerido");
    }

    if (!password || !password.trim()) {
      throw new Error("La contraseña es requerida");
    }

    // Delegate to repository
    const authResponse = await this.repository.login(email, password);

    // Business logic: could add additional checks here
    // For example: check if user is active, log login attempt, etc.
    if (!authResponse.user.isActive) {
      throw new Error("La cuenta está inactiva. Contacta con soporte.");
    }

    return authResponse;
  }
}
