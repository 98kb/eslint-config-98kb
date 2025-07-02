import {defineConfig} from "eslint/config";
import {exportLimit} from "./rules/exportLimit.js";
import {filename} from "./rules/filename.js";

export const strict = defineConfig({
  plugins: {
    "98kb": {
      rules: {
        "export-limit": exportLimit,
        filename,
      },
    },
  },
  rules: {
    "98kb/export-limit": [
      "error",
      {
        allowDefaultExport: false,
        allowTypeExports: true,
      },
    ],
    "98kb/filename": [
      "error",
      {
        ignoreIndexFiles: true,
      },
    ],
  },
});
