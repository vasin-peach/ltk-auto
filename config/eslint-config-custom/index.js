module.exports = {
  extends: ["turbo", "prettier"],
  ignorePatterns: ["node_modules", "dist"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
  },
};
