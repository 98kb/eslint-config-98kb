import {recommended, strict} from "./src";
import {defineConfig, globalIgnores} from "eslint/config";

export default defineConfig([
  globalIgnores(["**/node_modules/**"]),
  ...recommended,
  ...strict,
  {
    rules: {
      "import/extensions": "off",
    },
  },
]);
