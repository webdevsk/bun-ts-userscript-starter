import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
// sets up both eslint plugin and eslint config in one go
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"

export default defineConfig([
  globalIgnores(["dist/*"]),
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.browser },
  },
  eslint.configs.recommended,
  // @ts-expect-error Works as expected but Linter shows error in this project for some reason
  tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "prettier/prettier": "off",
    },
  },
])
