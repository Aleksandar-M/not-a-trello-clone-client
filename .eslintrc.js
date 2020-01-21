module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
	'no-underscore-dangle': 0,
	'no-console': 0,
	"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
	'no-tabs': 0,
	'indent': [ 
		'error',
		'tab',
	  ],
	"react/jsx-indent": 0
},
};
