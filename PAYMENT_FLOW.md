# 🔄 Flujo Completo de Signup y Pago - Porraza

Este documento describe el flujo completo de registro de usuario con verificación de email y pago integrado.

---

## 📊 Flujo Visual

```
┌─────────────┐
│   Signup    │  Usuario se registra con email, password, nombre
│  /signup    │  → Banner info: "Pago único de €1.99"
└──────┬──────┘
       │
       ▼
┌─────────────┐
│Email Sent   │  Backend envía email con token de verificación
│             │  → Usuario recibe email con link
└──────┬──────┘
       │
       ▼
┌─────────────┐
│Verify Email │  Usuario hace clic en link del email
│/verify-email│  → Hace clic en botón "Verificar Email"
│?token=xxx   │  → Mensaje: "Inicia sesión para completar tu registro con el pago de €1.99"
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Login     │  Usuario inicia sesión
│   /login    │  → LoginForm verifica si user.hasPaid
│             │  
│             ├─── hasPaid = false ──┐
│             │                      │
│             └─── hasPaid = true ───┼──┐
└─────────────┘                      │  │
                                     │  │
       ┌─────────────────────────────┘  │
       │                                 │
       ▼                                 ▼
┌─────────────┐                  ┌─────────────┐
│  Checkout   │                  │  Dashboard  │
│  /checkout  │                  │ /dashboard  │
│             │                  │             │
│  €1.99      │                  │ (ya pagó)   │
└──────┬──────┘                  └─────────────┘
       │
       ▼
┌─────────────┐
│Stripe Form  │  Usuario completa pago con tarjeta
│ Embedded    │  → Test card: 4242 4242 4242 4242
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Success    │  Stripe redirige con session_id
│/checkout/   │  → Verifica estado del pago
│success      │  → Muestra mensaje de éxito
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Dashboard  │  Usuario accede a la aplicación
│ /dashboard  │  → Todas las funcionalidades desbloqueadas
└─────────────┘
```

---

## 🔑 Puntos Clave del Flujo

### 1. Signup ([presentation/components/auth/signup-form.tsx](presentation/components/auth/signup-form.tsx))

**Banner Informativo:**
```tsx
"Pago único de €1.99"
"Después de verificar tu email, se te pedirá completar el pago 
para acceder a todas las funcionalidades."
```

**Toast después del registro:**
```tsx
"¡Registro exitoso!"
"Verifica tu email y luego inicia sesión para completar el pago de €1.99"
```

**Acción:** Redirige a `/login`

---

### 2. Verify Email ([app/(auth)/verify-email/page.tsx](app/(auth)/verify-email/page.tsx))

**Mensaje después de verificar:**
```tsx
"¡Verificación exitosa!"
"Tu email {email} ha sido verificado. 
Ahora inicia sesión para completar tu registro con el pago de €1.99."
```

**Acción:** Botón "Ir a Iniciar Sesión" → redirige a `/login?email={email}`

---

### 3. Login ([presentation/components/auth/login-form.tsx](presentation/components/auth/login-form.tsx))

**Lógica de redirección condicional:**

```typescript
if (authResponse) {
  // Check if user has paid
  if (!authResponse.user.hasPaid) {
    // Usuario NO ha pagado → redirige a checkout
    router.push("/checkout");
  } else {
    // Usuario YA pagó → redirige a dashboard
    router.push("/dashboard");
  }
}
```

**Campo en User entity:**
```typescript
interface User {
  // ...
  hasPaid: boolean;
  stripeCustomerId?: string | null;
}
```

---

### 4. Checkout ([app/(app)/checkout/page.tsx](app/(app)/checkout/page.tsx))

**Flujo de checkout:**
1. Monta el componente
2. Llama a `createCheckoutSession()` automáticamente
3. Recibe `clientSecret` del backend
4. Muestra Stripe Embedded Checkout
5. Usuario ingresa tarjeta de prueba: `4242 4242 4242 4242`
6. Stripe procesa el pago
7. Stripe redirige a `/checkout/success?session_id=xxx`

**Webhook (en segundo plano):**
- Stripe envía evento `checkout.session.completed` al backend
- Backend actualiza `users.has_paid = true`
- Backend actualiza `users.payment_date = NOW()`

---

### 5. Success ([app/(app)/checkout/success/page.tsx](app/(app)/checkout/success/page.tsx))

**Flujo de verificación:**
1. Recibe `session_id` de query params
2. Llama a `/payments/session-status/{sessionId}`
3. Muestra estado del pago:
   - ✅ **Pago completado:** "¡Pago Exitoso! Gracias por tu pago de €1.99"
   - ⏳ **Pendiente:** "Pago Pendiente - Tu pago está siendo procesado"
   - ❌ **Error:** "Error al verificar el pago"

**Botones de navegación:**
- "Ir al Dashboard" → `/dashboard`
- "Empezar a predecir" → `/predictions`

---

## 🛡️ Protección de Contenido Premium

### Opción 1: Component Guard

```tsx
import { PaymentRequiredGuard } from "@/presentation/components/payments/payment-required-guard";

export default function PredictionsPage() {
  return (
    <PaymentRequiredGuard>
      <div>Contenido premium aquí</div>
    </PaymentRequiredGuard>
  );
}
```

### Opción 2: Hook Manual

```tsx
import { usePaymentStatus } from "@/presentation/hooks/payments/use-payment-status";

export function MyComponent() {
  const { hasPaid, isLoading } = usePaymentStatus();

  if (isLoading) return <Spinner />;
  if (!hasPaid) return <PaymentRequired />;
  
  return <PremiumContent />;
}
```

---

## 🧪 Testing del Flujo Completo

### Requisitos Previos

```bash
# Terminal 1: Backend
cd porraza-backend
pnpm run start:dev

# Terminal 2: Stripe CLI
stripe listen --forward-to http://localhost:3001/payments/webhook

# Terminal 3: Frontend
cd porraza-frontend
npm run dev
```

### Pasos de Prueba

1. **Signup**
   - Ir a http://localhost:3000/signup
   - Llenar formulario con email real (para recibir email)
   - Observar banner de "Pago único de €1.99"
   - Hacer clic en "Crear Cuenta"
   - Observar toast: "Verifica tu email y luego inicia sesión para completar el pago de €1.99"
   - ✅ Verifica: Usuario creado en BD con `has_paid = false`

2. **Verify Email**
   - Revisar email recibido
   - Hacer clic en link de verificación
   - Hacer clic en botón "Verificar Email"
   - Observar mensaje: "Inicia sesión para completar tu registro con el pago de €1.99"
   - Hacer clic en "Ir a Iniciar Sesión"
   - ✅ Verifica: Email pre-rellenado en login

3. **Login (Primera vez - sin pago)**
   - Ingresar contraseña
   - Hacer clic en "Iniciar Sesión"
   - ✅ **Verifica: Redirige automáticamente a `/checkout`** (NO a dashboard)

4. **Checkout**
   - Observar Stripe Embedded Checkout cargando
   - Ingresar datos de tarjeta de prueba:
     - Número: `4242 4242 4242 4242`
     - Expiry: `12/34`
     - CVC: `123`
     - ZIP: `12345`
   - Hacer clic en "Pagar"
   - ✅ Verifica: Redirige a `/checkout/success?session_id=cs_test_xxx`

5. **Success**
   - Observar "Verificando pago..."
   - Esperar confirmación
   - Observar "¡Pago Exitoso! Gracias por tu pago de €1.99"
   - ✅ Verifica: Fecha de pago mostrada
   - Hacer clic en "Ir al Dashboard"

6. **Dashboard (con acceso)**
   - Observar contenido desbloqueado
   - ✅ Verifica: `users.has_paid = true` en BD
   - ✅ Verifica: `users.payment_date` tiene fecha

7. **Login (Segunda vez - ya pagó)**
   - Cerrar sesión
   - Hacer login nuevamente con las mismas credenciales
   - ✅ **Verifica: Redirige directamente a `/dashboard`** (NO a checkout)

---

## 📁 Archivos Modificados

### Archivos Modificados en el Flujo

1. **[presentation/components/auth/login-form.tsx](presentation/components/auth/login-form.tsx)**
   - ✨ Agregada lógica de redirección condicional basada en `user.hasPaid`

2. **[presentation/components/auth/signup-form.tsx](presentation/components/auth/signup-form.tsx)**
   - ✨ Agregado banner informativo sobre pago de €1.99
   - ✨ Actualizado toast para mencionar verificación + pago

3. **[app/(auth)/verify-email/page.tsx](app/(auth)/verify-email/page.tsx)**
   - ✨ Actualizado mensaje de éxito para mencionar pago

### Archivos Nuevos para Pagos

Ver [PAYMENT_FLOW_ARCHITECTURE.md](PAYMENT_FLOW_ARCHITECTURE.md) para la lista completa de archivos de la implementación de pagos.

---

## 🎯 Resumen de Cambios Clave

| Antes | Después |
|-------|---------|
| Signup → Verify → Login → **Dashboard** | Signup → Verify → Login → **Checkout** → Success → Dashboard |
| Login siempre va a Dashboard | Login verifica `hasPaid`: `false` → Checkout, `true` → Dashboard |
| No se menciona pago en signup | Banner + toast informan sobre €1.99 |
| Verify email redirige a login sin contexto | Verify email menciona pago de €1.99 |

---

## ✅ Checklist de Implementación

- [x] PaymentRepository implementado
- [x] Use cases de pagos creados
- [x] Hooks de DI configurados
- [x] Hooks de presentación creados
- [x] Página de checkout con Stripe Embedded Checkout
- [x] Página de success con verificación de estado
- [x] LoginForm con lógica de redirección condicional
- [x] SignupForm con banner informativo
- [x] Verify Email con mensaje actualizado
- [x] PaymentRequiredGuard component
- [x] User entity con campo `hasPaid`

---

## 🚀 Próximos Pasos (Opcional)

1. **Middleware de protección:**
   - Agregar middleware en `app/(app)` para verificar `hasPaid`
   - Redirigir a `/checkout` si intentan acceder sin pagar

2. **Dashboard con estado de pago:**
   - Mostrar badge "Premium" si ha pagado
   - Mostrar fecha de pago en perfil

3. **Email de bienvenida post-pago:**
   - Backend envía email de bienvenida después del pago

4. **Página de precios:**
   - Crear `/pricing` con detalles de funcionalidades premium

---

**¡Flujo completo implementado y listo para usar!** 🎉
