# CLAUDE.md

Guía completa para Claude Code al trabajar en este repositorio.

---

## 📝 Descripción del Proyecto

**Porraza** es una plataforma de predicciones deportivas para el Mundial de Fútbol 2026. Los usuarios pueden:

- Crear predicciones de partidos del Mundial
- Unirse o crear ligas públicas/privadas para competir con amigos
- Ver calendarios de partidos, estadios y equipos
- Competir en leaderboards dentro de sus ligas
- Acceso premium mediante pago único de €1.99

**Modelo de negocio:** Freemium con verificación de email + pago único (€1.99) para acceso completo.

**Stack tecnológico:**

- Frontend: Next.js 15 (App Router), React 19, TypeScript
- Estilos: Tailwind CSS v4, shadcn/ui (New York style)
- Estado global: Zustand con persistencia en localStorage
- Autenticación: Cookies HTTP-only + JWT
- Pagos: Stripe (Embedded Checkout)
- Arquitectura: Clean Architecture
- Fuentes: Poppins (sans), Teko (display)

---

## 🚀 Comandos de Desarrollo

```bash
# Instalar dependencias
pnpm install

# Desarrollo con Turbopack
pnpm dev

# Build de producción
pnpm build

# Servidor de producción
pnpm start

# Linter
pnpm lint
```

El servidor de desarrollo corre en http://localhost:3000 por defecto.

---

## 🌍 Variables de Entorno

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## 📁 Arquitectura Clean Architecture

### Estructura del Proyecto

```
porraza-frontend/
├── domain/              # Lógica de negocio pura (TypeScript)
│   ├── entities/        # Entidades (User, Match, League, Stadium, Team, etc.)
│   ├── repositories/    # Interfaces de repositories
│   └── use-cases/       # Casos de uso (business logic)
├── infrastructure/      # Implementaciones externas
│   ├── http/            # HTTP client (fetch wrapper)
│   ├── mappers/         # Transformación DTO ↔ Entity
│   ├── repositories/    # Implementaciones de repositories
│   └── store/           # Zustand stores (auth, leagues)
├── presentation/        # Capa de presentación
│   ├── components/      # Componentes React
│   │   ├── ui/          # shadcn/ui components
│   │   ├── auth/        # Componentes de autenticación
│   │   ├── leagues/     # Componentes de ligas
│   │   ├── schedule/    # Calendarios de partidos
│   │   ├── stadiums/    # Información de estadios
│   │   └── payments/    # Flujo de pago
│   ├── hooks/           # Custom hooks (useLogin, useStadiums, etc.)
│   └── schemas/         # Validación Zod para formularios
├── di/                  # Dependency Injection
│   ├── client/          # DI para Client Components (Context + Providers)
│   └── shared/          # Tipos compartidos
├── app/                 # Next.js 15 App Router
│   ├── (landing)/       # Páginas públicas
│   ├── (auth)/          # Login, signup, verify-email
│   ├── (app)/           # Páginas protegidas (dashboard, leagues, etc.)
│   └── layout.tsx       # Layout raíz con DependencyProvider
├── middleware.ts        # Protección de rutas
└── public/              # Assets estáticos (logos, estadios, equipos)
```

### Reglas de Dependencias

| Capa               | Puede importar de      | NO puede importar de                  |
| ------------------ | ---------------------- | ------------------------------------- |
| **Domain**         | Nada (TypeScript puro) | infrastructure, presentation, di, app |
| **Infrastructure** | domain                 | presentation, di, app                 |
| **Presentation**   | domain, infrastructure | di (usa indirectamente), app          |
| **DI**             | Todas las capas        | —                                     |
| **App**            | Todas las capas        | —                                     |

---

## 🔐 Autenticación y Seguridad

### Sistema de Autenticación

- **Método:** JWT almacenado en **cookies HTTP-only** (seguro, automático)
- **Estrategia dual:**
  1. **Cookies HTTP-only** (principal): Enviadas automáticamente, no accesibles desde JS
  2. **Zustand store** (backup): Para Client Components y Authorization header

### Flujo de Autenticación

```
Signup → Verify Email → Login → Checkout (si no pagó) → Dashboard
```

**Detalles:**

1. Usuario se registra con email/password
2. Backend envía email de verificación
3. Usuario verifica email y hace login
4. Si `user.hasPaid === false` → Redirige a `/checkout`
5. Si `user.hasPaid === true` → Redirige a `/dashboard`

### Almacenamiento Seguro

| Token        | Cookie (HTTP-only) | Zustand (memoria) | localStorage | Uso                    |
| ------------ | ------------------ | ----------------- | ------------ | ---------------------- |
| accessToken  | ✅ (15 min)        | ✅ (backup)       | ❌           | Autenticación API      |
| refreshToken | ✅ (7 días)        | ❌                | ✅ (backup)  | Renovar access token   |
| user         | ❌                 | ✅                | ✅           | Información de usuario |

**Refresh automático:**

- El `httpClient` detecta tokens expirados (401) y refresca automáticamente
- Doble capa: prevención (antes del request) + recuperación (al recibir 401)

**Documentación detallada:** Ver [AUTHENTICATION_FLOW.md](./AUTHENTICATION_FLOW.md)

---

## 💳 Sistema de Pagos

### Integración con Stripe

- **Producto:** Pago único de €1.99 para acceso premium
- **Método:** Stripe Embedded Checkout
- **Webhooks:** Backend actualiza `users.has_paid = true` al confirmar pago

### Flujo de Pago

```
Login → hasPaid check → Checkout (/checkout)
         ↓ false             ↓
         ↓              Stripe Embedded Form
         ↓                   ↓
         ↓              Payment Success
         ↓                   ↓
      Dashboard ← Success Page (/checkout/success)
```

**Protección de contenido premium:**

```tsx
import { PaymentRequiredGuard } from "@/presentation/components/payments/payment-required-guard";

export default function PredictionsPage() {
  return (
    <PaymentRequiredGuard>
      <PremiumContent />
    </PaymentRequiredGuard>
  );
}
```

**Documentación detallada:** Ver [PAYMENT_FLOW.md](./PAYMENT_FLOW.md)

---

## 🏆 Sistema de Ligas

### Gestión de Estado

**Zustand stores separados:**

1. `authStore` - Autenticación (user, tokens)
2. `leagueStore` - Ligas (leagues, selectedLeagueId)

**¿Por qué frontend-managed?**

- ✅ Separation of concerns (login ≠ leagues)
- ✅ Caching inteligente (refresh cada 5 minutos)
- ✅ Mejor UX (actualizar leagues sin re-login)

### Flujo de Ligas

```
Login exitoso
    ↓
getMyLeaguesUseCase.execute() (automático)
    ↓
leagueStore.setLeagues(leagues)
    ↓
Auto-selecciona primera liga
    ↓
Componentes leen de selectSelectedLeagueId()
```

**Selectores optimizados:**

```typescript
import {
  selectLeagues,
  selectSelectedLeagueId,
  selectSelectedLeague,
} from "@/infrastructure/store/selectors";

const leagues = selectLeagues();
const selectedId = selectSelectedLeagueId();
const selected = selectSelectedLeague();
```

**Documentación detallada:** Ver [LEAGUE_MANAGEMENT.md](./LEAGUE_MANAGEMENT.md)

---

## 🎨 Componentes UI

### shadcn/ui Configuration

- **Estilo:** New York
- **Path alias:** `@/` → raíz del proyecto
- **Librería de iconos:** lucide-react
- **Animaciones:** motion (Framer Motion v12)

### Componentes Principales

**Layout y navegación:**

- `Sidebar` - Navegación con colapso/expandir
- `SidebarProvider` - Context del sidebar
- `AppSidebar` - Sidebar de la aplicación con ligas

**Formularios (IMPORTANTE):**

- `Field`, `FieldLabel`, `FieldDescription`, `FieldError` - Sistema composable de forms
- `Input`, `Textarea`, `Checkbox` - Inputs básicos
- Siempre usar **react-hook-form** + **Zod** para validación

**UI general:**

- `Button`, `Badge`, `Avatar`
- `Card`, `CardHeader`, `CardContent`, `CardFooter`
- `Dialog`, `Tabs`, `Tooltip`, `Separator`
- `Table`, `TableHeader`, `TableBody`, `TableRow`
- `Sonner` - Toast notifications

### Sistema de Formularios (Patrón Estándar)

**1. Crear schema Zod:**

```typescript
// presentation/schemas/login-schema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
```

**2. Usar Field components:**

```tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldLabel,
  FieldError,
} from "@/presentation/components/ui/field";
import { Input } from "@/presentation/components/ui/input";
import { Button } from "@/presentation/components/ui/button";

export function LoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Field data-invalid={!!form.formState.errors.email}>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" type="email" {...form.register("email")} />
        <FieldError errors={[form.formState.errors.email]} />
      </Field>

      <Button type="submit">Iniciar sesión</Button>
    </form>
  );
}
```

---

## 🏗️ Patrones de Implementación

### Server Components vs Client Components

**Server Components (Preferido):**

```tsx
// app/(app)/stadiums/page.tsx
import { httpClient } from "@/infrastructure/http/client";
import { createStadiumRepository } from "@/infrastructure/repositories/stadium-repository-impl";
import { GetAllStadiumsUseCase } from "@/domain/use-cases/stadiums/get-all-stadiums-use-case";

export default async function StadiumsPage() {
  // Instanciación directa - Sin Context, sin hooks
  const repository = new createStadiumRepository(httpClient);
  const useCase = new GetAllStadiumsUseCase(repository);
  const stadiums = await useCase.execute();

  return <StadiumList stadiums={stadiums} />;
}
```

**Client Components (Solo cuando necesario):**

```tsx
"use client";
import { useState } from "react";
import { useLogin } from "@/presentation/hooks/auth/use-login";

export function LoginForm() {
  const { login, isLoading, error } = useLogin();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

**¿Cuándo usar cada uno?**

| Escenario                | Tipo      |
| ------------------------ | --------- |
| Mostrar lista de datos   | ✅ Server |
| Formularios interactivos | ⚡ Client |
| Páginas estáticas        | ✅ Server |
| Real-time updates        | ⚡ Client |
| Calendario de partidos   | ✅ Server |
| Crear predicción         | ⚡ Client |

### Manejo de Estado

**❌ NO usar Zustand para:**

- Datos de API (usar custom hooks con useState)
- Estado de formularios (usar react-hook-form)
- Estado derivado de URL (usar searchParams)

**✅ SÍ usar Zustand para:**

- Estado de autenticación global
- Ligas y selección de liga
- Preferencias de usuario (tema, idioma)

---

## 🔧 HTTP Client y Manejo de Errores

### HTTP Client

```typescript
import { httpClient } from "@/infrastructure/http/client";

// GET request
const { data } = await httpClient.get<Stadium[]>("/stadiums");

// POST request
const { data } = await httpClient.post("/auth/login", { email, password });
```

**Características:**

- ✅ Interceptor automático de tokens (añade Authorization header)
- ✅ Refresh automático de tokens al recibir 401
- ✅ credentials: 'include' para enviar cookies
- ✅ Timeout configurable (30s por defecto)
- ✅ Type-safe con generics TypeScript

### Mappers (DTO ↔ Entity)

```typescript
// infrastructure/mappers/stadium-mapper.ts
export class StadiumMapper {
  static toDomain(dto: StadiumDTO): Stadium {
    return {
      id: dto.id,
      name: dto.name,
      createdAt: new Date(dto.createdAt), // string → Date
    };
  }

  static toDTO(domain: Stadium): StadiumDTO {
    return {
      id: domain.id,
      name: domain.name,
      createdAt: domain.createdAt.toISOString(), // Date → string
    };
  }
}
```

---

## 🛡️ Middleware y Rutas Protegidas

```typescript
// middleware.ts
const protectedRoutes = [
  "/dashboard",
  "/predictions",
  "/schedule",
  "/leagues",
  "/leaderboard",
  "/rules",
  "/settings",
];
```

**Comportamiento:**

- Usuario NO autenticado en ruta protegida → Redirige a `/login?from={ruta}`
- Usuario autenticado en `/login` o `/signup` → Redirige a `/dashboard`

**Añadir nueva ruta protegida:**

```typescript
const protectedRoutes = [
  // ... existing routes
  "/mi-nueva-ruta",
];
```

---

## 📂 Organización de Código

### Reglas Importantes

**❌ NO crear archivos index.ts barrel exports:**

```typescript
// ❌ MAL: components/schedule/index.ts
export { MatchCard } from "./match-card";
```

**✅ Importaciones directas:**

```typescript
// ✅ BIEN
import { MatchCard } from "@/presentation/components/schedule/match-card";
```

**Naming conventions:**

- Archivos: `kebab-case.tsx` (ej: `match-card.tsx`)
- Componentes: `PascalCase` (ej: `MatchCard`)
- Hooks: `camelCase` con prefijo `use` (ej: `useLogin`)
- Use cases: `PascalCase` con sufijo `UseCase` (ej: `LoginUseCase`)

---

## 🎯 Flujo de Desarrollo - Añadir Feature

**Ejemplo: Sistema de predicciones**

### 1. Domain Layer

```typescript
// domain/entities/prediction.ts
export interface Prediction {
  id: string;
  userId: string;
  matchId: string;
  homeScore: number;
  awayScore: number;
  points: number;
}

// domain/repositories/prediction-repository.ts
export interface PredictionRepository {
  create(data: Omit<Prediction, "id">): Promise<Prediction>;
  findByUser(userId: string): Promise<Prediction[]>;
}

// domain/use-cases/predictions/create-prediction-use-case.ts
export class CreatePredictionUseCase {
  constructor(private repo: PredictionRepository) {}

  async execute(params: CreatePredictionParams): Promise<Prediction> {
    // Validación de negocio aquí
    return await this.repo.create(params);
  }
}
```

### 2. Infrastructure Layer

```typescript
// infrastructure/http/dtos/prediction-dto.ts
export interface PredictionDTO {
  id: string;
  user_id: string;
  match_id: string;
  home_score: number;
  away_score: number;
  points: number;
}

// infrastructure/mappers/prediction-mapper.ts
export class PredictionMapper {
  static toDomain(dto: PredictionDTO): Prediction {
    return {
      id: dto.id,
      userId: dto.user_id,
      matchId: dto.match_id,
      homeScore: dto.home_score,
      awayScore: dto.away_score,
      points: dto.points,
    };
  }
}

// infrastructure/repositories/prediction-repository-impl.ts
export class PredictionRepositoryImpl implements PredictionRepository {
  constructor(private httpClient: HttpClient) {}

  async create(data: Omit<Prediction, "id">): Promise<Prediction> {
    const dto = PredictionMapper.toDTO(data);
    const response = await this.httpClient.post<PredictionDTO>(
      "/predictions",
      dto
    );
    return PredictionMapper.toDomain(response.data);
  }
}
```

### 3. Presentation Layer

```typescript
// presentation/schemas/prediction-schema.ts
import { z } from "zod";

export const predictionSchema = z.object({
  matchId: z.string(),
  homeScore: z.number().int().min(0),
  awayScore: z.number().int().min(0),
});

// presentation/hooks/predictions/use-create-prediction.ts
("use client");
import { useState } from "react";
import { useCreatePredictionUseCase } from "@/di/client/hooks/use-prediction-dependencies";

export function useCreatePrediction() {
  const createUseCase = useCreatePredictionUseCase();
  const [loading, setLoading] = useState(false);

  const create = async (data) => {
    setLoading(true);
    try {
      return await createUseCase.execute(data);
    } finally {
      setLoading(false);
    }
  };

  return { create, loading };
}

// presentation/components/predictions/prediction-form.tsx
("use client");
import { useForm } from "react-hook-form";
import { useCreatePrediction } from "@/presentation/hooks/predictions/use-create-prediction";

export function PredictionForm({ matchId }: { matchId: string }) {
  const { create, loading } = useCreatePrediction();
  const form = useForm({ resolver: zodResolver(predictionSchema) });

  const onSubmit = async (data) => {
    await create(data);
  };

  return <form onSubmit={form.handleSubmit(onSubmit)}>...</form>;
}
```

### 4. App Layer (Page)

```tsx
// app/(app)/predictions/page.tsx
"use client";

import { PredictionForm } from "@/presentation/components/predictions/prediction-form";

export default function PredictionsPage() {
  return (
    <div>
      <h1>Crear Predicción</h1>
      <PredictionForm matchId="match-123" />
    </div>
  );
}
```

---

## 📚 Documentación Adicional

### Documentos de Referencia

| Archivo                                                        | Contenido                                     |
| -------------------------------------------------------------- | --------------------------------------------- |
| [AUTHENTICATION_FLOW.md](./AUTHENTICATION_FLOW.md)             | Flujo completo de autenticación con diagramas |
| [PAYMENT_FLOW.md](./PAYMENT_FLOW.md)                           | Integración de Stripe y flujo de checkout     |
| [LEAGUE_MANAGEMENT.md](./LEAGUE_MANAGEMENT.md)                 | Sistema de ligas y gestión de estado          |
| [ROUTING.md](./ROUTING.md)                                     | Route Groups y protección de rutas            |
| [STRIPE_CUSTOMIZATION.md](./STRIPE_CUSTOMIZATION.md)           | Personalización de Stripe Checkout            |
| [di/README.md](./di/README.md)                                 | Dependency Injection (Server vs Client)       |
| [infrastructure/README.md](./infrastructure/README.md)         | HTTP Client, DTOs, Mappers, Repositories      |
| [presentation/hooks/README.md](./presentation/hooks/README.md) | Custom hooks patterns                         |

---

## 🚨 Reglas Críticas

### Domain Layer

- ✅ **Solo TypeScript puro** - No React, No Next.js, No librerías externas
- ❌ **Nunca importar** de infrastructure, presentation, di, app

### Infrastructure Layer

- ✅ Puede importar de `domain`
- ❌ No puede importar de `presentation`, `di`, `app`
- ✅ Usa mappers para transformar DTOs ↔ Entities

### Presentation Layer

- ✅ Puede importar de `domain` e `infrastructure`
- ✅ Siempre usar `Field` components para formularios
- ✅ Validación con Zod + react-hook-form
- ❌ No llamar API directamente (usar use cases)

### Autenticación

- ✅ **Client Components** para endpoints autenticados (cookies funcionan)
- ✅ **Server Components** solo para endpoints públicos
- ❌ No guardar accessToken en localStorage (usar memoria)
- ✅ Confiar en refresh automático del httpClient

### State Management

- ✅ Zustand solo para auth y leagues
- ✅ Custom hooks con useState para datos de API
- ✅ react-hook-form para formularios
- ❌ No usar Zustand para todo

---

## 🎯 Mejores Prácticas

### Código Limpio

1. **Un archivo, una responsabilidad**
2. **Nombres descriptivos** - `getUserById` en lugar de `get`
3. **Tipado fuerte** - Evitar `any`, usar interfaces
4. **Error handling** - Siempre try/catch en async functions
5. **Logging** - Console.log con prefijo `[ComponentName]`

### Performance

1. **Server Components por defecto** - Client solo cuando necesario
2. **Selectores Zustand optimizados** - Evitar re-renders innecesarios
3. **Lazy loading** - Componentes pesados con dynamic import
4. **Memoización** - useMemo para cálculos costosos

### Seguridad

1. **HTTP-only cookies** para tokens
2. **Validación en backend** - Frontend solo UX
3. **Sanitización de inputs** - Zod schemas
4. **HTTPS en producción** - Configurar secure cookies

### Testing (Futuro)

- Unit tests para use cases
- Integration tests para repositories
- Component tests con React Testing Library
- E2E tests con Playwright

---

## 🔍 Debugging

### Ver estado de autenticación

```javascript
// Consola del navegador
document.cookie; // Ver cookies
JSON.parse(localStorage.getItem("porraza-auth")); // Zustand auth
JSON.parse(localStorage.getItem("porraza-leagues")); // Zustand leagues
```

### Ver headers de requests

```
DevTools → Network → Request → Headers

Request Headers:
  Cookie: accessToken=...; refreshToken=...
  Authorization: Bearer ... (solo Client Components)
```

### Common issues

- **401 Unauthorized:** Token expirado → Refresh automático debería funcionar
- **CORS errors:** Verificar `credentials: 'include'` en httpClient
- **Hydration errors:** Usar `suppressHydrationWarning` en `<html>`
- **League no seleccionada:** Verificar que `setLeagues` fue llamado

---

## ✅ Checklist de Calidad

Antes de commit:

- [ ] Código sigue Clean Architecture
- [ ] No hay `any` types
- [ ] Formularios usan Field components + Zod
- [ ] Client Components solo cuando necesario
- [ ] Error handling implementado
- [ ] No hay imports circulares
- [ ] No hay archivos index.ts barrel
- [ ] Console.logs tienen prefijo descriptivo
- [ ] Naming conventions seguidas

---

**Última actualización:** 2025-01-25

**Versión:** 1.0.0

**Estado:** ✅ Producción (funcional con autenticación, pagos y ligas)
