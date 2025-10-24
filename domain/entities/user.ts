export interface User {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  isEmailVerified: boolean;
  lastLoginAt: string | null;
  hasPaid: boolean;
  stripeCustomerId?: string | null;
}
