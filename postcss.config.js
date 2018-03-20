const easyImport = require('postcss-easy-import');
const autoprefixer = require('autoprefixer');

module.exports = {
	plugins: [
		easyImport({ prefix: '_' }), // Keep this first
		autoprefixer(), // So imports are auto-prefixed too
	],
};
