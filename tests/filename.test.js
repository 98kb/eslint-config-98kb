import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import { filename } from '../src/rules/filename.js';

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

describe('filename rule', () => {
  it('allows exact filename match', () => {
    ruleTester.run('filename exact match', filename, {
      valid: [
        {
          code: 'export const userService = {};',
          filename: 'userService.js',
        },
      ],
      invalid: [],
    });
  });

  it('allows camelCase export matching kebab-case filename', () => {
    ruleTester.run('filename camelCase from kebab-case', filename, {
      valid: [
        {
          code: 'export const userService = {};',
          filename: 'user-service.js',
        },
      ],
      invalid: [],
    });
  });

  it('allows PascalCase export matching kebab-case filename', () => {
    ruleTester.run('filename PascalCase from kebab-case', filename, {
      valid: [
        {
          code: 'export class UserService {}',
          filename: 'user-service.js',
        },
      ],
      invalid: [],
    });
  });

  it('allows function declaration matching kebab-case filename', () => {
    ruleTester.run('filename function declaration', filename, {
      valid: [
        {
          code: 'export function calculateTotal() {}',
          filename: 'calculate-total.js',
        },
      ],
      invalid: [],
    });
  });

  it('ignores index files by default', () => {
    ruleTester.run('filename ignore index files', filename, {
      valid: [
        {
          code: 'export const anything = {};',
          filename: 'index.js',
        },
      ],
      invalid: [],
    });
  });

  it('allows export specifier matching filename', () => {
    ruleTester.run('filename export specifier', filename, {
      valid: [
        {
          code: 'const userService = {}; export { userService };',
          filename: 'user-service.js',
        },
      ],
      invalid: [],
    });
  });

  it('reports error for camelCase export not matching filename', () => {
    ruleTester.run('filename camelCase mismatch', filename, {
      valid: [],
      invalid: [
        {
          code: 'export const wrongName = {};',
          filename: 'user-service.js',
          errors: [
            {
              messageId: 'namedExportMismatch',
              data: {
                exportName: 'wrongName',
                filename: 'user-service',
                expectedName: 'userService',
              },
            },
          ],
        },
      ],
    });
  });

  it('reports error for PascalCase export not matching filename', () => {
    ruleTester.run('filename PascalCase mismatch', filename, {
      valid: [],
      invalid: [
        {
          code: 'export class WrongName {}',
          filename: 'user-service.js',
          errors: [
            {
              messageId: 'namedExportMismatch',
              data: {
                exportName: 'WrongName',
                filename: 'user-service',
                expectedName: 'UserService',
              },
            },
          ],
        },
      ],
    });
  });

  it('reports error for function name not matching filename', () => {
    ruleTester.run('filename function mismatch', filename, {
      valid: [],
      invalid: [
        {
          code: 'export function wrongFunction() {}',
          filename: 'calculate-total.js',
          errors: [
            {
              messageId: 'namedExportMismatch',
              data: {
                exportName: 'wrongFunction',
                filename: 'calculate-total',
                expectedName: 'calculateTotal',
              },
            },
          ],
        },
      ],
    });
  });

  it('reports error for variable declaration not matching filename', () => {
    ruleTester.run('filename variable mismatch', filename, {
      valid: [],
      invalid: [
        {
          code: 'export const badName = {};',
          filename: 'good-name.js',
          errors: [
            {
              messageId: 'namedExportMismatch',
              data: {
                exportName: 'badName',
                filename: 'good-name',
                expectedName: 'goodName',
              },
            },
          ],
        },
      ],
    });
  });

  it('reports error for export specifier not matching filename', () => {
    ruleTester.run('filename export specifier mismatch', filename, {
      valid: [],
      invalid: [
        {
          code: 'const wrongExport = {}; export { wrongExport };',
          filename: 'correct-name.js',
          errors: [
            {
              messageId: 'namedExportMismatch',
              data: {
                exportName: 'wrongExport',
                filename: 'correct-name',
                expectedName: 'correctName',
              },
            },
          ],
        },
      ],
    });
  });

  it('allows index export when ignoreIndexFiles is false', () => {
    ruleTester.run('filename index with ignoreIndexFiles false', filename, {
      valid: [
        {
          code: 'export const index = {};',
          filename: 'index.js',
          options: [{ ignoreIndexFiles: false }],
        },
      ],
      invalid: [],
    });
  });

  it('reports error for non-matching index export when ignoreIndexFiles is false', () => {
    ruleTester.run('filename index mismatch with ignoreIndexFiles false', filename, {
      valid: [],
      invalid: [
        {
          code: 'export const wrongName = {};',
          filename: 'index.js',
          options: [{ ignoreIndexFiles: false }],
          errors: [
            {
              messageId: 'namedExportMismatch',
              data: {
                exportName: 'wrongName',
                filename: 'index',
                expectedName: 'index',
              },
            },
          ],
        },
      ],
    });
  });

  it('does not trigger rule when there are no exports', () => {
    ruleTester.run('filename no exports', filename, {
      valid: [
        {
          code: 'const internal = {};',
          filename: 'any-name.js',
        },
      ],
      invalid: [],
    });
  });

  it('does not trigger rule for default exports', () => {
    ruleTester.run('filename default export', filename, {
      valid: [
        {
          code: 'export default {};',
          filename: 'any-name.js',
        },
      ],
      invalid: [],
    });
  });

  it('only checks named exports when both named and default exports exist', () => {
    ruleTester.run('filename mixed exports', filename, {
      valid: [
        {
          code: 'export const correctName = {}; export default {};',
          filename: 'correct-name.js',
        },
      ],
      invalid: [],
    });
  });
});
