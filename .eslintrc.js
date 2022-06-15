module.exports = {
    'extends': ['plugin:vue/essential'],
    'env': {
      'es6': true,
      'webextensions': true,
      'browser': true,
    },
    'parserOptions': {
      'parser': 'babel-eslint',
      'ecmaVersion': 6,
      'sourceType': 'module'
    },
    'rules': {
      'linebreak-style': 0,
      "prefer-destructuring": 0,
      "vue/no-unused-components": 0
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['~', './source'],
          ],
          extensions: ['.js', '.vue'],
        },
      },
    },
  };
