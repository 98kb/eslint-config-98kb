import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import { exportLimit } from '../src/rules/exportLimit.js';

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

describe('exportLimit rule', () => {
  it('allows single named export', () => {
    ruleTester.run('exportLimit single named export', exportLimit, {
      valid: [
        {
          code: 'export const userService = {};',
        },
      ],
      invalid: [],
    });
  });

  it('allows single function export', () => {
    ruleTester.run('exportLimit single function export', exportLimit, {
      valid: [
        {
          code: 'export function calculateTotal() {}',
        },
      ],
      invalid: [],
    });
  });

  it('allows single class export', () => {
    ruleTester.run('exportLimit single class export', exportLimit, {
      valid: [
        {
          code: 'export class UserManager {}',
        },
      ],
      invalid: [],
    });
  });

  it('allows default export only', () => {
    ruleTester.run('exportLimit default export only', exportLimit, {
      valid: [
        {
          code: 'export default {};',
        },
      ],
      invalid: [],
    });
  });

  it('allows named export with default export', () => {
    ruleTester.run('exportLimit named and default export', exportLimit, {
      valid: [
        {
          code: `
            export const api = {};
            export default {};
          `,
        },
      ],
      invalid: [],
    });
  });

  it('allows single export specifier', () => {
    ruleTester.run('exportLimit export specifier', exportLimit, {
      valid: [
        {
          code: `
            const userService = {};
            export { userService };
          `,
        },
      ],
      invalid: [],
    });
  });

  it('allows no exports', () => {
    ruleTester.run('exportLimit no exports', exportLimit, {
      valid: [
        {
          code: 'const internal = {};',
        },
      ],
      invalid: [],
    });
  });

  it('reports error for multiple named exports', () => {
    ruleTester.run('exportLimit multiple named exports', exportLimit, {
      valid: [],
      invalid: [
        {
          code: `
            export const userService = {};
            export const apiService = {};
          `,
          errors: [
            {
              messageId: 'tooManyNamedExports',
              data: { count: 2 },
            },
          ],
        },
      ],
    });
  });

  it('reports error for multiple function exports', () => {
    ruleTester.run('exportLimit multiple function exports', exportLimit, {
      valid: [],
      invalid: [
        {
          code: `
            export function first() {}
            export function second() {}
            export function third() {}
          `,
          errors: [
            {
              messageId: 'tooManyNamedExports',
              data: { count: 3 },
            },
            {
              messageId: 'tooManyNamedExports',
              data: { count: 3 },
            },
          ],
        },
      ],
    });
  });

  it('reports error for multiple class exports', () => {
    ruleTester.run('exportLimit multiple class exports', exportLimit, {
      valid: [],
      invalid: [
        {
          code: `
            export class First {}
            export class Second {}
          `,
          errors: [
            {
              messageId: 'tooManyNamedExports',
              data: { count: 2 },
            },
          ],
        },
      ],
    });
  });

  it('reports error for mixed multiple exports', () => {
    ruleTester.run('exportLimit mixed multiple exports', exportLimit, {
      valid: [],
      invalid: [
        {
          code: `
            export const service = {};
            export function helper() {}
            export class Manager {}
          `,
          errors: [
            {
              messageId: 'tooManyNamedExports',
              data: { count: 3 },
            },
            {
              messageId: 'tooManyNamedExports',
              data: { count: 3 },
            },
          ],
        },
      ],
    });
  });

  it('allows single export when allowTypeExports is false', () => {
    ruleTester.run('exportLimit single export with allowTypeExports false', exportLimit, {
      valid: [
        {
          code: 'export const userService = {};',
          options: [{ allowTypeExports: false }],
        },
      ],
      invalid: [],
    });
  });

  it('reports error for multiple exports when allowTypeExports is false', () => {
    ruleTester.run('exportLimit multiple exports with allowTypeExports false', exportLimit, {
      valid: [],
      invalid: [
        {
          code: `
            export const first = {};
            export const second = {};
          `,
          options: [{ allowTypeExports: false }],
          errors: [
            {
              messageId: 'tooManyNamedExports',
              data: { count: 2 },
            },
          ],
        },
      ],
    });
  });

  it('allows named export when allowDefaultExport is false', () => {
    ruleTester.run('exportLimit named export with allowDefaultExport false', exportLimit, {
      valid: [
        {
          code: 'export const userService = {};',
          options: [{ allowDefaultExport: false }],
        },
      ],
      invalid: [],
    });
  });

  it('reports error for multiple named exports when allowDefaultExport is false', () => {
    ruleTester.run('exportLimit multiple named exports with allowDefaultExport false', exportLimit, {
      valid: [],
      invalid: [
        {
          code: `
            export const first = {};
            export const second = {};
          `,
          options: [{ allowDefaultExport: false }],
          errors: [
            {
              messageId: 'tooManyNamedExports',
              data: { count: 2 },
            },
          ],
        },
      ],
    });
  });

  it('allows empty file', () => {
    ruleTester.run('exportLimit empty file', exportLimit, {
      valid: [
        {
          code: '',
        },
      ],
      invalid: [],
    });
  });

  it('allows imports only', () => {
    ruleTester.run('exportLimit imports only', exportLimit, {
      valid: [
        {
          code: 'import { something } from "somewhere";',
        },
      ],
      invalid: [],
    });
  });

  it('allows variable declaration without export', () => {
    ruleTester.run('exportLimit variable without export', exportLimit, {
      valid: [
        {
          code: 'const internal = {};',
        },
      ],
      invalid: [],
    });
  });

  it('allows single re-export', () => {
    ruleTester.run('exportLimit single re-export', exportLimit, {
      valid: [
        {
          code: 'export { something } from "somewhere";',
        },
      ],
      invalid: [],
    });
  });

  it('reports error for multiple re-exports', () => {
    ruleTester.run('exportLimit multiple re-exports', exportLimit, {
      valid: [],
      invalid: [
        {
          code: `
            export { first } from "somewhere";
            export { second } from "somewhere";
          `,
          errors: [
            {
              messageId: 'tooManyNamedExports',
              data: { count: 2 },
            },
          ],
        },
      ],
    });
  });
});
