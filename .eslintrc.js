module.exports = {
  env: {
    browser: true,
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  plugins: ['node', 'promise', 'import', 'prettier', '@typescript-eslint'],
  rules: {
    // eqeqeq: 'error',
    // 'no-console': 'warn',
    // 'no-undef': 'off',
    // 'no-unused-vars': 'off',
    // 'prettier/prettier': 'error',
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/no-explicit-any': 'error',
    // '@typescript-eslint/no-unused-vars': 'warn'
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ]
  },
  ignorePatterns: ['node_modules', 'build', 'dist', 'public']
};
