# Testing Guide for ESLint Custom Rules

This project uses [Vitest](https://vitest.dev/) as the testing framework for unit testing custom ESLint rules. The testing setup follows ESLint's best practices using the `RuleTester` utility.

## Test Structure

### Test Files

- `tests/filename.test.js` - Tests for the `filename` rule (JavaScript-only)
- `tests/exportLimit.test.js` - Tests for the `exportLimit` rule (JavaScript-only)
- `tests/typescript.test.js` - TypeScript-specific tests for both rules
- `tests/helpers.js` - Test utility functions

### Configuration

The test configuration is defined in `vitest.config.js`:

```javascript
export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.js'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.js'],
      exclude: ['src/index.js', 'tests/**'],
      reporter: ['text', 'html'],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    }
  }
});
```

## Running Tests

### Available Scripts

```bash
# Run tests once
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage

# Run tests with UI
pnpm test:ui

# Run linting and tests (build command)
pnpm build
```

### Test Commands

```bash
# Run all tests
vitest run

# Run tests in watch mode
vitest

# Run tests with coverage
vitest run --coverage

# Run tests with UI interface
vitest --ui
```

## Writing Tests for ESLint Rules

### Basic Test Structure

```javascript
import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import { yourRule } from '../src/rules/yourRule.js';

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

describe('yourRule', () => {
  it('should pass valid cases', () => {
    ruleTester.run('yourRule', yourRule, {
      valid: [
        // Valid test cases
        {
          code: 'export const validCode = {};',
          filename: 'valid-code.js',
        },
      ],
      invalid: [
        // Invalid test cases with expected errors
        {
          code: 'export const invalidCode = {};',
          filename: 'wrong-name.js',
          errors: [
            {
              messageId: 'expectedMessageId',
              data: {
                // Expected data for the error message
              },
            },
          ],
        },
      ],
    });
  });
});
```

### TypeScript Support

For TypeScript-specific tests, use the TypeScript parser:

```javascript
const tsRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});
```

## Test Categories

### 1. Valid Cases
Test cases that should **not** trigger the rule:
- Correct implementations
- Edge cases that should be allowed
- Different configurations that should pass

### 2. Invalid Cases
Test cases that **should** trigger the rule:
- Common violations
- Edge cases that should fail
- Expected error messages and data

### 3. Configuration Tests
Test different rule options:
- Default behavior
- Custom configuration options
- Boolean flags and their effects

### 4. Edge Cases
Test boundary conditions:
- Empty files
- Files with no exports
- Complex export patterns
- Re-exports

## Best Practices

### Test Organization
- Group related tests in describe blocks
- Use descriptive test names
- Test both positive and negative cases
- Include edge cases

### Test Data
- Use realistic code examples
- Test various code patterns
- Include TypeScript and JavaScript examples
- Test different file naming conventions

### Error Validation
- Always specify expected error message IDs
- Include expected error data
- Test error locations when relevant

### Coverage Goals
- Aim for 80%+ coverage on all metrics
- Test all rule options
- Cover all code paths
- Include error handling

## Continuous Integration

The test suite is designed to run in CI environments:
- Tests run in Node.js environment
- Coverage reports are generated
- Exit codes indicate test success/failure

## Debugging Tests

### Running Specific Tests
```bash
# Run tests matching a pattern
vitest run filename

# Run a specific test file
vitest run tests/filename.test.js

# Run tests in a specific describe block
vitest run --grep "filename rule"
```

### Debug Mode
```bash
# Run with verbose output
vitest run --verbose

# Run with debug logging
DEBUG=eslint:* vitest run
```

## Adding New Rules

When adding a new custom rule:

1. Create the rule in `src/rules/`
2. Create a test file in `tests/`
3. Follow the established patterns
4. Include both JavaScript and TypeScript tests if applicable
5. Update this documentation if needed

## Dependencies

- `vitest` - Test runner
- `@vitest/ui` - Test UI interface
- `@vitest/coverage-v8` - Coverage provider
- `eslint` - For RuleTester
- `@typescript-eslint/parser` - For TypeScript support
