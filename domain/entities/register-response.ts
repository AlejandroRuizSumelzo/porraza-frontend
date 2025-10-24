import type { User } from "@/domain/entities/user";

export interface RegisterResponse {
  user: User;
  message: string;
}
