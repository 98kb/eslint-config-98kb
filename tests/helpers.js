import { createRequire } from 'module';

// Helper to create require for loading CommonJS modules in ESM
export const require = createRequire(import.meta.url);

// Test helper functions
export function createTestContext(filename = 'test.js', options = []) {
  return {
    getFilename: () => filename,
    options,
    report: ({ node, messageId, data }) => ({
      node,
      messageId,
      data
    })
  };
}

// Mock ESLint context for testing
export function mockESLintContext(overrides = {}) {
  return {
    getFilename: () => 'test.js',
    options: [],
    report: ({ node, messageId, data }) => {
      // Store reports for assertions
      mockESLintContext.reports = mockESLintContext.reports || [];
      mockESLintContext.reports.push({ node, messageId, data });
    },
    ...overrides
  };
}
