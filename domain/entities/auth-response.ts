import type { User } from "@/domain/entities/user";
import type { AuthTokens } from "@/domain/entities/auth-tokens";

export interface AuthResponse {
  tokens: AuthTokens;
  user: User;
}
