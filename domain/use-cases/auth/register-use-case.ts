import type { RegisterResponse } from "@/domain/entities/register-response";
import type { AuthRepository } from "@/domain/repositories/auth-repository";

/**
 * Register Use Case
 * Business logic for user registration
 */
export class RegisterUseCase {
  constructor(private readonly repository: AuthRepository) {}

  /**
   * Execute the register use case
   * @param email - User's email address
   * @param password - User's password
   * @param name - User's full name
   * @returns Promise with registration response (user data + message)
   * @throws Error if email is already registered, validation fails, or user data is invalid
   */
  async execute(
    email: string,
    password: string,
    name: string
  ): Promise<RegisterResponse> {
    // Business validation
    if (!email || !email.trim()) {
      throw new Error("El email es requerido");
    }

    if (!password || !password.trim()) {
      throw new Error("La contraseña es requerida");
    }

    if (!name || !name.trim()) {
      throw new Error("El nombre es requerido");
    }

    // Email format validation (basic check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("El formato del email no es válido");
    }

    // Password strength validation
    if (password.length < 8) {
      throw new Error("La contraseña debe tener al menos 8 caracteres");
    }

    // Name validation
    if (name.length < 2) {
      throw new Error("El nombre debe tener al menos 2 caracteres");
    }

    // Delegate to repository
    return await this.repository.register(email, password, name);
  }
}
