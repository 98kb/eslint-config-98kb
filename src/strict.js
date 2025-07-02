import {defineConfig} from "eslint/config";
import exportLimitRule from "./rules/exportLimit.js";

export const strict = defineConfig({
  plugins: {
    "98kb": {
      rules: {
        "export-limit": exportLimitRule
      }
    }
  },
  rules: {
    "98kb/export-limit": ["error", {
      allowDefaultExport: false,
      allowTypeExports: true
    }]
  }
});
