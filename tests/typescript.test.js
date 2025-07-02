import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import tsParser from '@typescript-eslint/parser';
import { filename } from '../src/rules/filename.js';
import { exportLimit } from '../src/rules/exportLimit.js';

// TypeScript-enabled RuleTester
const tsRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parser: tsParser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

describe('TypeScript specific tests', () => {
  it('allows interface export matching filename', () => {
    tsRuleTester.run('filename TypeScript interface', filename, {
      valid: [
        {
          code: 'export interface UserData {}',
          filename: 'user-data.ts',
        },
      ],
      invalid: [],
    });
  });

  it('allows type alias export matching filename', () => {
    tsRuleTester.run('filename TypeScript type alias', filename, {
      valid: [
        {
          code: 'export type ApiResponse = {};',
          filename: 'api-response.ts',
        },
      ],
      invalid: [],
    });
  });

  it('allows typed variable export matching filename', () => {
    tsRuleTester.run('filename TypeScript typed variable', filename, {
      valid: [
        {
          code: 'export const config: Config = {};',
          filename: 'config.ts',
        },
      ],
      invalid: [],
    });
  });

  it('reports error for interface name not matching filename', () => {
    tsRuleTester.run('filename TypeScript interface mismatch', filename, {
      valid: [],
      invalid: [
        {
          code: 'export interface WrongName {}',
          filename: 'user-data.ts',
          errors: [
            {
              messageId: 'namedExportMismatch',
              data: {
                exportName: 'WrongName',
                filename: 'user-data',
                expectedName: 'UserData',
              },
            },
          ],
        },
      ],
    });
  });

  it('reports error for type alias name not matching filename', () => {
    tsRuleTester.run('filename TypeScript type alias mismatch', filename, {
      valid: [],
      invalid: [
        {
          code: 'export type WrongType = {};',
          filename: 'api-response.ts',
          errors: [
            {
              messageId: 'namedExportMismatch',
              data: {
                exportName: 'WrongType',
                filename: 'api-response',
                expectedName: 'ApiResponse',
              },
            },
          ],
        },
      ],
    });
  });

  it('allows single TypeScript type export', () => {
    tsRuleTester.run('exportLimit TypeScript single type', exportLimit, {
      valid: [
        {
          code: 'export type UserData = {};',
          filename: 'test.ts',
        },
      ],
      invalid: [],
    });
  });

  it('allows single TypeScript interface export', () => {
    tsRuleTester.run('exportLimit TypeScript single interface', exportLimit, {
      valid: [
        {
          code: 'export interface ApiResponse {}',
          filename: 'test.ts',
        },
      ],
      invalid: [],
    });
  });

  it('allows one type export with one named export', () => {
    tsRuleTester.run('exportLimit TypeScript type and named export', exportLimit, {
      valid: [
        {
          code: `
            export type UserData = {};
            export const userService = {};
          `,
          filename: 'test.ts',
        },
      ],
      invalid: [],
    });
  });

  it('allows type-only export specifier with named export', () => {
    tsRuleTester.run('exportLimit TypeScript type-only export specifier', exportLimit, {
      valid: [
        {
          code: `
            type UserData = {};
            const userService = {};
            export type { UserData };
            export { userService };
          `,
          filename: 'test.ts',
        },
      ],
      invalid: [],
    });
  });

  it('reports error for multiple type exports', () => {
    tsRuleTester.run('exportLimit TypeScript multiple types', exportLimit, {
      valid: [],
      invalid: [
        {
          code: `
            export type First = {};
            export type Second = {};
          `,
          filename: 'test.ts',
          errors: [
            {
              messageId: 'tooManyTypeExports',
              data: { count: 2 },
            },
          ],
        },
      ],
    });
  });

  it('reports error for multiple interface exports', () => {
    tsRuleTester.run('exportLimit TypeScript multiple interfaces', exportLimit, {
      valid: [],
      invalid: [
        {
          code: `
            export interface First {}
            export interface Second {}
          `,
          filename: 'test.ts',
          errors: [
            {
              messageId: 'tooManyTypeExports',
              data: { count: 2 },
            },
          ],
        },
      ],
    });
  });

  it('reports error for type and named export when allowTypeExports is false', () => {
    tsRuleTester.run('exportLimit TypeScript allowTypeExports false', exportLimit, {
      valid: [],
      invalid: [
        {
          code: `
            export type UserData = {};
            export const userService = {};
          `,
          filename: 'test.ts',
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

  it('reports error for multiple regular exports with types', () => {
    tsRuleTester.run('exportLimit TypeScript multiple regular exports with type', exportLimit, {
      valid: [],
      invalid: [
        {
          code: `
            export const first = {};
            export const second = {};
            export type SomeType = {};
          `,
          filename: 'test.ts',
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
