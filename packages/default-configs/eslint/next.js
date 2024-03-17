import tsEsLint from 'typescript-eslint';
import jsdoc from 'eslint-plugin-jsdoc';
import nextEsLint from '@next/eslint-plugin-next';
import prettierEsLint from 'eslint-config-prettier';
import reactMemoEsLint from '@arthurgeron/react-usememo';

export default [
  nextEsLint.configs['next/recommended'],
  tsEsLint.configs.recommended,
  jsdoc.configs['plugin:jsdoc/recommended-typescript-typescript'],
  prettierEsLint,
  reactMemoEsLint,
  {
    plugins: {
      jsdoc,
    },
    globals: {
      React: true,
      JSX: true,
    },
    rules: {
      'react/no-unescaped-entities': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react/no-children-prop': 'off',
      'sort-imports': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@next/next/no-img-element': 'off',
      '@arthurgeron/react-usememo/require-usememo': [
        2,
        {
          strict: true,
          checkHookReturnObject: true,
          fix: { addImports: true },
          checkHookCalls: true,
          ignoredHookCallsNames: { useStateManagement: false },
        },
      ],
    },
  },
];
