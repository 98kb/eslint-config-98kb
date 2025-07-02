# eslint-config-98kb

Sensible linting config with consistency and maintainability at the core.

## Features

- Opinionated ESLint configuration for modern JavaScript and TypeScript projects
- Integrates with Prettier for code formatting
- Includes recommended rules for React, accessibility (jsx-a11y), promises, imports, and more
- Supports TypeScript, React, and stylistic rules
- Designed for maintainability and code quality

## Pre-requisites

- ESLint >= 8.0.0
- TypeScript >= 4.0.0
- Node.js >= 14.0.0

## Installation

```sh
pnpm add -D eslint-config-98kb
# or
npm install --save-dev eslint-config-98kb
# or
yarn add -D eslint-config-98kb
```

## Usage

Add `eslint-config-98kb` to your ESLint config (`eslint.config.js`, etc):

```js
// eslint.config.js
import {defineConfig} from 'eslint/config';
import {jsxA11y, react, recommended, strict, typescript} from 'eslint-config-98kb';
export default defineConfig(
  jsxA11y,
  react,
  recommended,
  strict,  // includes custom 98kb rules
  typescript,
);
```

## Available Configurations

- `base` — Base JavaScript rules
- `import` — Import/export related rules
- `jsxA11y` — Accessibility rules for JSX
- `maintainability` — Code complexity and maintainability rules
- `promise` — Promise-related rules
- `react` — React-specific rules
- `recommended` — Recommended combination of rules
- `strict` — Strict rules including custom 98kb rules
- `stylistic` — Code style and formatting rules
- `typescript` — TypeScript-specific rules

## Custom Rules

The `strict` configuration includes custom 98kb rules:

### `98kb/filename`

Ensures that file names match exactly with their named export names. Supports camelCase, PascalCase, and kebab-case conversions. TypeScript type exports (interfaces, type aliases, and type-only exports) are ignored by this rule.

**Options:**

- `ignoreIndexFiles` (default: `true`) — Whether to ignore index files

**Examples:**

```js
// my-component.js ✅
export const MyComponent = () => {}; // PascalCase allowed

// user-service.js ✅
export const userService = {}; // camelCase allowed

// api-client.js ❌
export const wrongName = {}; // Should be apiClient or ApiClient

// user-data.ts ✅
export interface AnyName {} // Type exports are ignored

// api-response.ts ✅
export type SomeType = {}; // Type exports are ignored
```

### `98kb/export-limit`

Limits files to only one named export to maintain clean module interfaces.

**Options:**

- `allowDefaultExport` (default: `false`) — Whether to allow default exports
- `allowTypeExports` (default: `true`) — Whether to allow separate type exports

## Included Plugins & Configs

- `@typescript-eslint`
- `eslint-plugin-import`
- `eslint-plugin-jsx-a11y`
- `eslint-plugin-promise`
- `eslint-plugin-react`
- `eslint-plugin-react-hooks`
- `eslint-plugin-sonarjs`
- `eslint-config-sonarqube`
- `eslint-config-unjs`
- `@stylistic/eslint-plugin`

## Scripts

- `pnpm run lint` — Lint and check formatting
- `pnpm run inspector` — Inspect your ESLint config

## License

MIT © Yashodhan Singh
