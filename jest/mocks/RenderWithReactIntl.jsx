/*
import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';

function renderWithReactIntl(ui, { locale = 'en', ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return <IntlProvider locale={locale}>{children}</IntlProvider>;
  }

  // Return an object with all of RTL's query functions
  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export default renderWithReactIntl;
*/
