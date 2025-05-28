import {defineConfig} from "eslint/config";
import importEslint from "eslint-plugin-import";

export const importConfig = defineConfig(
  {...importEslint.flatConfigs.errors},
  {
    rules: {
      "import/extensions": ["error", "never", {json: "always", md: "always"}],
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-absolute-path": "error",
      "import/no-amd": "error",
      "import/no-deprecated": "error",
      "import/no-duplicates": "error",
      "import/no-dynamic-require": "error",
      "import/no-extraneous-dependencies": "error",
      "import/no-mutable-exports": "error",
      "import/no-named-as-default": "error",
      "import/no-named-as-default-member": "error",
      "import/no-named-default": "error",
      "import/no-webpack-loader-syntax": "error",
      "import/no-useless-path-segments": ["error", {noUselessIndex: true}],
    },
  },
);
