# Dependency Injection (DI) Architecture

Este directorio contiene la implementación de Inyección de Dependencias para Next.js 15, optimizada para **Server Components** (preferido) con soporte opcional para **Client Components**.

## Filosofía: Server-First

🎯 **Regla de oro:** Usa Server Components con factories por defecto. Solo usa Client DI cuando realmente necesites interactividad.

## Estructura

```
di/
├── server/                 # DI para Server Components (PREFERIDO ✅)
│   └── factories/          # Factory functions para instanciación directa
├── client/                 # DI para Client Components (Solo si necesario ⚠️)
│   ├── context/            # React Context
│   ├── providers/          # Provider + Container + Modules
│   └── hooks/              # Hooks para acceder a dependencias
└── shared/                 # Tipos compartidos
    └── types.ts            # Interface de Dependencies (solo Client)
```

## Dos Estrategias de DI

### 1. Server Components (Preferido) ✅

**Cuándo usar:**
- ✅ Páginas que hacen fetch de datos (mayoría de casos)
- ✅ Componentes que renderizan data estática
- ✅ Componentes que no necesitan interactividad
- ✅ Cuando quieres optimizar el bundle del cliente

**Ejemplo real (Stadiums):**

```tsx
// app/(app)/stadiums/page.tsx
import { httpClient } from "@/infrastructure/http/client";
import { createStadiumRepository } from "@/di/server/factories/create-stadium-repository";
import { createGetAllStadiumsUseCase } from "@/di/server/factories/create-stadium-use-cases";

export default async function StadiumsPage() {
  // Instanciación directa sin Context - Simple y performante
  const repository = createStadiumRepository(httpClient);
  const getAllStadiums = createGetAllStadiumsUseCase(repository);

  const stadiums = await getAllStadiums.execute();

  return <StadiumList stadiums={stadiums} />;
}
```

**Ventajas:**
- ✅ Más performante (0 KB extra de JS al cliente)
- ✅ Sin overhead de Context/Provider
- ✅ Tree-shaking automático
- ✅ Código más simple y directo
- ✅ Fetch de datos en servidor (más rápido)

### 2. Client Components (Solo cuando sea necesario) ⚠️

**Cuándo usar:**
- ⚡ Formularios interactivos (login, crear prediction, etc.)
- ⚡ Componentes con useState/useEffect
- ⚡ Event handlers (onClick, onChange, etc.)
- ⚡ Real-time updates (WebSockets, polling)

**Cuándo NO usar:**
- ❌ Solo para mostrar data (usa Server Component)
- ❌ Páginas estáticas
- ❌ Listas de items sin interacción

**Ejemplo (hipotético - aún no implementado):**

```tsx
// presentation/components/auth/login-form.tsx
"use client";

import { useState } from "react";
import { useLoginUseCase } from "@/di/client/hooks/use-auth-dependencies";

export function LoginForm() {
  const login = useLoginUseCase(); // Desde Context
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    await login.execute({ email, password });
  };

  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
}
```

**Setup requerido (solo si tienes Client Components):**

```tsx
// app/layout.tsx
import { DependencyProvider } from "@/di/client/providers/dependency-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <DependencyProvider>
          {children}
        </DependencyProvider>
      </body>
    </html>
  );
}
```

## Añadir una nueva Feature

### Para Server Components (caso más común) ✅

**Paso 1:** Crear entidad, repository y use case (sigue CLAUDE.md)

**Paso 2:** Crear factories en `di/server/factories/`

```typescript
// di/server/factories/create-match-repository.ts
export function createMatchRepository(httpClient: HttpClient) {
  return new MatchRepositoryImpl(httpClient);
}

// di/server/factories/create-match-use-cases.ts
export function createGetMatchesUseCase(repo: MatchRepository) {
  return new GetMatchesUseCase(repo);
}
```

**Paso 3:** Usar en Server Component

```tsx
// app/(app)/matches/page.tsx
import { httpClient } from "@/infrastructure/http/client";
import { createMatchRepository, createGetMatchesUseCase } from "@/di";

export default async function MatchesPage() {
  const repo = createMatchRepository(httpClient);
  const getMatches = createGetMatchesUseCase(repo);
  const matches = await getMatches.execute();

  return <MatchList matches={matches} />;
}
```

✅ **LISTO!** No necesitas más pasos para Server Components.

---

### Para Client Components (solo si necesario) ⚠️

**IMPORTANTE:** Solo haz esto si necesitas interactividad (formularios, real-time, etc.)

**Paso 1-2:** Igual que arriba (entidad, repository, use case, factories)

**Paso 3:** Actualizar `di/shared/types.ts`

```typescript
export interface Dependencies {
  httpClient: HttpClient;

  // Add new repository
  matchRepository: MatchRepository;

  // Add new use cases
  getMatchesUseCase: GetMatchesUseCase;
}
```

**Paso 4:** Crear módulo en `di/client/providers/modules/`

```typescript
// di/client/providers/modules/match-use-case-module.ts
export class MatchUseCaseModule implements DependencyModule {
  constructor(private deps: { matchRepository: MatchRepository }) {}

  register() {
    return {
      getMatchesUseCase: new GetMatchesUseCase(this.deps.matchRepository),
    };
  }
}
```

**Paso 5:** Registrar en `di/client/providers/repository-module.ts`

```typescript
export class RepositoryModule implements DependencyModule {
  register() {
    const matchRepository = new MatchRepositoryImpl(this.deps.httpClient);

    return {
      matchRepository,
    };
  }
}
```

**Paso 6:** Registrar en `di/client/providers/dependency-provider.tsx`

```typescript
const { matchRepository } = container.getDependencies();
container.registerModule(new MatchUseCaseModule({ matchRepository }));
```

**Paso 7:** Crear hooks en `di/client/hooks/`

```typescript
// di/client/hooks/use-match-dependencies.ts
export function useGetMatchesUseCase() {
  const { getMatchesUseCase } = useDependencies();
  return getMatchesUseCase;
}
```

**Paso 8:** Usar en Client Component

```tsx
// presentation/components/matches/live-match-tracker.tsx
"use client";

import { useGetMatchesUseCase } from "@/di";

export function LiveMatchTracker() {
  const getMatches = useGetMatchesUseCase();
  // ... usar con useState, useEffect, etc.
}
```

## Decisión: ¿Server o Client?

| Caso de uso | Tipo | Justificación |
|-------------|------|---------------|
| Mostrar lista de estadios | ✅ Server | Solo muestra data |
| Mostrar partidos | ✅ Server | Solo muestra data |
| Formulario de login | ⚡ Client | Interacción usuario |
| Crear predicción | ⚡ Client | Formulario interactivo |
| Score en vivo | ⚡ Client | Updates en tiempo real |
| Mostrar predicciones | ✅ Server | Solo muestra data |

## Mejores Prácticas

1. ✅ **Server-First**: Por defecto usa Server Components con factories
2. ✅ **YAGNI**: No crees Client DI hasta que realmente lo necesites
3. ✅ **Un módulo por dominio**: Agrupa use cases relacionados
4. ✅ **Type-safe**: Usa TypeScript en todas las capas
5. ⚠️ **Client mínimo**: Minimiza JavaScript en el cliente

## Filosofía

- 🎯 **Server-First**: 90% de los casos usa Server Components
- 🏗️ **Clean Architecture**: Respeta la separación de capas
- ⚡ **Performance**: Bundle del cliente lo más pequeño posible
- 🔧 **DX**: API simple y predecible
