/**
 * Custom ESLint rule to ensure file name matches exactly with the exported name
 * This rule helps maintain consistent naming conventions between files and their exports
 * Supports both named exports and default exports
 */
import path from "path";

export const filename = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Ensure file name matches exactly with the exported name",
      category: "Best Practices",
      recommended: false,
    },
    fixable: null,
    schema: [
      {
        type: "object",
        properties: {
          ignoreIndexFiles: {
            type: "boolean",
            description: "Whether to ignore index files",
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      namedExportMismatch:
        "Named export '{{exportName}}' does not match filename '{{filename}}'. Expected export name to be '{{expectedName}}'.",
    },
  },

  create(context) {
    const options = context.options[0] || {};
    const ignoreIndexFiles = options.ignoreIndexFiles !== false;

    const filename = context.getFilename();
    const parsedPath = path.parse(filename);
    const filenameWithoutExt = parsedPath.name;

    function getExportName(node) {
      if (node.declaration?.type === "VariableDeclaration") {
        const declarator = node.declaration.declarations[0];
        if (declarator?.id?.type === "Identifier") {
          return declarator.id.name;
        }
      }

      if (isDeclarationType(node.declaration)) {
        return node.declaration.id?.name || null;
      }

      if (node.specifiers?.[0]?.type === "ExportSpecifier") {
        return node.specifiers[0].exported.name;
      }

      return null;
    }

    function isDeclarationType(declaration) {
      const types = [
        "FunctionDeclaration",
        "ClassDeclaration",
        "TSInterfaceDeclaration",
        "TSTypeAliasDeclaration",
      ];
      return types.includes(declaration?.type);
    }

    function isTypeExport(node) {
      // Check if this is a TypeScript type export
      return (
        node.exportKind === "type" ||
        (node.declaration &&
          node.declaration.type === "TSTypeAliasDeclaration") ||
        (node.declaration &&
          node.declaration.type === "TSInterfaceDeclaration") ||
        (node.specifiers &&
          node.specifiers.some((spec) => spec.exportKind === "type"))
      );
    }

    function toCamelCase(str) {
      return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
    }

    function toPascalCase(str) {
      const camelCase = toCamelCase(str);
      return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
    }

    function checkNameMatch(exportName, node) {
      if (!exportName) return;

      const expectedCamelCase = toCamelCase(filenameWithoutExt);
      const expectedPascalCase = toPascalCase(filenameWithoutExt);

      const isMatch =
        exportName === filenameWithoutExt ||
        exportName === expectedCamelCase ||
        exportName === expectedPascalCase;

      if (!isMatch) {
        const expectedName = getExpectedName(exportName, {
          camelCase: expectedCamelCase,
          pascalCase: expectedPascalCase,
        });

        context.report({
          node,
          messageId: "namedExportMismatch",
          data: {
            exportName,
            filename: filenameWithoutExt,
            expectedName,
          },
        });
      }
    }

    function getExpectedName(exportName, options) {
      if (exportName === exportName.toLowerCase()) {
        return options.camelCase;
      }
      if (exportName[0] === exportName[0].toUpperCase()) {
        return options.pascalCase;
      }
      return options.camelCase;
    }

    if (ignoreIndexFiles && filenameWithoutExt === "index") {
      return {};
    }

    return {
      ExportNamedDeclaration(node) {
        // Skip filename convention check for type exports
        if (isTypeExport(node)) {
          return;
        }

        const exportName = getExportName(node);
        checkNameMatch(exportName, node);
      },
    };
  },
};
