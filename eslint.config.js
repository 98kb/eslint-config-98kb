import {recommended} from "./src";
import {defineConfig, globalIgnores} from "eslint/config";

export default defineConfig([
  globalIgnores(["**/node_modules/**"]),
  ...recommended,
  {
    rules: {
      "import/extensions": "off",
    },
  },
]);
