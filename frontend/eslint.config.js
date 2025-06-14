// eslint.config.js
import expo from 'eslint-config-expo/flat';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    ...expo,
    ignores: ['dist/**', 'node_modules/**'],
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...expo.rules,
      'react/display-name': 'off',
      'import/no-unresolved': ['error', { ignore: ['expo-sqlite'] }],
    },
  },
];
