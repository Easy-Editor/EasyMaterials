# @easy-editor/materials-shared

Internal shared types and constants for EasyEditor materials (Monorepo only).

## ⚠️ Internal Use Only

This package is **not published to npm** and is only used within the monorepo workspace.

## Features

- ✅ Material group constants
- ✅ Shared TypeScript types
- ✅ Zero dependencies
- ✅ Direct source import (no build needed)

## Usage

```typescript
import { MaterialGroup } from '@easy-editor/materials-shared'

// Use in material meta
const meta = {
  componentName: 'Text',
  title: 'Text',
  group: MaterialGroup.BASIC,  // 'basic'
}
```

## Structure

```
packages/shared/
├── src/
│   ├── index.ts      # Main export
│   └── types.ts      # MaterialGroup and types
├── package.json      # private: true
├── tsconfig.json
└── README.md
```

## Exports

### MaterialGroup

```typescript
const MaterialGroup = {
  INNER: 'inner',
  BASIC: 'basic',
  CHART: 'chart',
  DATA: 'data',
  INTERACTION: 'interaction',
} as const
```

### MaterialGroupType

```typescript
type MaterialGroupType = 'inner' | 'basic' | 'chart' | 'data' | 'interaction'
```

## Adding New Shared Items

1. Add to `src/types.ts` or create new file
2. Export from `src/index.ts`
3. All materials can import directly

## License

MIT

