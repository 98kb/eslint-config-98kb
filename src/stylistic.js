import {defineConfig} from "eslint/config";
import stylisticPlugin from "@stylistic/eslint-plugin";

export const stylistic = defineConfig({
  plugins: {
    "@stylistic/js": stylisticPlugin,
  },
  rules: {
    "@stylistic/js/indent": "off",
    "@stylistic/js/no-extra-semi": "off",
    "@stylistic/js/no-floating-decimal": "error",
    "@stylistic/js/wrap-iife": "error",
    "@stylistic/js/object-curly-spacing": "off",
    "@stylistic/js/lines-between-class-members": [
      "error",
      "always",
      {exceptAfterSingleLine: true},
    ],
    "@stylistic/js/padding-line-between-statements": [
      "error",
      {blankLine: "always", prev: "*", next: ["class", "function"]},
      {blankLine: "always", prev: ["class", "function"], next: "*"},
    ],
    "@stylistic/js/max-statements-per-line": [
      "error",
      {
        max: 1,
      },
    ],
  },
});
