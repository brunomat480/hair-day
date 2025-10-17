import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "indent": ["error", 2],
      "quotes": ["error", "single", { "avoidEscape": true }],
      "no-var": "error",
      "semi": ["error", "always"],
      "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
      "arrow-parens": ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      "@typescript-eslint/no-empty-object-type": "off",
      "object-curly-spacing": ["error", "always"],
      "object-curly-newline": ["error", {
      "ObjectExpression": {
        "multiline": true,
        "minProperties": 2
      },
      "ObjectPattern": {
        "multiline": true,
        "minProperties": 3
      },
      "ImportDeclaration": "never",
      "ExportDeclaration": {
        "multiline": true,
        "minProperties": 3
      }
    }],
    }
  },
])
