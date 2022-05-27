// react testing library
// import { render, screen, fireEvent } from '@testing-library/react';
// all providers mock
import { render, screen, fireEvent } from '@/jest/mocks/OverrideRenderOfRTL';
// snapshots renderer
import renderer from 'react-test-renderer';
// mock store provider
import MockReduxProvider from '@/jest/mocks/MockReduxProvider';
// create mock store
import createMockStore from '@/jest/mocks/store/createMockStore';
//components
import TestComponent from './TestComponent';

describe('testComponent.jsx', () => {
  it('snapshot renders correctly, truthy values', () => {
    const tree = renderer
      .create(
        <MockReduxProvider>
          <TestComponent />
        </MockReduxProvider>
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
    // using RTL render
    /*render(
			<MockReduxProvider mockStore={store}>
				<TestComponent />
			</MockReduxProvider>
		);*/
    //using the custom render with all providers
    render(<TestComponent />, { mockStore: store });
    fireEvent.click(screen.getByRole('button', { name: /change text/i }));
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
