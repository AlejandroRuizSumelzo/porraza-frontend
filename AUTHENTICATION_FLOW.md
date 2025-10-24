# 🔐 Flujo de Autenticación en Porraza

## 📋 Resumen Ejecutivo

**Método de autenticación:** Cookies HTTP-only (seguro y automático)

**Estado actual:** ✅ Funcionando correctamente

**Arquitectura:** Clean Architecture + Next.js 15 App Router

---

## 🎯 Cómo Funciona la Autenticación

### **1. Login del Usuario**

```typescript
// Usuario ingresa credenciales en presentation/components/auth/login-form.tsx
┌─────────────────────────────────────────────────────────────┐
│ LoginForm.onSubmit(email, password)                         │
│   ↓                                                          │
│ useLogin().login(email, password)                           │
│   ↓                                                          │
│ LoginUseCase.execute(email, password)                       │
│   ↓                                                          │
│ AuthRepository.login(email, password)                       │
│   ↓                                                          │
│ httpClient.post('/auth/login', { email, password })         │
│   ↓                                                          │
│ Backend valida credenciales                                 │
│   ↓                                                          │
│ Backend genera: accessToken, refreshToken                   │
│   ↓                                                          │
│ Backend envía:                                              │
│   1. JSON: { user, tokens: { accessToken, refreshToken } } │
│   2. Cookies HTTP-only:                                     │
│      - accessToken (httpOnly, sameSite: lax, 15 min)       │
│      - refreshToken (httpOnly, sameSite: lax, 7 días)      │
│   ↓                                                          │
│ Navegador guarda cookies automáticamente ✓                  │
│   ↓                                                          │
│ Frontend guarda en Zustand:                                 │
│   - user (localStorage)                                     │
│   - refreshToken (localStorage, backup)                     │
│   - accessToken (memoria, backup)                           │
└─────────────────────────────────────────────────────────────┘
```

### **2. Requests a Endpoints Protegidos**

#### **Escenario A: Server Components (Recomendado)**

```typescript
// app/(app)/schedule/page.tsx (Server Component)
export default async function SchedulePage() {
  const { calendar, error } = await getMatchCalendar();
  // ...
}

// ┌─────────────────────────────────────────────────────────────┐
// │ Flujo de la Petición:                                        │
// └─────────────────────────────────────────────────────────────┘

getMatchCalendar()
  ↓
matchRepository.getCalendar()
  ↓
httpClient.get('/matches/calendar', { credentials: 'include' })
  ↓
fetch('http://localhost:3001/matches/calendar', {
  credentials: 'include',  // ← Envía cookies automáticamente
  headers: {
    'Content-Type': 'application/json',
    // NO hay Authorization header (Server Component no tiene acceso a Zustand)
  }
})
  ↓
Navegador añade automáticamente:
  Cookie: accessToken=eyJhbG...; refreshToken=eyJhbG...
  ↓
Backend (jwt.strategy.ts) extrae token:
  1. Intenta cookies: request.cookies.accessToken ✅ ENCUENTRA
  2. NO necesita header
  ↓
Backend valida JWT y responde con datos ✓
```

**Logs esperados (Server Component):**
```javascript
[HttpClient] GET http://localhost:3001/matches/calendar {
  hasAuthHeader: false,  // ← Normal en Server Components
  authHeaderPreview: 'undefined...',
  credentials: 'include'  // ← Cookies se envían automáticamente
}
```

#### **Escenario B: Client Components (Opcional)**

```typescript
"use client";

// presentation/components/live-scores.tsx (Client Component)
export function LiveScores() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    getMatchCalendar().then(data => setMatches(data.calendar));
  }, []);

  return <MatchList matches={matches} />;
}

// ┌─────────────────────────────────────────────────────────────┐
// │ Flujo de la Petición:                                        │
// └─────────────────────────────────────────────────────────────┘

getMatchCalendar()
  ↓
httpClient.get('/matches/calendar')
  ↓
buildHeaders() ejecuta:
  getAuthStoreToken() → useAuthStore.getState().getAccessToken()
  ↓
  SI accessToken existe:
    headers.set('Authorization', `Bearer ${accessToken}`)
  ↓
fetch('http://localhost:3001/matches/calendar', {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbG...'  // ← TAMBIÉN se envía en Client Components
  }
})
  ↓
Navegador añade automáticamente:
  Cookie: accessToken=eyJhbG...; refreshToken=eyJhbG...
  ↓
Backend recibe AMBOS:
  - Cookie: accessToken (prioridad 1)
  - Authorization: Bearer (prioridad 2, fallback)
  ↓
Backend valida y responde ✓
```

**Logs esperados (Client Component):**
```javascript
[HttpClient] GET http://localhost:3001/matches/calendar {
  hasAuthHeader: true,  // ← Client Component tiene acceso a Zustand
  authHeaderPreview: 'Bearer eyJhbGciOiJIUzI1NiIsInR...',
  credentials: 'include'
}
```

---

## 🔄 Token Refresh Automático

### **¿Cuándo se Refresca el Token?**

El sistema tiene **2 capas de protección** para tokens expirados:

#### **Capa 1: Prevención (antes del request)**

```typescript
// infrastructure/http/client.ts:217-235

// Antes de CADA request (excepto /auth/*):
if (!isAuthEndpoint(url) && isTokenExpired()) {
  console.log('[HttpClient] Token expired, attempting refresh before request');

  attemptTokenRefresh()
    ↓
  Backend recibe refreshToken via cookies
    ↓
  Backend valida y genera nuevo accessToken
    ↓
  Frontend actualiza:
    - Cookie accessToken (automático del backend)
    - Zustand accessToken (updateAccessToken)
    ↓
  Request original continúa con nuevo token ✓
}
```

#### **Capa 2: Recuperación (después de recibir 401)**

```typescript
// infrastructure/http/client.ts:257-273

// Si el request falla con 401:
if (error.status === 401 && !isRetry && !isAuthEndpoint(url)) {
  console.log('[HttpClient] 401 detected, attempting token refresh');

  attemptTokenRefresh()
    ↓
  SI éxito:
    - Reintenta request con nuevo token
    - return request(method, url, body, options, isRetry = true)

  SI fallo:
    - clearAuth() → Limpia Zustand y cookies
    - throw HttpError('Sesión expirada. Por favor, inicia sesión nuevamente.')
    - Usuario redirigido a /login
}
```

---

## 🏗️ Arquitectura de Autenticación

### **Capas del Sistema**

```
┌─────────────────────────────────────────────���────────────────┐
│                       DOMAIN LAYER                            │
│  (Business Logic - Pure TypeScript)                          │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Entities:                                                    │
│  - User                                                       │
│  - AuthResponse                                               │
│  - RefreshTokenResponse                                       │
│                                                               │
│  Repositories (Interfaces):                                   │
│  - AuthRepository                                             │
│    - login(email, password): Promise<AuthResponse>           │
│    - refreshToken(token): Promise<RefreshTokenResponse>      │
│    - logout(): Promise<void>                                  │
│                                                               │
│  Use Cases:                                                   │
│  - LoginUseCase                                               │
│  - RefreshTokenUseCase                                        │
│  - LogoutUseCase                                              │
│                                                               │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│                   INFRASTRUCTURE LAYER                        │
│  (External Concerns - HTTP, Storage, APIs)                   │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  HTTP Client:                                                 │
│  - httpClient (fetch wrapper)                                │
│  - Token interceptor (añade Authorization header)            │
│  - credentials: 'include' (envía cookies)                    │
│  - Automatic token refresh on 401                            │
│                                                               │
│  Repositories (Implementations):                              │
│  - AuthRepositoryImpl                                         │
│    → Llama httpClient.post('/auth/login')                    │
│    → Mapea DTOs a domain entities                            │
│                                                               │
│  State Management:                                            │
│  - useAuthStore (Zustand)                                     │
│    → user (localStorage)                                      │
│    → refreshToken (localStorage)                              │
│    → accessToken (memoria)                                    │
│    → expiresAt (memoria)                                      │
│                                                               │
│  Token Refresh Service:                                       │
│  - attemptTokenRefresh()                                      │
│  - Callbacks to useAuthStore                                  │
│                                                               │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                         │
│  (UI Components - React)                                     │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Components:                                                  │
│  - LoginForm (Client Component)                              │
│  - SignupForm (Client Component)                             │
│                                                               │
│  Hooks:                                                       │
│  - useLogin() → Wrapper de LoginUseCase                      │
│  - useLogout() → Wrapper de LogoutUseCase                    │
│                                                               │
│  Server Functions:                                            │
│  - getMatchCalendar() → Para Server Components               │
│  - getStadiums() → Para Server Components                    │
│                                                               │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│                 DEPENDENCY INJECTION LAYER                    │
│  (DI Container - Wires Everything Together)                  │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Client DI (for Client Components):                          │
│  - DependencyProvider (React Context)                        │
│    - HttpModule → Inicializa httpClient + auth interceptor   │
│    - RepositoryModule → Crea AuthRepositoryImpl              │
│    - AuthUseCaseModule → Crea LoginUseCase, etc.             │
│                                                               │
│  Server DI (for Server Components):                          │
│  - Factories:                                                 │
│    - createMatchRepository(httpClient)                        │
│    - createStadiumRepository(httpClient)                      │
│    - createGetMatchCalendarUseCase(repository)                │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔒 Seguridad

### **¿Dónde se Guarda Cada Token?**

| Token          | Ubicación         | Accesible desde JS | Persistente | Seguridad     |
|----------------|-------------------|--------------------|-------------|---------------|
| `accessToken`  | Cookie HTTP-only  | ❌ NO              | ✅ Sí       | 🔒 Muy seguro |
| `accessToken`  | Zustand (memoria) | ✅ Sí (backup)     | ❌ NO       | ⚠️ Medio      |
| `refreshToken` | Cookie HTTP-only  | ❌ NO              | ✅ Sí       | 🔒 Muy seguro |
| `refreshToken` | localStorage      | ✅ Sí (backup)     | ✅ Sí       | ⚠️ Medio      |
| `user`         | localStorage      | ✅ Sí              | ✅ Sí       | ✅ Seguro     |

### **¿Por Qué Está Duplicado?**

**Estrategia de Defensa en Profundidad:**

1. **Cookies HTTP-only (Principal):**
   - Se envían automáticamente
   - NO accesibles desde JavaScript (protección contra XSS)
   - Funcionan en Server Components
   - Configuradas con `sameSite: 'lax'` (protección contra CSRF)

2. **Zustand Store (Backup):**
   - Permite Client Components usar tokens
   - Necesario para Authorization header (si cookies fallan)
   - `accessToken` en memoria (se pierde al recargar, más seguro)
   - `refreshToken` en localStorage (permite re-autenticación)

### **Configuración Segura en Producción**

```typescript
// Backend (cookies):
res.cookie('accessToken', token, {
  httpOnly: true,       // ✅ NO accesible desde JS
  secure: true,         // ✅ Solo HTTPS en producción
  sameSite: 'strict',   // ✅ Protección contra CSRF
  maxAge: 15 * 60 * 1000, // 15 minutos
  domain: '.tudominio.com', // ✅ Comparte entre subdominios
});

// Frontend (CORS):
app.enableCors({
  origin: 'https://tudominio.com',
  credentials: true,  // ✅ Permite cookies cross-origin
  exposedHeaders: ['Set-Cookie'],
});
```

---

## 🚀 Mejores Prácticas

### **✅ DO (Hacer)**

1. **Usa Server Components siempre que sea posible**
   - Mejor rendimiento
   - Más seguro (tokens en cookies, no en JS)
   - Menos código en el cliente

2. **Confía en el sistema de refresh automático**
   - NO añadas lógica de refresh manual
   - El sistema ya maneja expiración de tokens

3. **Protege rutas con middleware**
   - `middleware.ts` ya está configurado
   - Añade rutas protegidas a `protectedRoutes`

4. **Maneja errores de autenticación en presentation**
   ```typescript
   try {
     const data = await getMatchCalendar();
   } catch (error) {
     if (error.message.includes('Sesión expirada')) {
       router.push('/login');
     }
   }
   ```

### **❌ DON'T (No hacer)**

1. **NO añadas Authorization headers manualmente**
   - El interceptor lo hace automáticamente
   - En Server Components, las cookies son suficientes

2. **NO guardes accessToken en localStorage**
   - Ya está configurado para memoria only
   - Menos seguro contra XSS

3. **NO dupliques lógica de auth en repositories**
   - Toda la lógica está en httpClient y AuthRepository

4. **NO uses useAuthStore en Server Components**
   - Server Components NO tienen acceso a Zustand
   - Usa cookies (ya están funcionando)

---

## 🔍 Debugging

### **Ver estado de autenticación**

```javascript
// En consola del navegador:

// 1. Ver cookies
document.cookie

// 2. Ver Zustand store
JSON.parse(localStorage.getItem('porraza-auth'))

// 3. Ver si token está expirado
const store = JSON.parse(localStorage.getItem('porraza-auth'));
const expiresAt = store.state.expiresAt;
console.log('Token expira:', new Date(expiresAt));
console.log('Ahora es:', new Date());
console.log('¿Expirado?', Date.now() > expiresAt);
```

### **Ver headers de requests**

```
DevTools → Network → Selecciona request → Headers

Request Headers:
  Cookie: accessToken=eyJhbG...; refreshToken=eyJhbG...
  Authorization: Bearer eyJhbG... (solo en Client Components)
  Content-Type: application/json

Response Headers:
  Set-Cookie: accessToken=...; HttpOnly; SameSite=Lax; Max-Age=900
  Set-Cookie: refreshToken=...; HttpOnly; SameSite=Lax; Max-Age=604800
```

---

## 📚 Recursos Adicionales

- [AUTHENTICATION_DEBUG.md](./AUTHENTICATION_DEBUG.md) - Guía de diagnóstico completa
- [CLAUDE.md](./CLAUDE.md) - Guía de arquitectura del proyecto
- [Next.js Authentication Docs](https://nextjs.org/docs/app/building-your-application/authentication)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

**Última actualización:** 2025-10-24

**Estado:** ✅ Funcionando correctamente con cookies HTTP-only
