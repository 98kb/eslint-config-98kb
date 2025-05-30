import {defineConfig} from "eslint/config";
import nodePlugin from "eslint-plugin-n";

export const base = defineConfig({
  plugins: {
    n: nodePlugin,
  },
  rules: {
    "block-scoped-var": "error",
    curly: "error",
    eqeqeq: ["error", "smart"],
    "guard-for-in": "error",
    "n/handle-callback-err": "error",
    "no-alert": "error",
    "no-await-in-loop": "error",
    "no-caller": "error",
    "no-console": "error",
    "no-constructor-return": "error",
    "no-continue": "error",
    "no-div-regex": "error",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-extra-label": "error",
    "no-implied-eval": "error",
    "no-iterator": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-loop-func": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-new-native-nonconstructor": "error",
    "no-promise-executor-return": "error",
    "no-proto": "error",
    "no-restricted-properties": "error",
    "no-return-assign": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-template-curly-in-string": "error",
    "no-throw-literal": "error",
    "no-unmodified-loop-condition": "error",
    "no-unsafe-optional-chaining": "error",
    "no-unused-expressions": "error",
    "no-useless-call": "error",
    "no-useless-concat": "error",
    "no-useless-return": "error",
    "no-void": "error",
    radix: "error",
    "require-atomic-updates": "error",
    yoda: "error",

    // stylistic
    camelcase: "warn",
    "consistent-this": ["warn", "that"],
    "func-name-matching": "error",
    "func-style": ["error", "declaration", {allowArrowFunctions: true}],
    "no-else-return": "off",
    "no-lonely-if": "error",
    "no-multi-assign": "warn",
    "no-object-constructor": "warn",
    "no-underscore-dangle": "off",
    "no-unneeded-ternary": "warn",
    "one-var": ["warn", "never"],
    "operator-assignment": "warn",

    // es2015
    "no-duplicate-imports": "error",
    "no-useless-computed-key": "error",
    "no-useless-rename": "error",
    "object-shorthand": "error",
    "prefer-arrow-callback": "error",
    "prefer-destructuring": ["warn", {object: true, array: false}],
    "prefer-numeric-literals": "warn",
    "no-unused-vars": "off",
    "no-array-constructor": "off",
    "prefer-rest-params": "warn",
    "prefer-spread": "warn",
  },
});
