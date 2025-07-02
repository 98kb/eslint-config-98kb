/**
 * Custom ESLint rule to limit files to only one named export
 * This rule helps maintain clean module interfaces and prevents overly complex modules
 * When allowTypeExports is true, allows one type export alongside one named export
 */
export const exportLimit = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Limit files to only one named export",
      category: "Best Practices",
      recommended: false,
    },
    fixable: null,
    schema: [
      {
        type: "object",
        properties: {
          allowDefaultExport: {
            type: "boolean",
          },
          allowTypeExports: {
            type: "boolean",
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      tooManyNamedExports:
        "Only one named export is allowed per file. Found {{count}} named exports.",
      tooManyTypeExports:
        "Only one type export is allowed per file. Found {{count}} type exports.",
      firstNamedExport: "First named export was here.",
    },
  },

  create(context) {
    const options = context.options[0] || {};
    const allowDefaultExport = options.allowDefaultExport !== false; // default true
    const allowTypeExports = options.allowTypeExports !== false; // default true

    let namedExports = [];
    let defaultExport = null;

    function isTypeExport(node) {
      // Check if this is a TypeScript type export
      return (
        node.exportKind === "type" ||
        (node.declaration &&
          node.declaration.type === "TSTypeAliasDeclaration") ||
        (node.declaration &&
          node.declaration.type === "TSInterfaceDeclaration") ||
        (node.specifiers &&
          node.specifiers.some(spec => spec.exportKind === "type"))
      );
    }

    function checkNamedExports() {
      if (allowTypeExports) {
        // Separate type exports from regular named exports
        const typeExports = namedExports.filter(exp => isTypeExport(exp));
        const regularNamedExports = namedExports.filter(
          exp => !isTypeExport(exp),
        );

        // Allow up to 1 type export and 1 regular named export
        if (typeExports.length > 1) {
          typeExports.slice(1).forEach(exportNode => {
            context.report({
              node: exportNode,
              messageId: "tooManyTypeExports",
              data: {
                count: typeExports.length,
              },
            });
          });
        }

        if (regularNamedExports.length > 1) {
          regularNamedExports.slice(1).forEach(exportNode => {
            context.report({
              node: exportNode,
              messageId: "tooManyNamedExports",
              data: {
                count: regularNamedExports.length,
              },
            });
          });
        }
      } else {
        // When type exports are not allowed separately, treat all as named exports
        if (namedExports.length > 1) {
          namedExports.slice(1).forEach(exportNode => {
            context.report({
              node: exportNode,
              messageId: "tooManyNamedExports",
              data: {
                count: namedExports.length,
              },
            });
          });
        }
      }
    }

    return {
      // Handle named exports: export { name } or export const name = ...
      ExportNamedDeclaration(node) {
        namedExports.push(node);
      },

      // Handle default exports: export default ...
      ExportDefaultDeclaration(node) {
        defaultExport = node;
      },

      // Check all exports at the end of the file
      "Program:exit"() {
        checkNamedExports();
      },
    };
  },
};
