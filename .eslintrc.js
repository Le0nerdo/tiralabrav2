module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
	},
	'extends': ['plugin:jest/recommended', 'eslint:recommended'],
	'parserOptions': {
		'ecmaVersion': 12,
		'sourceType': 'module'
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		]
	},
	'plugins': ['jest']
}
