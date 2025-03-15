import parser from "@angular-eslint/template-parser";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    files: ["**/*.ts"],
    extends: compat.extends(
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@angular-eslint/recommended",
      "plugin:@angular-eslint/template/process-inline-templates",
      "plugin:prettier/recommended",
    ),
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "script",
      parserOptions: {
        project: ["tsconfig.json"],
        createDefaultProgram: true,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-empty-function": "error",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/consistent-type-assertions": "warn",
      "@angular-eslint/no-input-rename": "warn",
      "@angular-eslint/no-output-rename": "warn",
      "@angular-eslint/component-class-suffix": [
        "error",
        { suffixes: ["Component"] },
      ],
      "prettier/prettier": [
        "error",
        {
          semi: true,
          singleQuote: true,
          printWidth: 80,
          tabWidth: 2,
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: compat.extends("plugin:@angular-eslint/template/recommended"),
    languageOptions: {
      parser: parser,
    },
    rules: {
      "@angular-eslint/template/no-call-expression": "warn",
    },
  },
]);
