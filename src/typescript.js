import tseslint from "typescript-eslint";

export const typescript = tseslint.config({
  extends: [...tseslint.configs.recommended],
  files: ["**/*.{js,ts,tsx}"],
  name: "typescript-style-guide",
  rules: {
    "@typescript-eslint/no-empty-function": "error",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        disallowTypeAnnotations: false,
      },
    ],
    // override @typescript-eslint/eslint-recommended
    "no-unused-vars": "off",
    "no-array-constructor": "off",
    "@stylistic/js/no-extra-semi": "off",
    "prefer-rest-params": "warn",
    "prefer-spread": "warn",

    // does not properly work with ts
    "import/no-unresolved": "off",
  },
  settings: {"import/ignore": ["node_modules"]},
});
