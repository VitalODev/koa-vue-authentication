module.exports = {
  extends: ['plugin:vue-libs/recommended'],
  rules: {
    'no-console': process.env.NODE_ENV
    === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV
    === 'production' ? 'error' : 'off',
    'eqeqeq': 'off',
    'no-unused-vars': 'warn'
  },
}
