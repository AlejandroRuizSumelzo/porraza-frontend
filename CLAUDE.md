# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production with Turbopack
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

The dev server runs on http://localhost:3000 by default.

## Architecture Overview

### Route-Based Architecture with Next.js 15 App Router

This application uses **Route Groups** to organize pages into three logical sections:

1. **`app/(landing)/`** - Public marketing pages

   - Landing page, pricing, legal pages (privacy, terms)
   - Accessible to all users

2. **`app/(auth)/`** - Authentication pages

   - Login and signup pages
   - Auto-redirect to `/dashboard` if already authenticated

3. **`app/(app)/`** - Protected application pages
   - Dashboard and all private features
   - Protected by middleware authentication

**Important:** Route Groups (folders with parentheses) do NOT appear in URLs. For example:

- `app/(landing)/pricing/page.tsx` → `/pricing`
- `app/(app)/dashboard/page.tsx` → `/dashboard`

### Authentication & Middleware System

**Middleware (`middleware.ts`):**

- Runs on Edge Runtime before every request
- Checks for `auth-token` cookie to determine authentication state
- Protected routes: `/dashboard`, `/projects`, `/analytics`, `/settings`
- Auth routes: `/login`, `/signup`

**Current Implementation (Demo):**

- Simple cookie-based authentication for demonstration
- Functions in `lib/auth.ts`: `isAuthenticated()`, `getCurrentUser()`
- Login/signup set a cookie, logout removes it

**For Production:**
Replace the demo auth with a real solution (NextAuth.js, Clerk, Auth0, etc.). The middleware architecture is designed to work with any auth provider - just update the `auth-token` cookie verification logic.

### UI Component System

This project uses **shadcn/ui** (New York style) as the primary UI component library.

**Key Features:**

- Tailwind CSS v4 for styling
- Path alias: `@/` maps to project root
- Components in `@/presentation/components/ui/`
- Utilities in `@/lib/utils`
- Lucide React for icons
- Motion (Framer Motion v12) for animations
- RSC (React Server Components) enabled

**Available shadcn/ui Components:**

- `Button` - Interactive button with multiple variants
- `Badge` - Labels and tags with variant support
- `Card` - Container with Header, Content, Footer, Title, Description, and Action
- `Avatar` - User profile images
- `Input` - Text input fields
- `Textarea` - Multi-line text input
- `Checkbox` - Selection controls
- `Table` - Data tables
- `Spinner` - Loading indicators
- `Sonner` - Toast notifications

**Animation Library:**

- Uses `motion/react` (Motion One / Framer Motion v12)
- Import: `import { motion, AnimatePresence } from "motion/react"`
- Apply animations with `initial`, `animate`, `exit`, `whileHover`, `whileTap`
- Use `transition` for spring physics and timing

**Best Practices:**

- Always use `cn()` utility from `@/lib/utils` for conditional classes
- Import components from `@/presentation/components/ui/[component]`
- Use `asChild` prop with Slot for component composition
- Leverage `variants` from class-variance-authority for component flexibility
- Add `"use client"` directive when using hooks or animations
- Use semantic HTML and ARIA attributes for accessibility

## Key Technical Details

### Middleware Matcher Configuration

The middleware matcher excludes static assets and API routes for performance:

```typescript
matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)"];
```

### TypeScript Configuration

- Path alias `@/*` points to project root
- Target: ES2017
- Strict mode enabled

### Cookie Handling

Cookies are handled differently in middleware vs. Server Components:

- **Middleware:** `request.cookies.get("name")`
- **Server Components:** `const cookieStore = await cookies(); cookieStore.get("name")`

## Adding New Protected Routes

1. Create the page under `app/(app)/your-route/page.tsx`
2. Add the route path to the `protectedRoutes` array in `middleware.ts`
3. The middleware will automatically protect it

## Adding New Public Routes

Simply create pages under `app/(landing)/` - no middleware configuration needed.

## Important Notes

- Middleware runs on Edge Runtime - some Node.js APIs are unavailable
- Route Groups are for organization only, they don't affect URLs or routing
- The middleware `matcher` pattern is critical for performance - avoid matching static assets
- All client-side pages that use hooks must have `"use client"` directive
