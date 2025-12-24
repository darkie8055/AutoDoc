module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    // ---- Disable Google style rules (formatting only) ----
    "max-len": "off",
    indent: "off",
    "operator-linebreak": "off",
    "object-curly-spacing": "off",
    "comma-dangle": "off",

    // ---- Keep REAL safety rules ----
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "no-unused-vars": "warn",
    "no-undef": "error",
    "no-console": "off",
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
