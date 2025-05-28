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
import {jsxA11y, react, recommended, typescript} from 'eslint-config-98kb';
export default defineConfig(
  jsxA11y,
  react,
  recommended,
  typescript,
);
```

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
