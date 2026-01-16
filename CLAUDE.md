# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EasyMaterials is the official materials library for EasyEditor, providing out-of-the-box visual components for building low-code applications. Each material is packaged independently and can be loaded on-demand from CDN or bundled with applications.

## Build & Development Commands

```bash
# Install dependencies (pnpm 9.12.2+, node >= 18.0.0)
pnpm install

# Check code quality (Ultracite)
pnpm check

# Auto-fix code issues
pnpm fix

# Build all materials
pnpm build

# Run tests
pnpm test

# Preview specific material (example)
pnpm dev:dashboard-text
```

### Individual Material Development

Navigate to a material package (e.g., `packages/dashboard/text`) and run:

```bash
# Start development server with hot reload
pnpm dev

# Start on custom port for debugging
pnpm dev:debug

# Build material
pnpm build

# Build steps (can run individually)
pnpm build:clean    # Clean dist/
pnpm build:js       # Bundle with Rollup
pnpm build:types    # Generate TypeScript declarations

# Type checking
pnpm test-types
```

### Publishing Workflow (via Changesets)

```bash
pnpm pub:changeset    # Create changeset for version bump
pnpm pub:version      # Apply changesets and bump versions
pnpm pub:release      # Publish to npm
```

## High-Level Architecture

### Monorepo Structure

This is a pnpm workspaces monorepo with **independent material packages**:

```
packages/
├── dashboard/          # Dashboard materials
│   ├── text/          # @easy-editor/materials-dashboard-text
│   ├── bar-chart/     # @easy-editor/materials-dashboard-bar-chart
│   ├── line-chart/    # @easy-editor/materials-dashboard-line-chart
│   └── ...            # More dashboard materials
│
└── shared/            # @easy-editor/materials-shared (private)
    └── src/           # Shared types and utilities
```

**Key Points**:

- **Each material is a separate npm package** (e.g., `@easy-editor/materials-dashboard-text`)
- Materials can be installed independently or as a collection
- `shared` package is private (workspace-only, not published)

### Material Package Structure

Every material follows this standard structure:

```
packages/dashboard/text/
├── src/
│   ├── component.tsx      # React component implementation
│   ├── meta.ts            # Material metadata (name, icon, category)
│   ├── configure.ts       # Property configuration (uses setters)
│   ├── snippets.ts        # Default templates/instances
│   ├── constants.ts       # Component-specific constants
│   └── index.tsx          # Main entry point
│
├── dist/                  # Build output (generated)
│   ├── index.js          # UMD (browser/CDN)
│   ├── index.esm.js      # ESM (modern tools)
│   ├── index.cjs         # CommonJS (Node.js)
│   ├── index.min.js      # UMD minified
│   ├── component.esm.js  # Component only (for lazy loading)
│   ├── meta.esm.js       # Metadata only (for lazy loading)
│   └── index.d.ts        # TypeScript declarations
│
├── rollup.config.js       # Build configuration
├── dev-server.ts          # Development server with hot reload
├── package.json
├── tsconfig.json
├── tsconfig.build.json
└── README.md
```

### Material Files Explained

**1. component.tsx** - React Component

- Implements the visual component
- Receives props from EasyEditor's renderer
- Should be framework-agnostic (avoid external dependencies)

**2. meta.ts** - Material Metadata

- Exports `ComponentMeta` object:
  - `componentName` - Unique identifier
  - `title` - Display name
  - `icon` - Icon URL or component
  - `category` - Material category (e.g., 'basic', 'chart')
  - `group` - Optional grouping
  - `configure` - Property configuration (imported from `configure.ts`)
  - `snippets` - Default instances (imported from `snippets.ts`)

**3. configure.ts** - Property Configuration

- Defines properties that appear in EasyEditor's property panel
- Uses **setters** from `@easy-editor/setters` (or custom)
- Organized into groups (collapse, tabs)

**4. snippets.ts** - Default Templates

- Provides pre-configured instances of the component
- Users can drag these into the canvas
- Each snippet includes default props and children

**5. constants.ts** - Component Constants

- Enums, default values, type definitions
- Reused across component/configure/snippets

**6. index.tsx** - Entry Point

- Exports `meta`, `component`, and default export
- Default export used by dev server for preview

### Build System

Each material uses **Rollup** with multiple output formats:

**Full Builds** (index.tsx):

- `index.js` - UMD (browser/CDN)
- `index.esm.js` - ESM (modern tools like Vite/Webpack)
- `index.cjs` - CommonJS (Node.js)
- `index.min.js` - UMD minified (production CDN)

**Lazy-Load Builds** (separate files):

- `meta.esm.js` - Metadata only (small, loads first)
- `component.esm.js` - Component only (loads on-demand)
- Enables progressive loading in EasyEditor

**TypeScript Declarations**:

- Generated from source with `tsc`
- Single `index.d.ts` file per material

**External Dependencies**:

- `react`, `react-dom`, `@easy-editor/core` are marked external (not bundled)
- Reduces bundle size, avoids version conflicts
- Consumers provide these as peer dependencies

### Development Server

Each material includes a **dev-server.ts** for local development:

**Features**:

- Hot reload on file changes (watches `src/`)
- Serves material via HTTP (default port 5000)
- CORS enabled for EasyEditor integration
- WebSocket for live updates

**Usage**:

```bash
pnpm dev           # Start on port 5000
pnpm dev:debug     # Start on port 5001
```

**Integration with EasyEditor**:

- Configure EasyEditor to load material from `http://localhost:5000`
- Changes auto-reload in the editor

### Package Export Strategy

Materials use **dual exports** for flexibility:

**Development** (src/):

- `package.json` "main": `"src/index.tsx"`
- Used with `workspace:*` references in monorepo
- No build step needed during development

**Production** (dist/):

- `package.json` "publishConfig": Points to `dist/` files
- Published to npm with all build formats
- Supports ESM/CJS/UMD for maximum compatibility

### Shared Package

`@easy-editor/materials-shared` (private):

- Common types, utilities, constants
- Workspace-only dependency (never published)
- Used by materials via `workspace:*` reference
- Bundled into each material during build

## Code Standards

Uses **Ultracite** (Biome preset) for strict code quality:

### Key Rules

- **Type Safety**: Explicit types, avoid `any`, use const assertions
- **Modern React**: Function components, hooks, proper dependencies
- **No External State**: Components should be pure (props in, UI out)
- **Minimal Dependencies**: Avoid heavy libraries
- **Accessibility**: Semantic HTML, ARIA attributes
- **Security**: Sanitize user input, avoid `dangerouslySetInnerHTML`

### Formatting

- Single quotes
- 2-space indent
- 120 line width
- Semicolons required

Run `pnpm fix` before committing.

## Technology Stack

- **Language**: TypeScript 5.7+
- **Package Manager**: pnpm 9.12.2+
- **Build**: Rollup + Babel (production), Vite (development)
- **UI**: React 18|19
- **Styling**: Tailwind CSS v4 + CSS Variables
- **UI Components**: shadcn/ui (Card, Badge, Progress, etc.)
- **Charts**: Recharts
- **Icons**: lucide-react
- **Linter/Formatter**: Biome (Ultracite preset)
- **Versioning**: Changesets

## Shared Package (@easy-editor/materials-shared)

The shared package provides common utilities, components, and configurations:

### Exports

```typescript
// Utilities
import { cn } from "@easy-editor/materials-shared";
import { cva, type VariantProps } from "@easy-editor/materials-shared";

// UI Components (shadcn/ui)
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Progress,
  Button,
  Alert,
  Separator,
  ScrollArea,
  Table,
} from "@easy-editor/materials-shared";

// Configure Helpers
import {
  idConfig,
  titleConfig,
  rectConfig,
  createBasicItems,
  createAdvancedItems,
  createCollapseGroup,
  createEventsGroup,
  onClickConfig,
  onSelectConfig,
} from "@easy-editor/materials-shared";

// Vite Plugin (for dev server)
import { createMaterialViteConfig } from "@easy-editor/materials-shared/vite";
```

### Vite Development Server

Each material uses Vite for development with a shared configuration:

**vite.config.ts**:

```typescript
import { defineConfig } from "vite";
import { createMaterialViteConfig } from "@easy-editor/materials-shared/vite";

export default defineConfig(
  createMaterialViteConfig({
    port: 5001, // Each material has a unique port
    entry: "/src/index.tsx",
  })
);
```

**Features**:

- Hot Module Replacement (HMR)
- WebSocket notifications for EasyEditor integration
- `/api/health` - Health check endpoint
- `/api/material` - Material metadata endpoint

### Configure Helpers

Use shared configure helpers to reduce boilerplate:

```typescript
// In configure.ts
import {
  createBasicItems,
  createAdvancedItems,
  createCollapseGroup,
  createEventsGroup,
  onClickConfig,
  onSelectConfig,
} from "@easy-editor/materials-shared";

const configure: Configure = {
  props: [
    {
      type: "group",
      title: "功能",
      setter: "TabSetter",
      items: [
        {
          type: "group",
          key: "basic",
          title: "基本",
          items: [
            ...createBasicItems(), // ID, Title, Rect
            // Custom configs...
          ],
        },
        {
          type: "group",
          key: "advanced",
          title: "高级",
          items: [
            ...createAdvancedItems(), // Visibility
            createEventsGroup([onClickConfig, onSelectConfig]),
          ],
        },
      ],
    },
  ],
};
```

## Material Categories

### Chart Materials (8) - Use Recharts

| Material           | Port | Recharts Components   |
| ------------------ | ---- | --------------------- |
| tech-line-chart    | 5001 | LineChart, Line       |
| tech-bar-chart     | 5002 | BarChart, Bar         |
| tech-pie-chart     | 5003 | PieChart, Pie, Cell   |
| tech-area-chart    | 5004 | AreaChart, Area       |
| tech-radar-chart   | 5005 | RadarChart, Radar     |
| tech-scatter-chart | 5006 | ScatterChart, Scatter |
| waterfall-chart    | 5007 | BarChart (custom)     |
| funnel-chart       | 5008 | FunnelChart, Funnel   |

### Basic Materials (6) - Use Tailwind + cn

| Material | Port |
| -------- | ---- |
| button   | 5009 |
| badge    | 5010 |
| avatar   | 5011 |
| image    | 5012 |
| icon     | 5013 |
| link     | 5014 |

### Data Display Materials (6)

| Material         | Port |
| ---------------- | ---- |
| kpi-card         | 5015 |
| statistic-number | 5016 |
| ranking-list     | 5017 |
| data-table       | 5018 |
| metric-group     | 5019 |
| data-card        | 5020 |

### Decoration Materials (5)

| Material              | Port |
| --------------------- | ---- |
| neon-border           | 5024 |
| divider               | 5025 |
| tech-frame            | 5026 |
| glow-text             | 5027 |
| background-decoration | 5028 |

### Status Materials (5)

| Material         | Port |
| ---------------- | ---- |
| status-indicator | 5029 |
| alert-panel      | 5030 |
| progress-ring    | 5021 |
| gauge-chart      | 5022 |
| system-status    | 5031 |

### Layout Materials (4)

| Material         | Port |
| ---------------- | ---- |
| glass-panel      | 5032 |
| tech-card        | 5023 |
| grid-container   | 5033 |
| scroll-container | 5034 |

### Other Materials

| Material | Port |
| -------- | ---- |
| text     | 5001 |

## Material Naming Convention

**Package Name**: `@easy-editor/materials-{category}-{component}`

Examples:

- `@easy-editor/materials-dashboard-text`
- `@easy-editor/materials-dashboard-bar-chart`
- `@easy-editor/materials-form-input` (future)

**Directory Structure**: `packages/{category}/{component}/`

## TypeScript Configuration

Each material has three configs:

**tsconfig.json** - Base config (extends root)

```json
{
  "extends": "../../../../tsconfig.json"
}
```

**tsconfig.build.json** - Type generation

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "emitDeclarationOnly": true,
    "outDir": "./dist"
  }
}
```

**tsconfig.test.json** - Type checking only

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": true
  }
}
```

## Working with Materials

### Creating a New Material

1. **Create package directory**:

   ```bash
   mkdir -p packages/dashboard/my-component
   cd packages/dashboard/my-component
   ```

2. **Copy structure from existing material** (e.g., `text`):

   ```bash
   cp -r ../text/package.json .
   cp -r ../text/tsconfig*.json .
   cp -r ../text/rollup.config.js .
   cp -r ../text/dev-server.ts .
   ```

3. **Update package.json**:

   - Change `name` to `@easy-editor/materials-dashboard-my-component`
   - Update `description`
   - Update `keywords`

4. **Create src/ files**:

   - `component.tsx` - Implement React component
   - `meta.ts` - Define metadata
   - `configure.ts` - Define properties
   - `snippets.ts` - Create default instances
   - `constants.ts` - Add constants
   - `index.tsx` - Add exports

5. **Install dependencies**:

   ```bash
   pnpm install
   ```

6. **Test locally**:
   ```bash
   pnpm dev           # Start dev server
   pnpm build         # Test build
   pnpm test-types    # Check types
   ```

### Modifying an Existing Material

1. **Navigate to material**:

   ```bash
   cd packages/dashboard/text
   ```

2. **Start dev server**:

   ```bash
   pnpm dev
   ```

3. **Make changes** in `src/` - server auto-reloads

4. **Before committing**:
   ```bash
   pnpm fix           # Auto-fix issues
   pnpm test-types    # Verify types
   pnpm build         # Test build
   ```

### Testing Materials in EasyDashboard

**Option 1: Dev Server**

```typescript
// In EasyDashboard, configure material loading
materials.loadRemote({
  url: "http://localhost:5000",
  componentName: "Text",
});
```

**Option 2: Workspace Dependency**

```json
// In EasyDashboard/package.json
{
  "dependencies": {
    "@easy-editor/materials-dashboard-text": "workspace:*"
  }
}
```

Then import directly:

```typescript
import { meta, component } from "@easy-editor/materials-dashboard-text";
materials.register(meta, component);
```

### Publishing a Material

1. **Create changeset**:

   ```bash
   pnpm pub:changeset
   # Select package(s) to version
   # Choose version bump (patch/minor/major)
   # Describe changes
   ```

2. **Version and publish**:
   ```bash
   pnpm pub:version    # Update versions
   pnpm pub:release    # Publish to npm
   ```

## Material Integration with EasyEditor

Materials integrate with EasyEditor through three mechanisms:

**1. Material Registration**:

```typescript
import { materials } from "@easy-editor/core";
import { meta, component } from "@easy-editor/materials-dashboard-text";

materials.register(meta, component);
```

**2. Setter Usage**:
Configure properties using setters from `@easy-editor/setters`:

```typescript
// In configure.ts
import { StringSetter, NumberSetter } from "@easy-editor/setters";

export const configure = [
  {
    id: "text",
    title: "Text",
    setter: StringSetter,
    config: { key: "text" },
  },
];
```

**3. Lazy Loading**:
Materials can be loaded on-demand:

```typescript
materials.loadAsync({
  metaUrl: "https://cdn.com/materials-text/meta.esm.js",
  componentUrl: "https://cdn.com/materials-text/component.esm.js",
});
```

## Important Constraints

1. **Components must be pure** - No side effects, state management, or external dependencies
2. **Props from EasyEditor** - Components receive props from renderer, not direct user input
3. **Minimal bundle size** - Keep materials lightweight (avoid heavy libraries)
4. **Framework compatibility** - While using React, components should work with different renderers
5. **Accessibility first** - Follow WCAG 2.1 AA standards
6. **No CSS-in-JS** - Use inline styles or external stylesheets (easier for CDN)

## Common Pitfalls

- **Forgetting to build**: Run `pnpm build` before publishing - `src/` isn't published
- **Missing external dependencies**: `react`, `react-dom`, `@easy-editor/core` must be external in Rollup config
- **Breaking material contract**: Ensure `meta.ts` exports correct structure
- **Heavy dependencies**: Avoid large libraries - they bloat bundle size
- **Hardcoded values**: Use props and constants, not hardcoded strings/numbers
- **Missing TypeScript types**: Always run `pnpm types` to generate declarations
- **Dev server port conflicts**: Use `pnpm dev:debug` if port 5000 is taken

## CDN Usage

Materials can be loaded from unpkg or jsdelivr:

**unpkg**:

```html
<script src="https://unpkg.com/@easy-editor/materials-dashboard-text@latest/dist/index.min.js"></script>
```

**jsdelivr**:

```html
<script src="https://cdn.jsdelivr.net/npm/@easy-editor/materials-dashboard-text@latest/dist/index.min.js"></script>
```

**ESM Import**:

```typescript
import {
  meta,
  component,
} from "https://unpkg.com/@easy-editor/materials-dashboard-text/dist/index.esm.js";
```

## Package Manager

**Must use pnpm 9.12.2+** - enforced by `preinstall` script. Other package managers will fail.
