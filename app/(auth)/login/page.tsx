import { LoginForm } from "@/presentation/components/auth/login-form";

/**
 * Login Page
 *
 * Clean Architecture:
 * - App Router layer (orchestration)
 * - Delegates all UI and logic to presentation layer component
 * - Keep pages minimal and focused on routing
 */
export default function LoginPage() {
  return <LoginForm />;
}
