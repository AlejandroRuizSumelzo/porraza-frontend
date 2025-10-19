# Estructura de Enrutamiento - Porraza

Esta aplicación utiliza Next.js 15 con App Router y Route Groups para separar las rutas públicas de las privadas.

## Estructura de Carpetas

```
app/
├── (landing)/              # Route Group: Rutas públicas
│   ├── page.tsx           # Landing page principal (/)
│   ├── pricing/
│   │   └── page.tsx       # Página de precios (/pricing)
│   └── legal/
│       ├── privacy/
│       │   └── page.tsx   # Política de privacidad (/legal/privacy)
│       └── terms/
│           └── page.tsx   # Términos y condiciones (/legal/terms)
│
├── (auth)/                # Route Group: Autenticación
│   ├── login/
│   │   └── page.tsx       # Inicio de sesión (/login)
│   └── signup/
│       └── page.tsx       # Registro (/signup)
│
├── (app)/                 # Route Group: Aplicación privada
│   └── dashboard/
│       └── page.tsx       # Dashboard principal (/dashboard)
│
├── layout.tsx             # Layout raíz
└── globals.css            # Estilos globales
```

## Middleware de Protección

El archivo `middleware.ts` en la raíz del proyecto protege las rutas privadas:

### Rutas Protegidas
- `/dashboard`
- `/projects`
- `/analytics`
- `/settings`

**Comportamiento:**
- Si un usuario NO autenticado intenta acceder → Redirige a `/login`
- Si un usuario autenticado intenta acceder a `/login` o `/signup` → Redirige a `/dashboard`

## Autenticación Simulada

Por ahora, la autenticación utiliza cookies simples para demostración:

1. **Login/Signup:** Guarda un token en las cookies
2. **Middleware:** Verifica la existencia del token
3. **Dashboard:** Permite cerrar sesión (elimina el token)

### Para Producción

Reemplaza la autenticación simulada con:
- JWT tokens
- Session management (NextAuth.js, Clerk, Auth0, etc.)
- Verificación real en el backend
- Refresh tokens
- Protección CSRF

## Flujo de Usuario

### Usuario No Autenticado
1. Visita `/` → Ve la landing page
2. Click en "Get Started" → Va a `/signup`
3. Completa registro → Redirige a `/dashboard`
4. Ahora puede acceder a todas las rutas de `(app)/`

### Usuario Autenticado
1. Visita `/` → Ve la landing page
2. Puede acceder a `/dashboard` directamente
3. Si intenta ir a `/login` → Redirige a `/dashboard`
4. Click en "Cerrar sesión" → Elimina token y redirige a `/login`

## Route Groups Explicados

Los paréntesis en las carpetas `(landing)`, `(auth)`, `(app)` son **Route Groups**.

**Características:**
- NO afectan la URL (no aparecen en la ruta)
- Permiten organizar rutas lógicamente
- Pueden tener sus propios layouts
- Útiles para aplicar diferentes estilos o configuraciones

**Ejemplo:**
- `app/(landing)/pricing/page.tsx` → URL: `/pricing`
- `app/(app)/dashboard/page.tsx` → URL: `/dashboard`

## Próximos Pasos

1. **Implementar autenticación real:**
   - Integrar NextAuth.js o similar
   - Conectar con backend
   - Implementar refresh tokens

2. **Añadir más páginas:**
   - Settings page
   - Projects page
   - Analytics page
   - User profile

3. **Mejorar el middleware:**
   - Role-based access control
   - Verificación de permisos
   - Rate limiting

4. **SEO y Metadata:**
   - Configurar metadata por página
   - Open Graph tags
   - Sitemap

5. **Testing:**
   - Tests de protección de rutas
   - Tests de flujo de autenticación
   - E2E tests con Playwright

## Comandos Útiles

```bash
# Modo desarrollo
npm run dev

# Build de producción
npm run build

# Ejecutar en producción
npm run start

# Linting
npm run lint
```

## Notas Importantes

- El middleware se ejecuta en **Edge Runtime**, por lo que algunas APIs de Node.js no están disponibles
- Las cookies se manejan diferente en middleware vs. Server Components
- Los Route Groups no crean segmentos de URL, solo sirven para organización
- El `matcher` del middleware es crucial para el rendimiento
