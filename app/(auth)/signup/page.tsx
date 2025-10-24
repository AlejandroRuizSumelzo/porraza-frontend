import { SignupForm } from "@/presentation/components/auth/signup-form";

/**
 * Signup Page
 *
 * Clean Architecture:
 * - App Router layer (orchestration)
 * - Delegates all UI and logic to presentation layer component
 * - Keep pages minimal and focused on routing
 */
export default function SignupPage() {
  return <SignupForm />;
}
