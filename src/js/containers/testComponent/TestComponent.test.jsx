import { Provider } from 'react-redux';
// all providers mock
import { screen, fireEvent } from '@testing-library/react';
// snapshots renderer
import renderer from 'react-test-renderer';
// mock store provider
import renderWithRedux from '@/jest/mocks/RenderWithRedux';
//mock store
import setupStore from '@/jest/mocks/store';
//components
import TestComponent from './TestComponent';

describe('testComponent.jsx', () => {
  it('snapshot renders correctly, truthy values', () => {
    const store = setupStore(),
      tree = renderer.create(
        <Provider store={store}>
          <TestComponent />
        </Provider>
      );
    expect(tree).toMatchSnapshot();
  });
  it('state should be updated when user clicks the button', () => {
    // using setupStore function (You don't need to pass the preloaded state)
    /*const store = setupStore({
      app: {
        testString: 'Initial test',
      },
    });
    renderWithRedux(<TestComponent />, { store });*/
    //using custom render (You don't need to pass the preloaded state)
    renderWithRedux(<TestComponent />, {
      preloadedState: {
        app: {
          testString: 'Initial test',
        },
      },
    });
    fireEvent.click(screen.getByRole('button', { name: /change text/i }));
    expect(screen.getByText(/final test/i)).toBeInTheDocument();
  });
});
