import {defineConfig} from "eslint/config";
import jsxA11yEslint from "eslint-plugin-jsx-a11y";

export const jsxA11y = defineConfig(
  {
    ...jsxA11yEslint.flatConfigs.recommended,
  },
  {
    rules: {
      // jsx-a11y
      // error in recommended
      "jsx-a11y/anchor-has-content": "warn",
      "jsx-a11y/label-has-associated-control": "warn",
      "jsx-a11y/no-noninteractive-tabindex": "warn",
      "jsx-a11y/no-redundant-roles": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
      "jsx-a11y/anchor-is-valid": "off",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-autofocus": "off",
      "jsx-a11y/no-noninteractive-element-interactions": "off",

      // not in recommended
      "jsx-a11y/control-has-associated-label": "warn",
    },
  },
);
