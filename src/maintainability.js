import {defineConfig} from "eslint/config";

export const maintainability = defineConfig({
  rules: {
    complexity: ["error", 3],
    "max-params": ["error", 4],
    "max-statements": ["error", 7],
    "@stylistic/js/max-statements-per-line": [
      "error",
      {
        max: 1,
      },
    ],
    "max-nested-callbacks": ["error", 2],
    "max-depth": [
      "error",
      {
        max: 3,
      },
    ],
    "no-useless-constructor": "off",
  },
});
