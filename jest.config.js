module.export = {
	roots: ['<rootDir>/src'],
	transform: {
		'\\.(js|jsx)?$': 'babel-jest',
	},
	testMatch: ['<rootDir>/src/**/>(*.)test.{js, jsx}'], // finds test
	moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
	testPathIgnorePatterns: ['/node_modules/'],
	setupFilesAfterEnv: ['<rootDir>/jest-setup.js'], // setupFiles before the tests are ran
};
