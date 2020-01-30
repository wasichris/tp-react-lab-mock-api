module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  plugins: ["node"],
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'standard'
  ],
  env: {
    "es6": true,
    'node': true
  },
  rules: {
    'node/exports-style': ['error', 'module.exports'],
    'no-console': 'warn',
    'no-unused-vars': 'warn'
  }
}
