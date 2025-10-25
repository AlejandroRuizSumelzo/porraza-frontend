# League Management System

Complete guide to the league management system in Porraza Frontend.

## 📋 Table of Contents

- [Architecture Overview](#architecture-overview)
- [Data Flow](#data-flow)
- [Components](#components)
- [Usage Examples](#usage-examples)
- [Best Practices](#best-practices)

---

## 🏗 Architecture Overview

### Design Decision: Frontend-Managed Leagues

**Why we DON'T fetch leagues in the login endpoint:**

✅ **Benefits of frontend management:**

1. **Separation of concerns**: Login handles authentication only, leagues are a separate resource
2. **Scalability**: Login payload stays lightweight even if user has many leagues
3. **Flexibility**: Can refresh leagues without re-authenticating
4. **Clean Architecture**: Each endpoint has a single responsibility
5. **Caching**: Can cache leagues independently with smart refresh logic

❌ **Problems with backend-managed leagues:**

- Violates single responsibility principle
- Heavy login payload
- Can't update leagues without logout/login
- Tight coupling between auth and leagues

### State Management with Zustand

We use **two separate Zustand stores**:

1. **`authStore`** ([infrastructure/store/auth-store.ts](infrastructure/store/auth-store.ts))

   - Manages user authentication (user, tokens)
   - Persists: user, refreshToken
   - Memory-only: accessToken (security)

2. **`leagueStore`** ([infrastructure/store/league-store.ts](infrastructure/store/league-store.ts))
   - Manages user leagues and selected league
   - Persists: leagues, selectedLeagueId, lastFetchedAt
   - Memory-only: isLoading

---

## 🔄 Data Flow

### Complete Authentication + League Sync Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. User enters email + password                                  │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. useLogin hook executes                                        │
│    ├─ Call loginUseCase.execute(email, password)                │
│    └─ Backend validates credentials                             │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. Login Success - AuthResponse received                        │
│    {                                                             │
│      user: { id, email, name, ... },                            │
│      tokens: { accessToken, refreshToken, expiresIn }           │
│    }                                                             │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. Save Auth to Zustand Store                                   │
│    authStore.setAuth(authResponse)                              │
│    ├─ user → persisted in localStorage                          │
│    ├─ refreshToken → persisted in localStorage                  │
│    └─ accessToken → memory only (security)                      │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. Fetch User Leagues Immediately                               │
│    getMyLeaguesUseCase.execute()                                │
│    ├─ GET /leagues/my                                           │
│    └─ Returns: League[]                                         │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. Save Leagues to Zustand Store                                │
│    leagueStore.setLeagues(leagues)                              │
│    ├─ leagues → persisted in localStorage                       │
│    ├─ selectedLeagueId → auto-select first league               │
│    └─ lastFetchedAt → current timestamp                         │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│ 7. User Redirected to Dashboard                                 │
│    ├─ Sidebar shows leagues (reads from leagueStore)            │
│    ├─ Selected league is highlighted                            │
│    └─ Predictions/Leaderboard filter by selectedLeagueId        │
└─────────────────────────────────────────────────────────────────┘
```

### User Changes Selected League

```
User clicks on League B in Sidebar
          ↓
selectSetSelectedLeagueId('league-b-id')
          ↓
leagueStore.selectedLeagueId = 'league-b-id'
          ↓
All components reading selectSelectedLeagueId() re-render
          ↓
Predictions/Leaderboard/Settings show data for League B
```

### User Logs Out

```
User clicks Logout
          ↓
useLogout.execute()
          ↓
Backend clears HTTP-only cookies
          ↓
authStore.clearAuth() → clear user + tokens
          ↓
leagueStore.clearLeagues() → clear leagues + selectedLeagueId
          ↓
localStorage.removeItem('porraza-auth')
localStorage.removeItem('porraza-leagues')
          ↓
Redirect to /login
```

---

## 🧩 Components

### 1. League Store (`infrastructure/store/league-store.ts`)

**State:**

```typescript
{
  leagues: League[];              // All user leagues
  selectedLeagueId: string | null; // Currently selected league
  isLoading: boolean;             // Loading state
  lastFetchedAt: number | null;   // Timestamp of last fetch
}
```

**Actions:**

- `setLeagues(leagues)` - Set all leagues (auto-selects first if none selected)
- `setSelectedLeagueId(id)` - Change selected league
- `addLeague(league)` - Add a new league to the list
- `updateLeague(id, updates)` - Update existing league
- `removeLeague(id)` - Remove a league (auto-selects next)
- `clearLeagues()` - Clear all league state (on logout)

**Getters:**

- `getSelectedLeague()` - Get full selected league object
- `getLeagues()` - Get all leagues
- `shouldRefresh()` - Check if data is stale (> 5 minutes)

### 2. League Selectors (`infrastructure/store/selectors.ts`)

Optimized selectors to prevent unnecessary re-renders:

```typescript
// State selectors
selectLeagues(); // Get all leagues
selectSelectedLeagueId(); // Get selected league ID
selectSelectedLeague(); // Get selected league object
selectLeaguesLoading(); // Get loading state
selectShouldRefreshLeagues(); // Check if refresh needed

// Action selectors
selectSetLeagues(); // Get setLeagues action
selectSetSelectedLeagueId(); // Get setSelectedLeagueId action
selectAddLeague(); // Get addLeague action
selectClearLeagues(); // Get clearLeagues action
```

### 3. Use Login Hook (`presentation/hooks/auth/use-login.ts`)

Enhanced to automatically fetch leagues after successful login:

```typescript
const { login, isLoading, error } = useLogin();

await login(email, password);
// After successful login:
// 1. Auth saved to authStore
// 2. Leagues fetched from backend
// 3. Leagues saved to leagueStore
```

### 4. Use Sync Leagues Hook (`presentation/hooks/leagues/use-sync-leagues.ts`)

Smart hook for syncing leagues with backend:

```typescript
const { isLoading, error, refresh, isSynced } = useSyncLeagues({
  autoFetch: true, // Auto-fetch on mount (default: true)
  forceRefresh: false, // Force refresh even if fresh (default: false)
});

// Features:
// - Auto-fetches on mount if authenticated
// - Smart refresh: only fetches if data is stale (> 5 minutes)
// - Manual refresh with refresh()
// - Skips fetch if user is not authenticated
```

---

## 💡 Usage Examples

### Example 1: Display Leagues in Sidebar

```tsx
"use client";

import {
  selectLeagues,
  selectSelectedLeagueId,
  selectSetSelectedLeagueId,
} from "@/infrastructure/store/selectors";

export function LeaguesSidebar() {
  const leagues = selectLeagues();
  const selectedLeagueId = selectSelectedLeagueId();
  const setSelectedLeagueId = selectSetSelectedLeagueId();

  return (
    <div>
      <h3>My Leagues</h3>
      {leagues.map((league) => (
        <button
          key={league.id}
          onClick={() => setSelectedLeagueId(league.id)}
          className={selectedLeagueId === league.id ? "active" : ""}
        >
          {league.name}
        </button>
      ))}
    </div>
  );
}
```

### Example 2: Filter Predictions by Selected League

```tsx
"use client";

import { selectSelectedLeagueId } from "@/infrastructure/store/selectors";
import { usePredictions } from "@/presentation/hooks/predictions/use-predictions";

export function PredictionsPage() {
  const selectedLeagueId = selectSelectedLeagueId();
  const { predictions, isLoading } = usePredictions(selectedLeagueId);

  if (!selectedLeagueId) {
    return <div>Please select a league</div>;
  }

  if (isLoading) return <Spinner />;

  return (
    <div>
      <h1>Predictions</h1>
      {predictions.map((prediction) => (
        <PredictionCard key={prediction.id} prediction={prediction} />
      ))}
    </div>
  );
}
```

### Example 3: Sync Leagues in App Layout

```tsx
"use client";

import { useSyncLeagues } from "@/presentation/hooks/leagues/use-sync-leagues";

export function AuthenticatedLayout({ children }) {
  // Auto-syncs leagues on mount, smart refresh every 5 minutes
  const { isLoading, error } = useSyncLeagues();

  if (error) {
    console.error("Failed to sync leagues:", error);
  }

  return (
    <div>
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
```

### Example 4: Add New League and Auto-Select

```tsx
"use client";

import { useCreateLeagueClient } from "@/presentation/hooks/leagues/use-create-league-client";
import { selectAddLeague } from "@/infrastructure/store/selectors";

export function CreateLeagueForm() {
  const { createLeague, isCreating, error } = useCreateLeagueClient();
  const addLeague = selectAddLeague();

  const handleSubmit = async (data) => {
    const newLeague = await createLeague(data);

    if (newLeague) {
      // Add to store (auto-selects if first league)
      addLeague(newLeague);

      // Navigate to dashboard
      router.push("/dashboard");
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Example 5: Manual Refresh Leagues

```tsx
"use client";

import { useSyncLeagues } from "@/presentation/hooks/leagues/use-sync-leagues";

export function RefreshLeaguesButton() {
  const { refresh, isLoading } = useSyncLeagues({ autoFetch: false });

  return (
    <button onClick={refresh} disabled={isLoading}>
      {isLoading ? "Refreshing..." : "Refresh Leagues"}
    </button>
  );
}
```

---

## ✅ Best Practices

### 1. Use Selectors for Store Access

❌ **Bad:**

```typescript
const leagues = useLeagueStore((state) => state.leagues);
```

✅ **Good:**

```typescript
import { selectLeagues } from "@/infrastructure/store/selectors";
const leagues = selectLeagues();
```

**Why:** Selectors prevent unnecessary re-renders and provide a consistent API.

### 2. Check Selected League Before Rendering

❌ **Bad:**

```typescript
function PredictionsPage() {
  const selectedLeagueId = selectSelectedLeagueId();
  // Assume league is selected, might crash
  const predictions = usePredictions(selectedLeagueId);
  return <PredictionList predictions={predictions} />;
}
```

✅ **Good:**

```typescript
function PredictionsPage() {
  const selectedLeagueId = selectSelectedLeagueId();

  if (!selectedLeagueId) {
    return <SelectLeaguePrompt />;
  }

  const predictions = usePredictions(selectedLeagueId);
  return <PredictionList predictions={predictions} />;
}
```

### 3. Use useSyncLeagues in App Shell

Place `useSyncLeagues` in your main authenticated layout:

```typescript
// app/(app)/layout.tsx
"use client";

export default function AppLayout({ children }) {
  useSyncLeagues(); // Auto-syncs leagues on mount

  return (
    <>
      <Sidebar />
      <main>{children}</main>
    </>
  );
}
```

**Why:** Ensures leagues are always fresh when user navigates the app.

### 4. Don't Fetch Leagues Manually in Login

❌ **Bad:**

```typescript
// In login page component
const handleLogin = async () => {
  await login(email, password);
  await fetchMyLeagues(); // ❌ Unnecessary, useLogin already does this
};
```

✅ **Good:**

```typescript
// In login page component
const handleLogin = async () => {
  await login(email, password);
  // ✅ Leagues are automatically fetched by useLogin hook
  router.push("/dashboard");
};
```

### 5. Clear Leagues on Logout

The `useLogout` hook automatically clears leagues. Don't manually clear:

❌ **Bad:**

```typescript
const handleLogout = async () => {
  clearLeagues(); // ❌ Manual clearing
  await logout();
};
```

✅ **Good:**

```typescript
const handleLogout = async () => {
  await logout(); // ✅ useLogout handles everything
};
```

---

## 🔧 Smart Features

### Auto-Selection

When leagues are loaded, the first league is automatically selected if none is selected.

### Smart Refresh

The store tracks `lastFetchedAt` and only refetches if data is older than 5 minutes.

### Persistence

Leagues are persisted in localStorage so the user's selection survives page reloads.

### Error Resilience

If league fetch fails during login, the login still succeeds (auth is more important).

### Memory Efficiency

Only the loading state is not persisted, keeping localStorage lean.

---

## 🎯 Summary

**Data Sources:**

- **Backend**: `GET /leagues/my` - Source of truth
- **Zustand**: Client-side cache with persistence
- **LocalStorage**: Automatic persistence by Zustand

**Key Hooks:**

- `useLogin()` - Handles login + auto-fetch leagues
- `useSyncLeagues()` - Smart league synchronization
- `useLogout()` - Clears auth + leagues

**Key Stores:**

- `authStore` - User authentication state
- `leagueStore` - User leagues + selected league

**Key Selectors:**

- `selectLeagues()` - Get all leagues
- `selectSelectedLeagueId()` - Get selected league ID
- `selectSelectedLeague()` - Get selected league object

This architecture provides a robust, scalable, and user-friendly league management system! 🚀
