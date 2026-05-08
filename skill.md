# eslint-config-98kb — Agent Skill Guide

This guide covers every rule enforced by `eslint-config-98kb` so that agents can write compliant code from the start.

---

## Prettier (formatting)

All formatting is handled by Prettier with these settings:

| Setting | Value |
|---|---|
| Print width | 80 |
| Indent | 2 spaces (no tabs) |
| Semicolons | required |
| Quotes | double quotes |
| Trailing commas | all (functions, objects, arrays) |
| Bracket spacing | no spaces — `{key: value}` not `{ key: value }` |
| Arrow parens | omit for single arg — `x => x` not `(x) => x` |

---

## File & Module structure (98kb/strict)

### One named export per file (`98kb/export-limit`)

Each file must contain **exactly one named export**. Default exports are not allowed. Type-only exports (`export type`, `export interface`) do not count toward the limit.

```js
// ✅ one named export
export const userService = {};

// ✅ type exports are free
export type UserId = string;
export interface User {}

// ❌ two named value exports in the same file
export const foo = 1;
export const bar = 2;

// ❌ default export
export default function doSomething() {}
```

### File name must match the export (`98kb/filename`)

The file name (in kebab-case) must correspond to the single named export (in camelCase or PascalCase). Index files are exempt.

```
userService.js  →  export const userService = {}   ✅
UserService.js  →  export const UserService = {}   ✅
user-service.js →  export const userService = {}   ✅  (kebab → camel)
user-service.js →  export const UserService = {}   ✅  (kebab → Pascal)
api-client.js   →  export const wrongName = {}     ❌  name mismatch
```

TypeScript type/interface exports are **ignored** by this rule.

---

## Imports (`import` plugin)

- File extensions must be **omitted** for JS/TS imports; `.json` and `.md` always require an extension.
- All import statements must appear **at the top** of the file before any other code.
- A **blank line** is required after the last import statement.
- No absolute paths, no AMD-style requires, no dynamic `require()`.
- No duplicate imports — combine them into one statement.
- No importing mutable `let`/`var` bindings from another module.
- No useless `index` segments in paths — use `./utils` not `./utils/index`.
- No importing packages not listed in `package.json` (`import/no-extraneous-dependencies`).

```js
// ✅
import {foo} from "./foo";
import data from "./data.json";

const x = 1;

// ❌ extension on a JS import
import {foo} from "./foo.js";

// ❌ import after code
const x = 1;
import {foo} from "./foo";

// ❌ duplicate imports
import {a} from "./mod";
import {b} from "./mod";
// → combine: import {a, b} from "./mod";
```

For TypeScript, `import/no-unresolved` is turned off.

---

## Variables & naming

- Use **camelCase** for all identifiers (warn).
- Never declare multiple variables in one `var`/`let`/`const` statement (`one-var: never`):

```js
// ✅
const a = 1;
const b = 2;

// ❌
const a = 1, b = 2;
```

- Use `===` / `!==` (eqeqeq, smart mode — `== null` is still allowed).
- No yoda conditions — `value === "red"` not `"red" === value`.
- Prefer **object destructuring** (array destructuring is not enforced):

```js
// ✅
const {name, age} = user;

// ❌
const name = user.name;
```

- Use shorthand object properties and method definitions:

```js
// ✅
const obj = {name, getValue() {}};

// ❌
const obj = {name: name, getValue: function() {}};
```

- No `no-unused-vars` at the ESLint level (handled by TypeScript).
- Rule `no-underscore-dangle` is **off** — leading/trailing underscores are allowed.

---

## Functions

### Declaration style (`func-style`)

Named functions must use **function declarations** or **arrow functions**. Function expressions assigned to variables are not allowed.

```js
// ✅ declaration
function fetchUser(id) {}

// ✅ arrow function
const fetchUser = id => {};

// ❌ function expression
const fetchUser = function(id) {};
```

### Callbacks must use arrow functions (`prefer-arrow-callback`)

```js
// ✅
array.map(item => item.id);

// ❌
array.map(function(item) { return item.id; });
```

### Parameters

- Maximum **4 parameters** per function. Use an options object for more.
- Prefer rest parameters (`...args`) over `arguments`.
- Prefer spread syntax (`fn(...args)`) over `.apply()`.

```js
// ✅
function create({name, age, role, active}) {}

// ❌ (5 params)
function create(name, age, role, active, meta) {}
```

### Blank lines around functions and classes

A **blank line is required** both before and after every `function` declaration and `class` definition.

```js
const x = 1;

function doSomething() {}

const y = 2;
```

---

## Maintainability (very strict limits)

| Metric | Limit |
|---|---|
| Cyclomatic complexity | **3** |
| Statements per function | **7** |
| Parameters per function | **4** |
| Nesting depth | **3** |
| Nested callbacks | **2** |
| Statements per line | **1** |

These limits are intentionally tight. When you hit them, extract helper functions.

```js
// ❌ complexity > 3
function process(input) {
  if (input.a) {
    if (input.b) {
      if (input.c) {
        return "deep";
      }
    }
  }
}

// ✅ extract helpers to keep each function simple
function hasAllFlags(input) {
  return input.a && input.b;
}

function process(input) {
  if (!hasAllFlags(input)) return null;
  if (input.c) return "deep";
  return "shallow";
}
```

---

## Control flow

- Always use **curly braces** for all control-flow blocks (if, for, while, etc.) — no single-line braceless statements.
- `block-scoped-var`: treat `var` as block-scoped (or better, use `let`/`const`).
- No `continue` statements in loops.
- Rule `no-lonely-if`: don't use a standalone `if` as the only statement in an `else` block — use `else if` instead.
- No `labels`.
- No `no-unneeded-ternary` — simplify unnecessary ternary expressions.

```js
// ✅
if (condition) {
  doSomething();
}

// ❌ no braces
if (condition) doSomething();

// ✅
if (a) {
  return 1;
} else if (b) {
  return 2;
}

// ❌ lonely if
if (a) {
  return 1;
} else {
  if (b) {
    return 2;
  }
}
```

---

## Error handling & async

- No `await` inside loops (`no-await-in-loop`) — use `Promise.all` instead.
- Always handle `require("node:fs")`-style callback errors (`n/handle-callback-err`).
- No `no-promise-executor-return` — don't return a value from a `new Promise` executor.
- `require-atomic-updates`: avoid race conditions when assigning to variables from async operations.
- `no-constructor-return` — don't return a value from a class constructor.

---

## Promises (`promise` plugin)

- Every promise chain must end with `.catch()` **or** `.then(_, onRejected)` (warn). Chaining `.then()` on the result is also permitted (`allowThen: true`).
- Don't wrap values in `Promise.resolve()` or `Promise.reject()` unnecessarily. Wrapping in `reject` is allowed (`allowReject: true`).
- `promise/always-return` is **off**.
- `promise/avoid-new` is **off** — `new Promise(...)` is allowed.

---

## Stylistic

- No floating decimals — write `1.0` or `0.5`, never `.5` or `1.`.
- Wrap IIFEs: `(function() {}())`.
- Class members: blank line between members unless the preceding member is a single-line definition.
- Only **one statement per line** — never `const a = 1; const b = 2;` on one line.

---

## TypeScript (`@typescript-eslint`)

Extends `@typescript-eslint/recommended` plus:

- No empty functions (`@typescript-eslint/no-empty-function`).
- **Type-only imports must use `import type`** (`@typescript-eslint/consistent-type-imports`):

```ts
// ✅
import type {User} from "./types";
import {fetchUser} from "./api";

// ❌
import {User} from "./types"; // when User is only used as a type
```

- `import/no-unresolved` is turned off for TypeScript files.

---

## React

Applies to `**/*.{ts,tsx}` files.

### Component definition

Named components must be **function declarations**, not arrow functions assigned to variables (warn):

```tsx
// ✅
export function UserCard({name}: Props) {
  return <div>{name}</div>;
}

// ⚠️ (warn) avoid arrow-function components for named exports
export const UserCard = ({name}: Props) => <div>{name}</div>;
```

Unnamed/inline components must use function expressions.

### JSX rules

- Component names must be **PascalCase** (`react/jsx-pascal-case`).
- Use `<>` fragment shorthand rather than `<React.Fragment>` (`react/jsx-fragments`).
- No curly braces around string literal props — `title="Hello"` not `title={"Hello"}`.
- No spaces inside JSX curly braces — `{value}` not `{ value }`.
- Self-close elements with no children — `<Icon />` not `<Icon></Icon>`.
- No `javascript:` URLs in JSX.
- Explicit boolean value for boolean props — `<Input disabled={true} />` not `<Input disabled />`.

```tsx
// ✅
<Button type="button" onClick={handleClick}>
  <Icon />
</Button>

// ❌ unnecessary curly brace around string
<Button type={"button"}>

// ❌ space inside curly brace
<Button onClick={ handleClick }>

// ❌ don't use React.Fragment when shorthand works
<React.Fragment><Child /></React.Fragment>
```

### Component class member order (`react/sort-comp`)

Class components must declare members in this order:

1. `type-annotations`
2. `instance-variables`
3. `static-methods`
4. `lifecycle` methods
5. everything else
6. `rendering` (`render` and methods starting with `render`)

### Hooks

- Follow the Rules of Hooks (`react-hooks/rules-of-hooks`).
- Include all dependencies in `useEffect`/`useCallback`/`useMemo` dependency arrays (warn).
- `useState` must follow the `[value, setValue]` naming convention (`react/hook-use-state`).
- Lifecycle methods (`componentDidMount`, etc.) must not be written as arrow functions (`react/no-arrow-function-lifecycle`).

### Safety

- No `UNSAFE_*` lifecycle methods (`react/no-unsafe`).
- No `this.state` access inside `setState` callbacks (`react/no-access-state-in-setstate`).
- No `this` in stateless functional components.
- No typos in React-specific prop names (`react/no-typos`).
- No unused state or unused prop types.
- No `redundantShouldComponentUpdate`.
- No `componentWillUpdate` that calls `setState`.

### Accessibility (`jsx-a11y`)

Extends `jsx-a11y/recommended`. Notable overrides:

| Rule | Level |
|---|---|
| `anchor-has-content` | warn |
| `label-has-associated-control` | warn |
| `no-noninteractive-tabindex` | warn |
| `no-redundant-roles` | warn |
| `no-static-element-interactions` | warn |
| `control-has-associated-label` | warn |
| `anchor-is-valid` | off |
| `click-events-have-key-events` | off |
| `no-autofocus` | off |
| `no-noninteractive-element-interactions` | off |

---

## Quick-reference checklist

Before committing, verify:

- [ ] One named export per file; no default exports
- [ ] File name matches the exported name (kebab-case ↔ camelCase/PascalCase)
- [ ] `import type` used for type-only imports
- [ ] All imports at top; blank line after imports; no extensions on JS/TS imports
- [ ] Cyclomatic complexity ≤ 3 per function
- [ ] ≤ 7 statements per function
- [ ] ≤ 4 function parameters
- [ ] ≤ 3 nesting levels
- [ ] Curly braces on all control-flow blocks
- [ ] No `console`, `alert`, or `eval`
- [ ] No `await` inside a loop
- [ ] Promises end with `.catch()` or `.then(..., onRejected)`
- [ ] React components use function declarations; hooks follow naming conventions
- [ ] Double quotes, trailing commas, no bracket spacing (Prettier)
