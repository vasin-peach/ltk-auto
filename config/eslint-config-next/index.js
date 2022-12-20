module.exports = {
  extends: ['turbo', 'prettier', 'tailwindcss', 'next/core-web-vitals'],
  ignorePatterns: ['node_modules', 'dist'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
    'turbo/no-undeclared-env-vars': 'off',
  },
}
