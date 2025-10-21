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

## Architecture

### Clean Architecture Structure

**Porraza** follows Clean Architecture principles with clear separation of concerns optimized for Next.js 15:

```
porraza-frontend/
├── domain/              # Business logic (pure TypeScript)
│   ├── entities/        # Business entities (Match, Team, Prediction, User, etc.)
│   ├── repositories/    # Repository interfaces (contracts)
│   └── use-cases/       # Business use cases (application logic)
├── infrastructure/      # External concerns & implementations
│   ├── adapters/        # External service adapters (APIs, third-party services)
│   ├── http/            # HTTP client implementation (fetch wrappers, interceptors)
│   ├── mappers/         # Data transformation between layers (DTO ↔ Entity)
│   ├── repositories/    # Repository implementations (API calls)
│   └── store/           # Zustand global state stores
├── presentation/        # UI layer (React components)
│   ├── components/      # React components
│   │   ├── ui/          # shadcn/ui components (Button, Card, etc.)
│   │   ├── predictions/ # Feature-specific components
│   │   ├── matches/     # Feature-specific components
│   │   └── ...
│   ├── hooks/           # Custom React hooks for business logic
│   └── schemas/         # Zod validation schemas (forms, DTOs)
├── di/                  # Dependency Injection
│   ├── context/         # React context for DI
│   ├── factories/       # Factory functions for use cases
│   ├── hooks/           # DI hooks (useGetMatches, etc.)
│   ├── interfaces/      # DI interfaces
│   └── providers/       # DI providers (wrap app)
├── app/                 # Next.js 15 App Router (file-based routing)
│   ├── (landing)/       # Public pages
│   ├── (auth)/          # Auth pages
│   ├── (app)/           # Protected pages
│   └── api/             # API routes (if needed)
├── lib/                 # Shared utilities
│   ├── utils.ts         # Utility functions (cn(), etc.)
│   └── auth.ts          # Auth helpers
├── public/              # Static assets
│   └── stadiums/        # Stadium images (lazy loaded)
└── middleware.ts        # Auth & routing middleware
```

### Dependency Rules (Critical)

**Domain Layer (`domain/`):**
- ✅ Pure TypeScript only
- ❌ NO React, NO Next.js, NO external libraries
- ❌ NO imports from `infrastructure/`, `presentation/`, `di/`
- Contains: Entities, repository interfaces, use cases

**Infrastructure Layer (`infrastructure/`):**
- ✅ Can import from `domain/`
- ❌ NO imports from `presentation/`
- Contains: Repository implementations, API clients, mappers, stores

**Presentation Layer (`presentation/`):**
- ✅ Can import from `domain/` and `infrastructure/`
- Contains: React components, hooks, schemas

**Dependency Injection (`di/`):**
- ✅ Connects all layers
- Provides: Context, factories, hooks to wire dependencies

**App Router (`app/`):**
- ✅ Can import from all layers (orchestration layer)
- Contains: Pages (Server Components), layouts, API routes

### State Management Strategy

**1. Server State (React Server Components - Preferred):**
```tsx
// app/(app)/dashboard/page.tsx
export default async function DashboardPage() {
  // Fetch data directly in Server Component
  const matches = await getMatchesUseCase.execute();
  return <MatchList matches={matches} />;
}
```

**2. Client State (Zustand - Minimal use):**
```typescript
// infrastructure/store/auth-store.ts
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
```

**When to use Zustand:**
- Global auth state (user session, tokens)
- UI state shared across multiple client components
- Client-side preferences (theme, language)

**When NOT to use Zustand:**
- Server-fetched data (use RSC or React Query instead)
- Form state (use react-hook-form)
- URL-based state (use searchParams)

### Next.js 15 Specifics

**Server Components (Default):**
- Pages in `app/` are Server Components by default
- Fetch data directly, no useState/useEffect needed
- Better performance, smaller client bundles

**Client Components (`"use client"`):**
- Required for: hooks (useState, useEffect), event handlers, Zustand stores
- Mark with `"use client"` directive at top of file
- Keep as minimal as possible (composition pattern)

**Data Fetching Patterns:**
```tsx
// ✅ Good: Server Component with use case
async function MatchesPage() {
  const getMatches = new GetMatchesUseCase(repository);
  const matches = await getMatches.execute();
  return <MatchList matches={matches} />;
}

// ✅ Good: Client Component with hook + DI
"use client";
function LiveScores() {
  const getMatches = useGetMatches(); // DI hook
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    getMatches.execute().then(setMatches);
  }, []);

  return <ScoreBoard matches={matches} />;
}

// ❌ Bad: Direct repository call in component
"use client";
function MatchesPage() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch('/api/matches').then(r => r.json()).then(setMatches); // ❌ No!
  }, []);
}
```

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

## Clean Architecture Implementation Patterns

### Domain Layer Patterns

**Entities (`domain/entities/`):**
```typescript
// domain/entities/match.ts
export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: Date;
  stadium: string;
  competition: Competition;
  status: 'scheduled' | 'live' | 'finished';
  score?: {
    home: number;
    away: number;
  };
}

// domain/entities/prediction.ts
export interface Prediction {
  id: string;
  userId: string;
  matchId: string;
  predictedScore: {
    home: number;
    away: number;
  };
  confidence: number;
  createdAt: Date;
}
```

**Use Cases (`domain/use-cases/`):**
```typescript
// domain/use-cases/predictions/create-prediction-use-case.ts
import type { Prediction } from '@/domain/entities/prediction';
import type { PredictionRepository } from '@/domain/repositories/prediction-repository';

export interface CreatePredictionParams {
  userId: string;
  matchId: string;
  homeScore: number;
  awayScore: number;
  confidence: number;
}

export class CreatePredictionUseCase {
  constructor(private repository: PredictionRepository) {}

  async execute(params: CreatePredictionParams): Promise<Prediction> {
    // Business validation
    if (params.homeScore < 0 || params.awayScore < 0) {
      throw new Error('Scores cannot be negative');
    }

    if (params.confidence < 0 || params.confidence > 100) {
      throw new Error('Confidence must be between 0 and 100');
    }

    // Delegate to repository
    return await this.repository.create({
      userId: params.userId,
      matchId: params.matchId,
      predictedScore: {
        home: params.homeScore,
        away: params.awayScore,
      },
      confidence: params.confidence,
      createdAt: new Date(),
    });
  }
}
```

**Repository Interfaces (`domain/repositories/`):**
```typescript
// domain/repositories/prediction-repository.ts
import type { Prediction } from '@/domain/entities/prediction';

export interface PredictionRepository {
  create(data: Omit<Prediction, 'id'>): Promise<Prediction>;
  findById(id: string): Promise<Prediction | null>;
  findByUserId(userId: string): Promise<Prediction[]>;
  findByMatchId(matchId: string): Promise<Prediction[]>;
  update(id: string, data: Partial<Prediction>): Promise<Prediction>;
  delete(id: string): Promise<void>;
}
```

### Infrastructure Layer Patterns

**Repository Implementation (`infrastructure/repositories/`):**
```typescript
// infrastructure/repositories/prediction-repository-impl.ts
import type { Prediction } from '@/domain/entities/prediction';
import type { PredictionRepository } from '@/domain/repositories/prediction-repository';
import { httpClient } from '@/infrastructure/http/client';
import { PredictionMapper } from '@/infrastructure/mappers/prediction-mapper';

export class PredictionRepositoryImpl implements PredictionRepository {
  private baseUrl = '/api/predictions';

  async create(data: Omit<Prediction, 'id'>): Promise<Prediction> {
    const dto = PredictionMapper.toDTO(data);
    const response = await httpClient.post(this.baseUrl, dto);
    return PredictionMapper.toDomain(response.data);
  }

  async findById(id: string): Promise<Prediction | null> {
    try {
      const response = await httpClient.get(`${this.baseUrl}/${id}`);
      return PredictionMapper.toDomain(response.data);
    } catch (error) {
      if (error.status === 404) return null;
      throw error;
    }
  }

  async findByUserId(userId: string): Promise<Prediction[]> {
    const response = await httpClient.get(`${this.baseUrl}?userId=${userId}`);
    return response.data.map(PredictionMapper.toDomain);
  }

  // ... other methods
}
```

**Mappers (`infrastructure/mappers/`):**
```typescript
// infrastructure/mappers/prediction-mapper.ts
import type { Prediction } from '@/domain/entities/prediction';

interface PredictionDTO {
  id: string;
  user_id: string;
  match_id: string;
  predicted_home_score: number;
  predicted_away_score: number;
  confidence: number;
  created_at: string;
}

export class PredictionMapper {
  static toDomain(dto: PredictionDTO): Prediction {
    return {
      id: dto.id,
      userId: dto.user_id,
      matchId: dto.match_id,
      predictedScore: {
        home: dto.predicted_home_score,
        away: dto.predicted_away_score,
      },
      confidence: dto.confidence,
      createdAt: new Date(dto.created_at),
    };
  }

  static toDTO(domain: Omit<Prediction, 'id'>): Omit<PredictionDTO, 'id'> {
    return {
      user_id: domain.userId,
      match_id: domain.matchId,
      predicted_home_score: domain.predictedScore.home,
      predicted_away_score: domain.predictedScore.away,
      confidence: domain.confidence,
      created_at: domain.createdAt.toISOString(),
    };
  }
}
```

**HTTP Client (`infrastructure/http/`):**
```typescript
// infrastructure/http/client.ts
interface HttpClient {
  get<T>(url: string): Promise<{ data: T }>;
  post<T>(url: string, body: unknown): Promise<{ data: T }>;
  put<T>(url: string, body: unknown): Promise<{ data: T }>;
  delete<T>(url: string): Promise<{ data: T }>;
}

export const httpClient: HttpClient = {
  async get(url) {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(response.statusText);
    return { data: await response.json() };
  },

  async post(url, body) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(response.statusText);
    return { data: await response.json() };
  },

  // ... other methods
};
```

### Dependency Injection Patterns

**DI Context (`di/context/`):**
```typescript
// di/context/repository-context.tsx
"use client";
import { createContext, useContext, type ReactNode } from 'react';
import type { PredictionRepository } from '@/domain/repositories/prediction-repository';
import { PredictionRepositoryImpl } from '@/infrastructure/repositories/prediction-repository-impl';

interface RepositoryContextValue {
  predictionRepository: PredictionRepository;
  // ... other repositories
}

const RepositoryContext = createContext<RepositoryContextValue | null>(null);

export function RepositoryProvider({ children }: { children: ReactNode }) {
  const value: RepositoryContextValue = {
    predictionRepository: new PredictionRepositoryImpl(),
    // ... other repositories
  };

  return (
    <RepositoryContext.Provider value={value}>
      {children}
    </RepositoryContext.Provider>
  );
}

export function useRepositories() {
  const context = useContext(RepositoryContext);
  if (!context) {
    throw new Error('useRepositories must be used within RepositoryProvider');
  }
  return context;
}
```

**DI Hooks (`di/hooks/`):**
```typescript
// di/hooks/use-predictions.ts
"use client";
import { useMemo } from 'react';
import { useRepositories } from '@/di/context/repository-context';
import { CreatePredictionUseCase } from '@/domain/use-cases/predictions/create-prediction-use-case';
import { GetPredictionsByUserUseCase } from '@/domain/use-cases/predictions/get-predictions-by-user-use-case';

export function useCreatePrediction() {
  const { predictionRepository } = useRepositories();
  return useMemo(
    () => new CreatePredictionUseCase(predictionRepository),
    [predictionRepository]
  );
}

export function useGetPredictionsByUser() {
  const { predictionRepository } = useRepositories();
  return useMemo(
    () => new GetPredictionsByUserUseCase(predictionRepository),
    [predictionRepository]
  );
}
```

**DI Provider Setup (`app/layout.tsx`):**
```tsx
// app/layout.tsx
import { RepositoryProvider } from '@/di/context/repository-context';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <RepositoryProvider>
          {children}
        </RepositoryProvider>
      </body>
    </html>
  );
}
```

### Presentation Layer Patterns

**Custom Hooks (`presentation/hooks/`):**
```typescript
// presentation/hooks/predictions/use-user-predictions.ts
"use client";
import { useState, useEffect } from 'react';
import { useGetPredictionsByUser } from '@/di/hooks/use-predictions';
import type { Prediction } from '@/domain/entities/prediction';

export function useUserPredictions(userId: string) {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const getPredictions = useGetPredictionsByUser();

  useEffect(() => {
    getPredictions
      .execute(userId)
      .then(setPredictions)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId, getPredictions]);

  return { predictions, loading, error };
}
```

**Form Schemas (`presentation/schemas/`):**
```typescript
// presentation/schemas/prediction-schema.ts
import { z } from 'zod';

export const predictionSchema = z.object({
  matchId: z.string().min(1, 'Match ID is required'),
  homeScore: z.number().min(0, 'Score must be positive').int(),
  awayScore: z.number().min(0, 'Score must be positive').int(),
  confidence: z.number().min(0).max(100, 'Confidence must be 0-100'),
});

export type PredictionFormData = z.infer<typeof predictionSchema>;
```

**Components (`presentation/components/`):**
```tsx
// presentation/components/predictions/prediction-form.tsx
"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { predictionSchema, type PredictionFormData } from '@/presentation/schemas/prediction-schema';
import { useCreatePrediction } from '@/di/hooks/use-predictions';
import { Button } from '@/presentation/components/ui/button';
import { Input } from '@/presentation/components/ui/input';

interface PredictionFormProps {
  matchId: string;
  userId: string;
  onSuccess?: () => void;
}

export function PredictionForm({ matchId, userId, onSuccess }: PredictionFormProps) {
  const createPrediction = useCreatePrediction();

  const form = useForm<PredictionFormData>({
    resolver: zodResolver(predictionSchema),
    defaultValues: {
      matchId,
      homeScore: 0,
      awayScore: 0,
      confidence: 50,
    },
  });

  const onSubmit = async (data: PredictionFormData) => {
    try {
      await createPrediction.execute({
        userId,
        matchId: data.matchId,
        homeScore: data.homeScore,
        awayScore: data.awayScore,
        confidence: data.confidence,
      });
      onSuccess?.();
    } catch (error) {
      console.error('Failed to create prediction:', error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Input
        type="number"
        placeholder="Home Score"
        {...form.register('homeScore', { valueAsNumber: true })}
      />
      <Input
        type="number"
        placeholder="Away Score"
        {...form.register('awayScore', { valueAsNumber: true })}
      />
      <Input
        type="number"
        placeholder="Confidence (0-100)"
        {...form.register('confidence', { valueAsNumber: true })}
      />
      <Button type="submit" disabled={form.formState.isSubmitting}>
        Submit Prediction
      </Button>
    </form>
  );
}
```

### Server Component Patterns (Next.js 15)

**Server Component with Direct Use Case:**
```tsx
// app/(app)/predictions/page.tsx
import { PredictionRepositoryImpl } from '@/infrastructure/repositories/prediction-repository-impl';
import { GetPredictionsByUserUseCase } from '@/domain/use-cases/predictions/get-predictions-by-user-use-case';
import { PredictionList } from '@/presentation/components/predictions/prediction-list';
import { getCurrentUser } from '@/lib/auth';

export default async function PredictionsPage() {
  const user = await getCurrentUser();

  // Instantiate use case directly in Server Component
  const repository = new PredictionRepositoryImpl();
  const getPredictions = new GetPredictionsByUserUseCase(repository);

  const predictions = await getPredictions.execute(user.id);

  return (
    <div>
      <h1>My Predictions</h1>
      <PredictionList predictions={predictions} />
    </div>
  );
}
```

## Development Guidelines

### File Organization

**Naming Conventions:**
- Components: `kebab-case.tsx` (e.g., `match-prediction-card.tsx`)
- Hooks: `use-feature-name.ts` (e.g., `use-user-predictions.ts`)
- Use cases: `action-entity-use-case.ts` (e.g., `create-prediction-use-case.ts`)
- Repositories: `entity-repository.ts` for interfaces, `entity-repository-impl.ts` for implementations
- Entities: `entity-name.ts` (e.g., `prediction.ts`, `match.ts`)

**Code Conventions:**
- Components: PascalCase (e.g., `PredictionForm`)
- Hooks: camelCase starting with `use` (e.g., `useUserPredictions`)
- Use cases: PascalCase ending with `UseCase` (e.g., `CreatePredictionUseCase`)
- Interfaces: PascalCase (e.g., `PredictionRepository`)

### Common Tasks

**Adding a New Feature (Complete Flow):**

1. **Define Entity** (`domain/entities/feature.ts`):
```typescript
export interface Feature {
  id: string;
  // ... properties
}
```

2. **Create Repository Interface** (`domain/repositories/feature-repository.ts`):
```typescript
export interface FeatureRepository {
  create(data: Omit<Feature, 'id'>): Promise<Feature>;
  findById(id: string): Promise<Feature | null>;
  // ... other methods
}
```

3. **Create Use Cases** (`domain/use-cases/feature/`):
```typescript
// create-feature-use-case.ts
export class CreateFeatureUseCase {
  constructor(private repository: FeatureRepository) {}
  async execute(params: CreateFeatureParams): Promise<Feature> {
    // Business logic
  }
}
```

4. **Implement Repository** (`infrastructure/repositories/feature-repository-impl.ts`):
```typescript
export class FeatureRepositoryImpl implements FeatureRepository {
  async create(data: Omit<Feature, 'id'>): Promise<Feature> {
    // API call
  }
}
```

5. **Create Mapper** (`infrastructure/mappers/feature-mapper.ts`):
```typescript
export class FeatureMapper {
  static toDomain(dto: FeatureDTO): Feature { /* ... */ }
  static toDTO(domain: Feature): FeatureDTO { /* ... */ }
}
```

6. **Add DI Hooks** (`di/hooks/use-feature.ts`):
```typescript
export function useCreateFeature() {
  const { featureRepository } = useRepositories();
  return useMemo(() => new CreateFeatureUseCase(featureRepository), [featureRepository]);
}
```

7. **Create Presentation Hook** (`presentation/hooks/feature/use-features.ts`):
```typescript
export function useFeatures() {
  const getFeatures = useGetFeatures();
  const [features, setFeatures] = useState([]);
  // ... logic
  return { features, loading, error };
}
```

8. **Create Form Schema** (`presentation/schemas/feature-schema.ts`):
```typescript
export const featureSchema = z.object({ /* ... */ });
```

9. **Create Components** (`presentation/components/feature/`):
```tsx
export function FeatureForm() { /* ... */ }
export function FeatureList() { /* ... */ }
```

10. **Create Page** (`app/(app)/features/page.tsx`):
```tsx
export default async function FeaturesPage() {
  // Server Component with direct use case
}
```

## Testing

**No tests are currently configured for this project.** Testing infrastructure will be added in the future. For now, focus on manual testing and code quality.

## Important Notes

- **Middleware** runs on Edge Runtime - some Node.js APIs are unavailable
- **Route Groups** are for organization only, they don't affect URLs or routing
- **Middleware matcher** pattern is critical for performance - avoid matching static assets
- **Client Components** require `"use client"` directive when using hooks or event handlers
- **Server Components** are the default - prefer them for data fetching when possible
- **Domain layer** must remain pure TypeScript - no React, no Next.js, no external dependencies
- **Use Cases** should contain business logic only - no HTTP calls, no UI concerns
- **Repositories** handle all external communication - API calls, database, third-party services
- **Mappers** transform between DTOs (API format) and domain entities
- **Zustand** should be used minimally - prefer Server Components for data fetching
- **No tests yet** - testing infrastructure will be added later
