module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['turbo', 'prettier', 'plugin:@typescript-eslint/recommended'],
  ignorePatterns: ['node_modules', 'dist'],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'turbo/no-undeclared-env-vars': 'off',
  },
};
