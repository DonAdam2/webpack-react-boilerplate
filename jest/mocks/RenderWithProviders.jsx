// import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
// store
import setupStore from '@/jest/mocks/store';

function renderWithProviders(
  ui,
  {
    preloadedState,
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    //use it if you want to navigate to a specific route
    initialEntries = ['/'],
    locale = 'en',
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      // <IntlProvider locale={locale}>
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </Provider>
      // </IntlProvider>
    );
  }

  // Return an object with the all of RTL's query functions
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export default renderWithProviders;
