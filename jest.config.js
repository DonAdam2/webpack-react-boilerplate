module.export = {
	// An array of glob patterns indicating a set of files for which coverage information should be collected
	collectCoverageFrom: [
		'src/**/*.{js,jsx,mjs}',
		'!src/**/store/*.{js,jsx}', // we dont want to test redux store
	],
	// The directory where Jest should output its coverage files
	coverageDirectory: 'coverage',
	// A list of reporter names that Jest uses when writing coverage reports
	coverageReporters: ['html', 'json'],
	// Make calling deprecated APIs throw helpful error messages
	errorOnDeprecated: true,
	// The minimum threshold enforcement for coverage results.
	coverageThreshold: {
		global: {
			statements: 80,
			branches: 80,
			functions: 80,
			lines: 80,
		},
	},
	// This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
	testURL: 'http://localhost',
	roots: ['<rootDir>/src'],
	// A map from regular expressions to paths to transformers
	transform: {
		'\\.(js|jsx)?$': 'babel-jest',
		'^.+\\.css$': '<rootDir>/cssTransform.js',
		'^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/fileTransform.js',
	},
	// The glob patterns Jest uses to detect test files
	testMatch: ['<rootDir>/src/**/>(*.)test.{js, jsx}'], // finds test
	// The test environment that will be used for testing
	testEnvironment: 'jest-environment-jsdom',
	moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
	testPathIgnorePatterns: ['/node_modules/'],
	setupFilesAfterEnv: ['<rootDir>/jest-setup.js'], // setupFiles before the tests are ran
};
