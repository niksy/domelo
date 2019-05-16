'use strict';

const path = require('path');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

const transpileDependencies = babel({
	include: 'node_modules/trim-newlines/**',
	runtimeHelpers: true,
	babelrc: false,
	configFile: path.resolve(__dirname, '.babelrc')
});
transpileDependencies.name = 'babel-transpileDependencies';

module.exports = {
	input: 'index.js',
	output: [
		{
			file: 'index.cjs.js',
			format: 'cjs',
			exports: 'named',
			sourcemap: true
		},
		{
			file: 'index.esm.js',
			format: 'esm',
			sourcemap: true
		}
	],
	plugins: [
		babel({
			exclude: 'node_modules/**'
		}),
		transpileDependencies,
		resolve(),
		commonjs()
	]
};
