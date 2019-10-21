// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      classes: true
    }
  },
  env: {
    node: true,
    es6: true
  },
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unused-expressions': 0,
    'no-unused-vars': 0,
    'linebreak-style': [0, 'error', 'windows'],
    'comma-dangle': ['error', 'only-multiline'],
    // allow async-await
    'generator-star-spacing': 'off',
    'semi': ['error', 'always'],
    "no-multi-spaces": 1
  }
}
