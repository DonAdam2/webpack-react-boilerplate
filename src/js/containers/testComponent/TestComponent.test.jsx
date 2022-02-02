import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
// snapshots renderer
import renderer from 'react-test-renderer';
// mock store provider
import MockProvider from '@/jest/mock/MockProvider';
// mock store
import createMockStore from '@/jest/mock/store/createMockStore';
//components
import TestComponent from './TestComponent';

afterEach(cleanup);

describe('testComponent.jsx', () => {
	it('snapshot renders correctly, truthy values', () => {
		const store = createMockStore({
			app: {
				testString: 'Initial test',
			},
		});

		const tree = renderer
			.create(
				<MockProvider mockStore={store}>
					<TestComponent />
				</MockProvider>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('should dispatch TEST_ACTION action when user clicks the button', () => {
		const store = createMockStore({
			app: {
				testString: 'Initial test',
			},
		});
		render(
			<MockProvider mockStore={store}>
				<TestComponent />
			</MockProvider>
		);
		fireEvent.click(screen.getByTestId('changeText'));
		expect(store.dispatch).toHaveBeenCalledTimes(1);
	});
});
