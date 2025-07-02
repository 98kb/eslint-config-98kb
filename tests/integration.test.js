import { describe, it, expect } from 'vitest';
import { filename } from '../src/rules/filename.js';
import { exportLimit } from '../src/rules/exportLimit.js';

describe('Rules Integration', () => {
  it('should export filename rule with correct meta', () => {
    expect(filename).toBeDefined();
    expect(filename.meta).toBeDefined();
    expect(filename.meta.type).toBe('suggestion');
    expect(filename.meta.docs.description).toBe(
      'Ensure file name matches exactly with the exported name'
    );
    expect(filename.create).toBeTypeOf('function');
  });

  it('should export exportLimit rule with correct meta', () => {
    expect(exportLimit).toBeDefined();
    expect(exportLimit.meta).toBeDefined();
    expect(exportLimit.meta.type).toBe('suggestion');
    expect(exportLimit.meta.docs.description).toBe(
      'Limit files to only one named export'
    );
    expect(exportLimit.create).toBeTypeOf('function');
  });

  it('should have proper schema definitions', () => {
    // filename rule schema
    expect(filename.meta.schema).toHaveLength(1);
    expect(filename.meta.schema[0].type).toBe('object');
    expect(filename.meta.schema[0].properties.ignoreIndexFiles).toBeDefined();

    // exportLimit rule schema
    expect(exportLimit.meta.schema).toHaveLength(1);
    expect(exportLimit.meta.schema[0].type).toBe('object');
    expect(exportLimit.meta.schema[0].properties.allowDefaultExport).toBeDefined();
    expect(exportLimit.meta.schema[0].properties.allowTypeExports).toBeDefined();
  });

  it('should have proper message definitions', () => {
    // filename rule messages
    expect(filename.meta.messages.namedExportMismatch).toBeDefined();
    expect(filename.meta.messages.namedExportMismatch).toContain('{{exportName}}');
    expect(filename.meta.messages.namedExportMismatch).toContain('{{filename}}');
    expect(filename.meta.messages.namedExportMismatch).toContain('{{expectedName}}');

    // exportLimit rule messages
    expect(exportLimit.meta.messages.tooManyNamedExports).toBeDefined();
    expect(exportLimit.meta.messages.tooManyTypeExports).toBeDefined();
    expect(exportLimit.meta.messages.firstNamedExport).toBeDefined();
  });

  it('should have appropriate fixable settings', () => {
    // These rules are not auto-fixable
    expect(filename.meta.fixable).toBeNull();
    expect(exportLimit.meta.fixable).toBeNull();
  });
});
