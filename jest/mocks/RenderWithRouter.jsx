import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

function renderWithRouter(ui, { ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return <BrowserRouter>{children}</BrowserRouter>;
  }

  // Return an object with the all of RTL's query functions
  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export default renderWithRouter;
