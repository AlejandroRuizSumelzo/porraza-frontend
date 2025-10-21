# Infrastructure Layer

Esta capa contiene todas las implementaciones de servicios externos, comunicación con APIs, y transformación de datos.

## Estructura

```
infrastructure/
├── http/                   # HTTP client y comunicación con APIs
│   ├── client.ts           # HTTP client configurado (fetch wrapper)
│   └── dtos/               # Data Transfer Objects (formato API)
├── repositories/           # Implementaciones de repositories del domain
├── mappers/                # Transformadores DTO ↔ Domain Entity
├── adapters/               # Adaptadores para servicios externos
└── store/                  # Zustand stores (estado global)
```

## HTTP Client

### Características

- ✅ Wrapper sobre `fetch` API nativa
- ✅ Manejo de errores robusto con `HttpError`
- ✅ Timeout configurable (default 30s)
- ✅ Headers automáticos (Content-Type, etc.)
- ✅ Base URL configurable por environment
- ✅ Type-safe con TypeScript generics
- ✅ Soporte para GET, POST, PUT, DELETE, PATCH

### Uso

```typescript
import { httpClient } from "@/infrastructure/http/client";

// GET request
const response = await httpClient.get<StadiumDTO[]>('/stadiums');
console.log(response.data); // StadiumDTO[]

// POST request
const newStadium = await httpClient.post<StadiumDTO>('/stadiums', {
  name: 'Santiago Bernabéu',
  city: 'Madrid',
  country: 'Spain',
});

// Error handling
try {
  const data = await httpClient.get('/stadiums');
} catch (error) {
  if (error instanceof HttpError) {
    console.error('HTTP Error:', error.status, error.message);
  }
}
```

### Configuración

```typescript
// Crear cliente custom
import { createHttpClient } from "@/infrastructure/http/client";

const customClient = createHttpClient({
  baseURL: 'https://api.example.com',
  timeout: 10000, // 10 segundos
  headers: {
    'Authorization': 'Bearer token',
  },
});
```

### Variables de entorno

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## DTOs (Data Transfer Objects)

Los DTOs representan **exactamente** el formato de datos que viene del backend.

### Características

- ✅ Coinciden 1:1 con la respuesta de la API
- ✅ Usan tipos primitivos (string, number, boolean)
- ✅ Fechas como strings ISO (se convierten en el mapper)
- ✅ Snake_case o camelCase según la API

### Ejemplo

```typescript
// infrastructure/http/dtos/stadium-dto.ts
export interface StadiumDTO {
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
  timezone: string;
  capacity: number | null;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}
```

## Mappers

Los mappers transforman datos entre **DTO** (formato API) y **Domain Entity** (formato de negocio).

### Responsabilidades

- ✅ Convertir fechas string → Date objects
- ✅ Transformar snake_case → camelCase (si es necesario)
- ✅ Manejar valores null/undefined
- ✅ Restructurar datos según necesidades del dominio

### Patrón

```typescript
export class EntityMapper {
  // DTO → Domain
  static toDomain(dto: EntityDTO): Entity {
    return {
      id: dto.id,
      name: dto.name,
      createdAt: new Date(dto.createdAt), // String → Date
    };
  }

  // Domain → DTO
  static toDTO(domain: Entity): EntityDTO {
    return {
      id: domain.id,
      name: domain.name,
      createdAt: domain.createdAt.toISOString(), // Date → String
    };
  }

  // Para listas
  static toDomainList(dtos: EntityDTO[]): Entity[] {
    return dtos.map(dto => this.toDomain(dto));
  }

  // Para creación (omite id, createdAt, updatedAt)
  static toCreateDTO(domain: Omit<Entity, 'id' | 'createdAt'>): CreateEntityDTO {
    // ...
  }
}
```

## Repository Implementations

Las implementaciones de repositories **implementan las interfaces del domain**.

### Responsabilidades

- ✅ Realizar llamadas HTTP
- ✅ Usar mappers para transformar datos
- ✅ Manejar errores HTTP
- ✅ Loguear errores para debugging
- ✅ NO contener lógica de negocio (eso va en use cases)

### Patrón

```typescript
export class EntityRepositoryImpl implements EntityRepository {
  private readonly baseUrl = '/entities';

  constructor(private readonly httpClient: HttpClient) {}

  async findAll(): Promise<Entity[]> {
    try {
      const response = await this.httpClient.get<EntityDTO[]>(this.baseUrl);
      return EntityMapper.toDomainList(response.data);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error('[EntityRepository] Error:', error);
        throw new Error(`Failed to fetch entities: ${error.message}`);
      }
      throw error;
    }
  }

  async findById(id: string): Promise<Entity | null> {
    try {
      const response = await this.httpClient.get<EntityDTO>(`${this.baseUrl}/${id}`);
      return EntityMapper.toDomain(response.data);
    } catch (error) {
      if (error instanceof HttpError && error.status === 404) {
        return null; // Not found
      }
      throw error;
    }
  }
}
```

## Manejo de Errores

### HttpError

```typescript
try {
  const data = await httpClient.get('/stadiums');
} catch (error) {
  if (error instanceof HttpError) {
    console.error('Status:', error.status);      // 404, 500, etc.
    console.error('Message:', error.message);    // Error message
    console.error('Response:', error.response);  // Raw response data
  }
}
```

### Errores comunes

| Status | Significado | Acción |
|--------|-------------|--------|
| 404 | Not Found | Retornar `null` o array vacío |
| 401 | Unauthorized | Redirigir a login |
| 403 | Forbidden | Mostrar error de permisos |
| 500 | Server Error | Mostrar error genérico |
| 0 | Network Error | Verificar conexión |

## Mejores Prácticas

1. **Nunca expongas DTOs fuera de infrastructure** - Usa mappers
2. **Siempre maneja errores HTTP** - Usa try/catch
3. **Loguea errores con contexto** - Incluye parámetros de la llamada
4. **Retorna null para 404** - No lances error si no se encuentra
5. **Usa tipos genéricos** - `httpClient.get<T>()`
6. **Un DTO por entidad** - Mantén DTOs separados
7. **Un mapper por entidad** - Mantén mappers separados
8. **Inyecta httpClient** - No lo importes directamente en repositories

## Flujo completo (Ejemplo: Stadiums)

```
1. API Response (Backend)
   ↓
2. StadiumDTO (infrastructure/http/dtos)
   ↓
3. StadiumMapper.toDomain() (infrastructure/mappers)
   ↓
4. Stadium Entity (domain/entities)
   ↓
5. Use Case (domain/use-cases)
   ↓
6. Server Component / Client Component (app/)
```

## Testing (Futuro)

Cuando se añadan tests:

- Mock `HttpClient` en tests de repositories
- Mock `Repository` en tests de use cases
- Test mappers con datos reales del backend
- Test manejo de errores (404, 500, timeout, etc.)
