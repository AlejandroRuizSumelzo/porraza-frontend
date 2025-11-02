# Type Definitions

Este directorio contiene declaraciones de tipos personalizadas para librerías de terceros que no tienen tipos oficiales.

## Archivos

### `g-loot__react-tournament-brackets.d.ts`

Declaraciones de tipos para la librería `@g-loot/react-tournament-brackets`.

Esta librería no incluye definiciones de TypeScript oficiales, por lo que hemos creado estos tipos manualmente basándonos en:
- La documentación de la librería
- El código fuente
- El uso en nuestro proyecto

**Interfaces principales:**
- `Theme` - Configuración de colores y estilos del bracket
- `Match` - Representación de un partido
- `Participant` - Participante (equipo) en un partido
- `MatchComponentProps` - Props para componentes de match personalizados
- `SingleEliminationBracketProps` - Props del bracket principal

**Uso:**
```typescript
import { SingleEliminationBracket, createTheme } from '@g-loot/react-tournament-brackets';
import type { MatchComponentProps } from '@g-loot/react-tournament-brackets/dist/types';
```

## Configuración TypeScript

El archivo `tsconfig.json` está configurado para incluir automáticamente estos tipos:

```json
{
  "compilerOptions": {
    "typeRoots": ["./node_modules/@types", "./types"]
  },
  "include": [
    "types/**/*.d.ts"
  ]
}
```

## Añadir nuevos tipos

Para añadir definiciones de tipos para una nueva librería:

1. Crear un archivo `.d.ts` con el nombre del paquete (usando `__` para `/`):
   - `@scope/package` → `scope__package.d.ts`
   - `package-name` → `package-name.d.ts`

2. Declarar el módulo:
   ```typescript
   declare module 'package-name' {
     // Tipos aquí
   }
   ```

3. Reiniciar el servidor TypeScript en VSCode:
   - Cmd/Ctrl + Shift + P
   - "TypeScript: Restart TS Server"
