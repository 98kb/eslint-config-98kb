import {defineConfig} from "eslint/config";
import promiseEslint from "eslint-plugin-promise";

export const promise = defineConfig(
  {
    ...promiseEslint.configs["flat/recommended"],
  },
  {
    rules: {
      // promise
      "promise/catch-or-return": ["warn", {allowThen: true}],
      "promise/no-return-wrap": ["error", {allowReject: true}],
      "promise/always-return": "off",
      "promise/avoid-new": "off",
    },
  },
);
