# Stadium Components

Componentes modernos y minimalistas para mostrar estadios de fútbol.

## Componentes

### StadiumCard

Tarjeta individual para mostrar un estadio con imagen, información y diseño atractivo.

**Features:**
- ✅ Imagen de fondo con overlay gradiente
- ✅ Hover effect con scale en imagen
- ✅ Badge con código del estadio
- ✅ Información de capacidad y zona horaria
- ✅ Iconos de Lucide React
- ✅ Fallback si la imagen no carga
- ✅ Responsive para mobile y desktop

**Props:**
```typescript
interface StadiumCardProps {
  stadium: Stadium;
}
```

**Uso:**
```tsx
<StadiumCard stadium={stadium} />
```

**Estructura de imagen esperada:**
- Path: `/public/stadiums/{stadium.code}.webp`
- Ejemplo: `/public/stadiums/USA_LA_SOFI.webp`

---

### StadiumGrid

Grid responsivo para mostrar múltiples tarjetas de estadios.

**Breakpoints:**
- Mobile: 1 columna
- Tablet (sm): 2 columnas
- Desktop (lg): 3 columnas

**Props:**
```typescript
interface StadiumGridProps {
  stadiums: Stadium[];
}
```

**Uso:**
```tsx
<StadiumGrid stadiums={stadiums} />
```

---

### StadiumHeader

Header con título, descripción y estadísticas resumidas.

**Features:**
- ✅ Título y descripción
- ✅ 3 tarjetas de estadísticas:
  - Total de estadios
  - Número de países
  - Capacidad total
- ✅ Iconos contextuales
- ✅ Responsive grid

**Props:**
```typescript
interface StadiumHeaderProps {
  stadiums: Stadium[];
}
```

**Uso:**
```tsx
<StadiumHeader stadiums={stadiums} />
```

---

### StadiumEmptyState

Componente para estados vacíos o de error.

**Features:**
- ✅ Dos tipos: `empty` | `error`
- ✅ Iconos contextuales
- ✅ Mensaje personalizable
- ✅ Botón de reintentar para errores

**Props:**
```typescript
interface EmptyStateProps {
  type?: "empty" | "error";
  message?: string;
}
```

**Uso:**
```tsx
{/* Error */}
<StadiumEmptyState type="error" message="Error al cargar" />

{/* Empty */}
<StadiumEmptyState type="empty" />
```

---

### StadiumCardSkeleton

Skeleton loader para tarjetas de estadios durante la carga.

**Features:**
- ✅ Usa el componente `Skeleton` de shadcn/ui
- ✅ Mantiene la estructura de StadiumCard
- ✅ Aspect ratio 16:9 para la imagen
- ✅ Animación de pulse automática

**Uso:**
```tsx
<StadiumCardSkeleton />
```

---

### StadiumGridSkeleton

Skeleton loader para el grid completo.

**Features:**
- ✅ Grid responsivo (igual que StadiumGrid)
- ✅ Cantidad configurable de skeletons
- ✅ Usa StadiumCardSkeleton internamente

**Props:**
```typescript
interface StadiumGridSkeletonProps {
  count?: number; // Default: 6
}
```

**Uso:**
```tsx
<StadiumGridSkeleton count={9} />
```

**Componente base:**
Usa `<Skeleton />` de shadcn/ui que proporciona:
- Animación `animate-pulse` automática
- Color de fondo `bg-accent`
- Border radius por defecto
- Clases personalizables

---

## Ejemplo de página completa

```tsx
// app/(app)/stadiums/page.tsx
import { useStadiums } from "@/presentation/hooks/stadiums/use-stadiums";
import {
  StadiumHeader,
  StadiumGrid,
  StadiumEmptyState,
} from "@/presentation/components/stadiums";

export default async function StadiumsPage() {
  const { stadiums, error } = await useStadiums();

  return (
    <div className="container mx-auto space-y-8 py-8">
      {error && <StadiumEmptyState type="error" message={error} />}

      {!error && stadiums && stadiums.length === 0 && (
        <StadiumEmptyState type="empty" />
      )}

      {!error && stadiums && stadiums.length > 0 && (
        <>
          <StadiumHeader stadiums={stadiums} />
          <StadiumGrid stadiums={stadiums} />
        </>
      )}
    </div>
  );
}
```

---

## Loading State

```tsx
// app/(app)/stadiums/loading.tsx
import { StadiumGridSkeleton } from "@/presentation/components/stadiums";

export default function StadiumsLoading() {
  return (
    <div className="container mx-auto space-y-8 py-8">
      {/* Header skeleton */}
      <StadiumGridSkeleton count={9} />
    </div>
  );
}
```

---

## Diseño y Estilo

### Paleta de colores (shadcn/ui)
- `bg-card` - Fondo de tarjetas
- `text-foreground` - Texto principal
- `text-muted-foreground` - Texto secundario
- `bg-primary` - Color primario
- `bg-destructive` - Color de error
- `border` - Bordes sutiles

### Animaciones
- **Hover en imagen**: `scale-110` con `transition-transform duration-500`
- **Hover en card**: `hover:shadow-xl` con `transition-all duration-300`
- **Skeleton**: `animate-pulse` en elementos de carga

### Gradientes
- Overlay en imagen: `bg-gradient-to-t from-background/95 via-background/40 to-transparent`

### Iconos (Lucide React)
- `MapPin` - Ubicación
- `Users` - Capacidad
- `Globe` - Zona horaria
- `Building2` - Estadios
- `AlertCircle` - Error

---

## Responsividad

| Breakpoint | Columnas | Gap |
|------------|----------|-----|
| Mobile (default) | 1 | 6 (1.5rem) |
| Tablet (sm: 640px) | 2 | 6 (1.5rem) |
| Desktop (lg: 1024px) | 3 | 6 (1.5rem) |

---

## Optimización

1. **Imágenes:**
   - Formato: WebP (mejor compresión)
   - Lazy loading: Nativo del navegador (`img` tag)
   - Fallback: Oculta imagen si falla

2. **Performance:**
   - Server Components (sin JavaScript al cliente)
   - CSS nativo con Tailwind
   - Sin dependencias extra

3. **Accesibilidad:**
   - Alt text en imágenes
   - Semantic HTML
   - Iconos con labels contextuales

---

## Estructura de archivos

```
presentation/components/stadiums/
├── README.md                    # Este archivo
├── index.ts                     # Exports
├── stadium-card.tsx             # Tarjeta individual
├── stadium-grid.tsx             # Grid responsivo
├── stadium-header.tsx           # Header con stats
├── stadium-empty-state.tsx      # Estados vacío/error
└── stadium-skeleton.tsx         # Loading states
```

---

## Futuras mejoras

- [ ] Filtros por país
- [ ] Búsqueda de estadios
- [ ] Ordenamiento (capacidad, nombre, etc.)
- [ ] Vista de lista alternativa
- [ ] Modal con detalles del estadio
- [ ] Mapa interactivo
- [ ] Compartir estadio
