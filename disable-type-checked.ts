// disable-type-checked.ts
import type { Linter } from "eslint";

const disableTypeChecked: Linter.FlatConfig = {
  rules: {
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/await-thenable": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "off",
    "@typescript-eslint/prefer-includes": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/prefer-optional-chain": "off",
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/unbound-method": "off",
  },
};

export default disableTypeChecked;
