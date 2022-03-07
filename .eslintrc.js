module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:storybook/recommended",
    "plugin:prettier/recommended",
    "next/core-web-vitals",
  ],
  plugins: ["@typescript-eslint", "react", "react-hooks", "prettier"],
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
      ],
      parserOptions: {
        project: "./tsconfig.json",
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

        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            varsIgnorePattern: "^_",
          },
        ],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
      },
    },
  ],
  rules: {
    "prettier/prettier": "warn",
    "no-unused-vars": [
      "warn",
      {
        varsIgnorePattern: "^_",
      },
    ],
  },
};
