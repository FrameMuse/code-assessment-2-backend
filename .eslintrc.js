module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "unused-imports",
    "simple-import-sort"
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "default-case": "error",
    "no-multi-spaces": "error",
    "simple-import-sort/imports": "error",
    "semi": [
      "error",
      "never"
    ],
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1,

      }
    ],
    "quotes": [
      "error",
      "double",
      {
        "allowTemplateLiterals": true
      }
    ],
    // OFF
    "prettier/prettier": ["error", { semi: false }],
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
}
