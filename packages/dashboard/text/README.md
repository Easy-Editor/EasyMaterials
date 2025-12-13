# @easy-editor/materials-dashboard-text

Text component for EasyEditor dashboard.

## Features

- ✅ Configurable text component with rich styling options
- ✅ Support for font size, color, weight, alignment, and line height
- ✅ Pure inline styles - no CSS dependencies
- ✅ Lightweight and optimized build output
- ✅ TypeScript support with full type definitions

## Installation

```bash
npm install @easy-editor/materials-dashboard-text
```

**Peer Dependencies**: 确保已安装以下依赖

```bash
npm install @easy-editor/core react react-dom
```

## Usage

### In EasyEditor

```typescript
import Text, { meta, snippets, configure } from '@easy-editor/materials-dashboard-text'

// Register in editor
editor.registerComponent({
  component: Text,
  ...meta,
})
```

### As React Component

```tsx
import Text from '@easy-editor/materials-dashboard-text'

function App() {
  return (
    <Text
      text="Hello World"
      fontSize={24}
      color="#333"
      fontWeight="bold"
      textAlign="center"
    />
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | `'Text'` | Text content |
| `fontSize` | `number \| string` | `14` | Font size (px or string with unit) |
| `color` | `string` | `'#000000'` | Text color (hex, rgb, rgba) |
| `fontWeight` | `string \| number` | `'normal'` | Font weight (normal, bold, 100-900) |
| `textAlign` | `'left' \| 'center' \| 'right' \| 'justify'` | `'left'` | Text alignment |
| `lineHeight` | `number \| string` | `1.5` | Line height |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `CSSProperties` | - | Additional inline styles |
| `ref` | `Ref<HTMLDivElement>` | - | React ref |

## Styling

The component uses pure inline styles for all styling, making it:
- ✅ Independent - no CSS file to import
- ✅ Predictable - styles always apply
- ✅ Lightweight - minimal bundle size
- ✅ Controllable - all styles via props

```tsx
<Text
  text="Styled Text"
  fontSize={20}
  color="#007bff"
  fontWeight="600"
  textAlign="center"
  lineHeight={1.8}
  style={{ padding: '10px', backgroundColor: '#f0f0f0' }}
/>
```

## Build Output

```
dist/
├── index.js          # UMD format (for CDN)
├── index.esm.js      # ESM format (for modern bundlers)
├── index.cjs         # CommonJS format (for Node.js)
├── index.min.js      # Minified UMD
├── index.d.ts        # TypeScript definitions
└── *.map             # Source maps
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Lint
npm run lint

# Format
npm run format
```

## Configuration

The component uses a comprehensive configuration system based on EasyEditor's standards:

- **Basic Settings**: ID, title, position/size, text content
- **Font Styling**: Size, color, weight, line height, alignment
- **Advanced Settings**: Visibility conditions

See `src/configure.ts` for the complete configuration structure.
