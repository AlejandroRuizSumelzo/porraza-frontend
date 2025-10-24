# Personalización de Stripe Checkout

Este documento explica cómo personalizar el formulario de Stripe Embedded Checkout para que coincida con los colores del Mundial de Porraza.

## Colores de marca

- **Azul Mundial (Primary)**: `#2a398d`
- **Verde Mundial (Secondary)**: `#3cac3b`
- **Rojo Mundial (Destructive)**: `#e61d25`

## Limitaciones del Embedded Checkout

Stripe Embedded Checkout **NO** permite personalización de apariencia desde el frontend. La personalización debe hacerse en el **backend** cuando se crea la sesión de checkout.

## Implementación en el Backend

Para aplicar los estilos de Porraza, actualiza el endpoint de creación de sesión en tu backend:

```typescript
// Backend: /payments/create-checkout-session

const session = await stripe.checkout.sessions.create({
  mode: 'payment',
  ui_mode: 'embedded',
  line_items: [
    {
      price_data: {
        currency: 'eur',
        product_data: {
          name: 'Predicción Mundial Porraza',
          description: 'Pago único de €1.99 para acceder a todas las funcionalidades premium',
        },
        unit_amount: 199, // €1.99 en centavos
      },
      quantity: 1,
    },
  ],

  // ✅ Personalización de textos (FUNCIONA)
  custom_text: {
    submit: {
      message: 'Completar pago de €1.99',
    },
    terms_of_service_acceptance: {
      message: 'Acepto los [términos de servicio](https://porraza.com/terms) y la [política de privacidad](https://porraza.com/privacy)',
    },
  },

  // ✅ Locale en español (FUNCIONA)
  locale: 'es',

  // ❌ Appearance API NO funciona con Embedded Checkout
  // Solo funciona con Payment Element, no con Embedded Checkout

  return_url: `${YOUR_DOMAIN}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,

  // Metadata para tracking
  metadata: {
    user_id: userId,
    product: 'porraza_mundial_2026',
  },
});
```

## Alternativas de personalización

### 1. Usar Stripe Payment Element (Recomendado para máxima personalización)

Si necesitas personalización completa de colores, considera migrar de **Embedded Checkout** a **Payment Element**:

```typescript
// Backend: Crear Payment Intent en lugar de Checkout Session
const paymentIntent = await stripe.paymentIntents.create({
  amount: 199,
  currency: 'eur',
  metadata: { user_id: userId },
});

// Frontend: Usar Payment Element con appearance API
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { stripeAppearance } from '@/presentation/config/stripe-appearance';

<Elements
  stripe={stripePromise}
  options={{
    clientSecret: paymentIntent.client_secret,
    appearance: stripeAppearance, // ✅ FUNCIONA con Payment Element
  }}
>
  <PaymentElement />
</Elements>
```

### 2. CSS Personalizado (Actual)

La solución actual usa CSS para ajustar el contenedor del iframe:

```css
/* app/globals.css */
.stripe-checkout-custom {
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 8px -2px rgba(0,0,0,0.08);
  background: var(--background);
}
```

Esta clase se aplica al componente `<EmbeddedCheckout />`:

```tsx
<EmbeddedCheckout className="stripe-checkout-custom" />
```

## Configuración de referencia

El archivo [`presentation/config/stripe-appearance.ts`](presentation/config/stripe-appearance.ts) contiene la configuración completa de colores y estilos que deberías usar si migras a Payment Element.

## Recomendación

**Para desarrollo rápido**: Mantén Embedded Checkout con CSS personalizado (solución actual)

**Para personalización completa**: Migra a Payment Element + Appearance API

## Referencias

- [Stripe Embedded Checkout Docs](https://stripe.com/docs/payments/checkout/how-checkout-works#embedded-checkout)
- [Stripe Payment Element Docs](https://stripe.com/docs/payments/payment-element)
- [Stripe Appearance API](https://stripe.com/docs/elements/appearance-api)
- [Stripe Custom Text](https://stripe.com/docs/api/checkout/sessions/create#create_checkout_session-custom_text)
