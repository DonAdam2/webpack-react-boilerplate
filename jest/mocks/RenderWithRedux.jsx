import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
//setup store
import setupStore from '@/jest/mocks/store';

function renderWithRedux(
  ui,
  {
    preloadedState,
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export default renderWithRedux;
