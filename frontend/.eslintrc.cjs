module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-console': 'error',
    'no-debugger': 'error',
    'no-unused-vars': 'warn',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react-hooks/set-state-in-effect': 'off'
  },
  overrides: [
    {
      files: ['tests/**/*.js', '**/*.spec.js', '**/*.test.js', 'playwright.config.js', 'src/setupTests.js'],
      rules: {
        'no-console': 'off',
        'no-undef': 'off'
      },
      env: {
        node: true
      }
    }
  ]
}
