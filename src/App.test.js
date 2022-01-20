import React from 'react';
import { render, screen } from '@testing-library/react';
//component
import App from './App';

describe('App Component', () => {
	test('renders webpack react boilerplate', () => {
		render(<App />);
		const linkElement = screen.getByText(/webpack react boilerplate/i);
		expect(linkElement).toBeInTheDocument();
	});
});
