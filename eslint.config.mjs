import js from "@eslint/js"
import json from "@eslint/json"
import markdown from "@eslint/markdown"
import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import tseslint from "typescript-eslint"

export default defineConfig([
  globalIgnores(["**/dist/", "**/coverage/", "**/.cache/", "**/.pnpm-store/", ".husky/_/"]),
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx,mts,cts}"],
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.browser, parserOptions: { ecmaFeatures: { jsx: true } } },
  },
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    extends: [tseslint.configs.recommended],
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
  {
    files: ["*.config.*", "scripts/**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: { globals: globals.node },
  },
  {
    files: ["**/*.{md,markdown}"],
    extends: [markdown.configs.recommended],
    language: "markdown/gfm",
  },
  {
    files: ["**/*.json"],
    extends: [json.configs.recommended],
    language: "json/json",
  },
  {
    files: ["**/*.jsonc", "**/tsconfig*.json"],
    extends: [json.configs.recommended],
    language: "json/jsonc",
    languageOptions: { allowTrailingCommas: true },
  },
])
