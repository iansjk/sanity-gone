module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsConfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  ignorePatterns: [".eslintrc.js"],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "react", "prettier"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      {
        allowNumber: true,
      },
    ],
  },
};
