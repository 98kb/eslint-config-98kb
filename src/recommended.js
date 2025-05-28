import {defineConfig} from "eslint/config";
import {base} from "./base.js";
import {importConfig} from "./import.js";
import {maintainability} from "./maintainability.js";
import {promise} from "./promise.js";
import {stylistic} from "./stylistic.js";
import prettier from "eslint-plugin-prettier/recommended";

export const recommended = defineConfig(
  base,
  importConfig,
  maintainability,
  promise,
  stylistic,
  prettier,
);
