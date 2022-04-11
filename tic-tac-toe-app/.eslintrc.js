module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true
  },
  extends: [
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'prettier',
    'eslint:recommended',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
  },
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaFeatures: {
      jsx: true,
    },
    warnOnUnsupportedTypeScriptVersion: false,
  },
  // https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/linting/TROUBLESHOOTING.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
}
