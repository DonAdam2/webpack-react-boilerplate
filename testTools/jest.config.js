module.exports = {
	// An array of glob patterns indicating a set of files for which coverage information should be collected
	collectCoverageFrom: [
		'src/**/*.{js,jsx}',
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
	roots: ['<rootDir>/../src'],
	// A map from regular expressions to paths to transformers
	transform: {
		'^.+\\.(jsx|js)$': 'babel-jest',
	},
	moduleNameMapper: {
		'^.+\\.(css|scss)$': 'identity-obj-proxy',
		'\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/fileTransform.js',
	},
	// The test environment that will be used for testing
	testEnvironment: 'jest-environment-jsdom',
	moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
	testPathIgnorePatterns: ['<rootDir>/../node_modules'],
	setupFilesAfterEnv: ['<rootDir>/jest-setup.js'], // setupFiles before the tests are ran
};
