import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({ baseDirectory: __dirname })

const eslintConfig = [
  ...compat.config({
    plugins: ['sort-exports', 'sort-keys'],
    parser: '@typescript-eslint/parser',
    extends: ['next/core-web-vitals', 'next/typescript'],
    parserOptions: {
      projectService: true,
      tsconfigRootDir: __dirname,
    },
    rules: {
      'sort-keys': 'off',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/consistent-type-definitions': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/prefer-destructuring': [
        'warn',
        {
          VariableDeclarator: {
            array: true,
            object: true,
          },
          AssignmentExpression: {
            array: true,
            object: true,
          },
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'react/no-array-index-key': 'warn',
      'react/boolean-prop-naming': [
        'warn',
        {
          rule: '^(is|has|should)[A-Z]([A-Za-z0-9]?)+',
        },
      ],
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          multiline: 'last',
          reservedFirst: true,
          shorthandLast: true,
        },
      ],
      'react/function-component-definition': [
        'warn',
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'arrow-function',
        },
      ],
      'sort-exports/sort-exports': [
        'warn',
        {
          sortDir: 'asc',
          sortExportKindFirst: 'type',
        },
      ],
    },
  }),
]

export default eslintConfig
