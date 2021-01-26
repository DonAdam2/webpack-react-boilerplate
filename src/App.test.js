import React from 'react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
	beforeAll(() => {
		render(<App />);
	});

	test('renders hello world', () => {
		const text = screen.getByText('Hello World');
		expect(text).toBeInTheDocument();
	});
});
