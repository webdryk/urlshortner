import { FlatCompat } from "@eslint/eslintrc";
import disableTypeChecked from "./disable-type-checked"; // or paste inline
import { dirname } from "path";
import { fileURLToPath } from "url";
import type { Linter } from "eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const config: Linter.FlatConfig[] = [
  // ✅ Base Next.js + TypeScript rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 🔕 Disable type-aware rules for dynamic routes
  {
    files: ["src/app/[*/]*/route.ts", "src/app/[*/]*/route.tsx"],
    ...disableTypeChecked,
  },

  // 🔕 Disable type-aware rules for API routes
  {
    files: ["src/app/api/**/*.ts", "src/app/api/**/*.tsx"],
    ...disableTypeChecked,
  },
];

export default config;
