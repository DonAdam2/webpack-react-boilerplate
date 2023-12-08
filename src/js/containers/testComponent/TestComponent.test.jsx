import { Provider } from 'react-redux';
import { fireEvent, screen } from '@testing-library/react';
// snapshots renderer
import renderer from 'react-test-renderer';
// mock store provider
import renderWithRedux from '@/jest/mocks/RenderWithRedux';
//mock store
import setupStore from '@/jest/mocks/store';
//components
import TestComponent from './TestComponent';

describe('TestComponent', () => {
  it('should render snapshot correctly, truthy values', () => {
    const store = setupStore(),
      tree = renderer.create(
        <Provider store={store}>
          <TestComponent />
        </Provider>
      );
    expect(tree).toMatchSnapshot();
  });

  it('should render environment API', () => {
    renderWithRedux(<TestComponent />);
    expect(screen.getByText(/Current environment API is/i)).toBeInTheDocument();
  });

  it('should render testAction from store', () => {
    renderWithRedux(<TestComponent />);
    expect(screen.getByText(/initial test/i)).toBeInTheDocument();
  });

  it('should update testAction when user clicks the button', () => {
    //pass preloadedState if you need to pass custom state to the store
    /*renderWithRedux(<TestComponent />, {
      preloadedState: {
        app: {
          testString: 'Initial test',
        },
      },
    });*/

    renderWithRedux(<TestComponent />);
    fireEvent.click(screen.getByText(/change text/i));
    expect(screen.getByText(/final test/i)).toBeInTheDocument();
  });
});
