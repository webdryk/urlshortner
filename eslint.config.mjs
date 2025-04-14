import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Define __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create compatibility layer for ESLint Flat config
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extend Next.js ESLint presets
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Override rules
  {
    rules: {
      // Disable the rule so @ts-ignore won't cause an error
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
];

export default eslintConfig;
