module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ['node_modules', 'dist'],
  extends: [
    'turbo',
    'prettier',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['react'],
  rules: {
    'turbo/no-undeclared-env-vars': 'off',
  },
};
