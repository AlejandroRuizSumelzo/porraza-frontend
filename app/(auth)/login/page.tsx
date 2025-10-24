import { Suspense } from "react";
import { LoginForm } from "@/presentation/components/auth/login-form";
import { Spinner } from "@/presentation/components/ui/spinner";

/**
 * Login Page
 *
 * Clean Architecture:
 * - App Router layer (orchestration)
 * - Delegates all UI and logic to presentation layer component
 * - Keep pages minimal and focused on routing
 *
 * IMPORTANT: Wrapped in Suspense boundary
 * - Required by Next.js 15 for components using useSearchParams()
 * - Shows fallback while search params are being read
 */
export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
