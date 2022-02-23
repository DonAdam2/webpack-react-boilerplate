// react testing library
// import { cleanup, render, screen, fireEvent } from '@testing-library/react';
// all providers mock
import { cleanup, render, screen, fireEvent } from '@/jest/mock/OverrideRenderOfRTL';
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
    const tree = renderer
      .create(
        <MockProvider>
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
    // using RTL render
    /*render(
			<MockProvider mockStore={store}>
				<TestComponent />
			</MockProvider>
		);*/
    //using the custom render with all providers
    render(<TestComponent />, { mockStore: store });
    fireEvent.click(screen.getByTestId('changeText'));
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
