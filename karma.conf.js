'use strict';

const path = require('path');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const nodeBuiltins = require('rollup-plugin-node-builtins');
const globals = require('rollup-plugin-node-globals');
const babel = require('rollup-plugin-babel');
const istanbul = require('rollup-plugin-istanbul');
const polyfill = require('rollup-plugin-polyfill');
const rollupConfig = require('./rollup.config');

let config;

const local = typeof process.env.CI === 'undefined' || process.env.CI === 'false';
const port = 9001;

if ( local ) {
	config = {
		browsers: ['Chrome'],
	};
} else {
	config = {
		username: process.env.BROWSER_STACK_USERNAME,
		accessKey: process.env.BROWSER_STACK_ACCESS_KEY,
		hostname: 'bs-local.com',
		browserStack: {
			startTunnel: true,
			project: 'domelo',
			name: 'Automated (Karma)',
			build: 'Automated (Karma)'
		},
		customLaunchers: {
			'BS-Chrome': {
				base: 'BrowserStack',
				browser: 'Chrome',
				os: 'Windows',
				'os_version': '7',
				project: 'domelo',
				build: 'Automated (Karma)',
				name: 'Chrome'
			},
			'BS-Firefox': {
				base: 'BrowserStack',
				browser: 'Firefox',
				os: 'Windows',
				'os_version': '7',
				project: 'domelo',
				build: 'Automated (Karma)',
				name: 'Firefox'
			},
			'BS-IE9': {
				base: 'BrowserStack',
				browser: 'IE',
				'browser_version': '9',
				os: 'Windows',
				'os_version': '7',
				project: 'domelo',
				build: 'Automated (Karma)',
				name: 'IE9'
			},
			'BS-IE11': {
				base: 'BrowserStack',
				browser: 'IE',
				'browser_version': '11',
				os: 'Windows',
				'os_version': '7',
				project: 'domelo',
				build: 'Automated (Karma)',
				name: 'IE11'
			}
		},
		browsers: ['BS-Chrome', 'BS-Firefox', 'BS-IE9', 'BS-IE11']
	};
}

module.exports = function ( baseConfig ) {

	baseConfig.set(Object.assign({
		basePath: '',
		frameworks: ['mocha', 'fixture'],
		files: [
			'test/**/*.html',
			{ pattern: 'test/**/*.js', watched: false }
		],
		exclude: [],
		preprocessors: {
			'test/**/*.html': ['html2js'],
			'test/**/*.js': ['rollup', 'sourcemap']
		},
		reporters: ['mocha', 'coverage-istanbul'],
		port: port,
		colors: true,
		logLevel: baseConfig.LOG_INFO,
		autoWatch: false,
		client: {
			captureConsole: true
		},
		browserConsoleLogOptions: {
			level: 'log',
			format: '%b %T: %m',
			terminal: true
		},
		rollupPreprocessor: {
			plugins: [
				polyfill(path.resolve(__dirname, 'test'), ['dom4']),
				nodeBuiltins(),
				babel({
					exclude: 'node_modules/**',
					runtimeHelpers: true
				}),
				resolve({
					preferBuiltins: true
				}),
				commonjs(),
				globals(),
				...rollupConfig.plugins.filter(({ name }) => !['babel'].includes(name)),
				istanbul({
					exclude: ['test/**/*.js', 'node_modules/**/*']
				})
			],
			output: {
				format: 'iife',
				name: 'domelo',
				sourcemap: 'inline',
				intro: 'window.TYPED_ARRAY_SUPPORT = false;' // IE9
			}
		},
		coverageIstanbulReporter: {
			dir: path.join(__dirname, 'coverage/%browser%'),
			fixWebpackSourcePaths: true,
			reports: ['html', 'text'],
			thresholds: {
				global: {
					statements: 80
				}
			}
		},
		singleRun: true,
		concurrency: Infinity
	}, config));

};
