import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginImportHelpers from 'eslint-plugin-import-helpers';
import prettier from 'eslint-plugin-prettier';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
  ),
  {
    plugins: {
      prettier,
      import: eslintPluginImport,
      'import-helpers': eslintPluginImportHelpers,
    },
    rules: {
      'prettier/prettier': 'error',
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: [
            '/use client/',
            ['/react/', '/clsx/'],
            '/next/',
            '/@/app/ui/',
            '/@/app/lib/',
            ['parent', 'sibling', 'index'],
          ],
          alphabetize: { order: 'asc', ignoreCase: true },
        },
      ],
    },
    ignores:[
      '**/.next/**',   // Ignorar a pasta .next
      '**/node_modules/**',  // Ignorar node_modules
      '**/package-lock.json', // Ignorar arquivos de lock
      '**/yarn.lock'
    ]
  },
];
