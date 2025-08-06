import { fireEvent, screen } from '@testing-library/react';

import renderWithRedux from '@/jest/mocks/RenderWithRedux';

import TestComponent from './TestComponent';

describe('TestComponent', () => {
  it('renders environment API', () => {
    renderWithRedux(<TestComponent />);
    expect(screen.getByText(/Current environment API is/i)).toBeInTheDocument();
  });

  it('renders testAction from store', () => {
    renderWithRedux(<TestComponent />);
    expect(screen.getByText(/initial test/i)).toBeInTheDocument();
  });

  it('updates testAction when user clicks the button', () => {
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
