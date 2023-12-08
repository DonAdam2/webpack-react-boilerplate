import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

function renderWithRouter(
  ui,
  {
    //use it if you want to navigate to a specific route
    initialEntries = ['/'],
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>;
  }

  // Return an object with the all of RTL's query functions
  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export default renderWithRouter;
