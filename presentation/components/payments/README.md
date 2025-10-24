# Payment Components

This directory contains UI components for the Stripe payment flow.

## Components

### PaymentRequiredGuard

A guard component that protects premium content by checking payment status.

**Usage:**

```tsx
import { PaymentRequiredGuard } from "@/presentation/components/payments/payment-required-guard";

export default function PremiumPage() {
  return (
    <PaymentRequiredGuard>
      <div>
        <h1>Premium Content</h1>
        <p>This is only visible to users who have paid.</p>
      </div>
    </PaymentRequiredGuard>
  );
}
```

**Props:**

- `children`: Content to show if user has paid (required)
- `loadingComponent`: Custom loading component (optional)
- `errorComponent`: Custom error component (optional)

## Pages

### Checkout Page (`app/(app)/checkout/page.tsx`)

Displays Stripe Embedded Checkout for the €1.99 payment.

**Flow:**
1. Creates checkout session on mount
2. Displays Stripe Embedded Checkout with clientSecret
3. User completes payment with test card: `4242 4242 4242 4242`
4. Stripe redirects to `/checkout/success?session_id=xxx`

### Success Page (`app/(app)/checkout/success/page.tsx`)

Displays payment confirmation after Stripe redirect.

**Flow:**
1. Receives `session_id` from query params
2. Fetches session status from backend
3. Shows success message if payment completed
4. Shows pending message if payment still processing
5. Provides navigation buttons to dashboard/predictions

## Hooks

All payment hooks are located in `presentation/hooks/payments/`:

- `useCheckout()` - Create checkout session
- `usePaymentStatus()` - Verify user payment status
- `useSessionStatus(sessionId)` - Get specific session status

## Testing

**Test Card:**
```
Card Number: 4242 4242 4242 4242
Expiry: 12/34
CVC: 123
ZIP: 12345
```

**Test Flow:**
1. Start backend: `cd porraza-backend && pnpm run start:dev`
2. Start Stripe CLI: `stripe listen --forward-to http://localhost:3001/payments/webhook`
3. Start frontend: `npm run dev`
4. Navigate to `/checkout`
5. Complete payment with test card
6. Verify redirect to `/checkout/success`
7. Check backend logs for webhook confirmation

## Architecture

This follows Clean Architecture:

```
Domain Layer (Business Logic)
├── entities/checkout-session.ts
├── repositories/payment-repository.ts
└── use-cases/payments/
    ├── create-checkout-session-use-case.ts
    ├── verify-payment-status-use-case.ts
    └── get-session-status-use-case.ts

Infrastructure Layer (External Services)
├── repositories/payment-repository-impl.ts
├── http/dtos/payment-dto.ts
└── mappers/payment-mapper.ts

Presentation Layer (UI)
├── hooks/payments/
│   ├── use-checkout.ts
│   ├── use-payment-status.ts
│   └── use-session-status.ts
└── components/payments/
    └── payment-required-guard.tsx

DI Layer (Dependency Injection)
├── client/hooks/use-payments.ts
└── client/providers/modules/payment-use-case-module.ts
```
