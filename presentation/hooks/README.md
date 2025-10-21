# Presentation Layer - Custom Hooks

Esta carpeta contiene los **custom hooks** que encapsulan la lógica de negocio para ser usados en componentes de React.

## Filosofía

Los custom hooks en la capa de presentación actúan como **orquestadores** entre los componentes (UI) y los use cases (domain).

## Dos tipos de hooks según el componente

### 1. Server Component Hooks (async functions) ✅

**Características:**
- Son funciones `async` normales (no React hooks)
- No usan `useState`, `useEffect`, o Context
- Retornan Promises
- Se ejecutan en el servidor

**Patrón:**

```typescript
// presentation/hooks/feature/use-feature.ts
import type { Feature } from "@/domain/entities/feature";
import { httpClient } from "@/infrastructure/http/client";
import { createFeatureRepository } from "@/di/server/factories/create-feature-repository";
import { createGetFeatureUseCase } from "@/di/server/factories/create-feature-use-cases";

interface UseFeatureResult {
  features: Feature[] | null;
  error: string | null;
}

export async function useFeatures(): Promise<UseFeatureResult> {
  try {
    // Setup DI
    const repository = createFeatureRepository(httpClient);
    const getFeatures = createGetFeatureUseCase(repository);

    // Execute use case
    const features = await getFeatures.execute();

    console.log('[useFeatures] Fetched:', features);

    return { features, error: null };
  } catch (err) {
    const error = err instanceof Error ? err.message : "Failed to fetch";
    console.error("[useFeatures] Error:", err);
    return { features: null, error };
  }
}
```

**Uso:**

```tsx
// app/(app)/features/page.tsx
import { useFeatures } from "@/presentation/hooks/features";

export default async function FeaturesPage() {
  const { features, error } = await useFeatures();

  if (error) return <ErrorCard message={error} />;
  return <FeatureList features={features} />;
}
```

### 2. Client Component Hooks (React hooks) ⚡

**Características:**
- Son React hooks reales (`use` prefix)
- Usan `useState`, `useEffect`, Context, etc.
- Acceden a DI via Context
- Se ejecutan en el cliente

**Patrón:**

```typescript
// presentation/hooks/auth/use-login.ts
"use client";

import { useState } from "react";
import { useLoginUseCase } from "@/di/client/hooks/use-auth-dependencies";

interface UseLoginResult {
  login: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useLogin(): UseLoginResult {
  const loginUseCase = useLoginUseCase(); // From DI Context
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      await loginUseCase.execute({ email, password });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
```

**Uso:**

```tsx
// presentation/components/auth/login-form.tsx
"use client";

import { useLogin } from "@/presentation/hooks/auth/use-login";

export function LoginForm() {
  const { login, loading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
}
```

## Estructura de carpetas

```
presentation/hooks/
├── README.md                   # Este archivo
├── stadiums/
│   ├── index.ts                # Exports
│   └── use-stadiums.ts         # Server hook
├── matches/
│   ├── index.ts
│   ├── use-matches.ts          # Server hook
│   └── use-live-match.ts       # Client hook (si necesario)
└── auth/
    ├── index.ts
    └── use-login.ts            # Client hook
```

## Responsabilidades de los custom hooks

### ✅ SÍ deben:
1. **Encapsular DI** - Setup de repository y use case
2. **Ejecutar use cases** - Llamar a `useCase.execute()`
3. **Manejar errores** - Try/catch y retornar en formato consistente
4. **Loguear** - Console.log para debugging
5. **Proveer loading states** - Para Client Components
6. **Retornar formato consistente** - `{ data, error, loading }`

### ❌ NO deben:
1. **Lógica de negocio** - Eso va en use cases
2. **Llamadas HTTP directas** - Eso va en repositories
3. **Transformación de datos** - Eso va en mappers
4. **Validación de negocio** - Eso va en use cases
5. **Renderizado** - Eso va en componentes

## Naming conventions

### Server Component Hooks:
- Archivo: `use-entity-name.ts` (singular o plural según caso)
- Función: `useEntity()` o `useEntities()`
- Retorno: `UseEntityResult` interface

### Client Component Hooks:
- Archivo: `use-action-name.ts`
- Función: `useActionName()`
- Retorno: `UseActionNameResult` interface
- Siempre con `"use client"` directive

## Ejemplos del proyecto actual

### Server Hook (Stadiums) ✅

```typescript
// presentation/hooks/stadiums/use-stadiums.ts
export async function useStadiums(): Promise<UseStadiumsResult> {
  try {
    const repository = createStadiumRepository(httpClient);
    const getAllStadiums = createGetAllStadiumsUseCase(repository);
    const stadiums = await getAllStadiums.execute();

    console.log('[useStadiums] Fetched stadiums:', stadiums);

    return { stadiums, error: null };
  } catch (err) {
    return { stadiums: null, error: err.message };
  }
}
```

**Flujo completo:**
```
StadiumsPage (Server Component)
    ↓
useStadiums() (Custom Hook)
    ↓
GetAllStadiumsUseCase (Domain)
    ↓
StadiumRepository (Infrastructure)
    ↓
HTTP Client → API
```

## Ventajas de este patrón

1. ✅ **Reutilización** - El hook se puede usar en múltiples componentes
2. ✅ **Testeable** - Fácil de mockear para tests
3. ✅ **Separación de responsabilidades** - UI vs Business Logic
4. ✅ **DRY** - No repetir DI en cada componente
5. ✅ **Consistencia** - Formato de retorno estandarizado
6. ✅ **Debugging** - Logs centralizados en el hook

## Mejores prácticas

1. **Un hook por use case principal** - `useStadiums`, `useMatches`, etc.
2. **Agrupa hooks relacionados** - Por feature en carpetas
3. **Retorno consistente** - Siempre `{ data, error, loading? }`
4. **Tipado fuerte** - Define interfaces para el retorno
5. **Error handling** - Siempre try/catch
6. **Logging** - Console.log para debugging (prefijo con nombre del hook)
7. **Documentación** - JSDoc con ejemplos de uso

## Cuándo crear un hook

| Escenario | ¿Crear hook? |
|-----------|--------------|
| Fetch data para mostrar | ✅ Sí (Server hook) |
| Formulario interactivo | ✅ Sí (Client hook) |
| Acción única en un componente | ❌ No (llamar directo) |
| Lógica reutilizable | ✅ Sí |
| Transformación simple de UI | ❌ No (hacer en componente) |

## Testing (Futuro)

Cuando se añadan tests:

```typescript
// __tests__/presentation/hooks/stadiums/use-stadiums.test.ts
describe('useStadiums', () => {
  it('should fetch stadiums successfully', async () => {
    const { stadiums, error } = await useStadiums();

    expect(stadiums).toBeDefined();
    expect(error).toBeNull();
  });

  it('should handle errors gracefully', async () => {
    // Mock repository to throw error
    const { stadiums, error } = await useStadiums();

    expect(stadiums).toBeNull();
    expect(error).toBeDefined();
  });
});
```
