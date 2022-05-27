import { render, screen } from '@testing-library/react';
//component
import App from './App';
// mock store provider
import MockReduxProvider from '@/jest/mocks/MockReduxProvider';

describe('App Component', () => {
  test('renders webpack react boilerplate', async () => {
    render(
      <MockReduxProvider>
        <App />
      </MockReduxProvider>
    );
    const title = await screen.findByRole('heading', { name: /webpack react boilerplate/i });
    expect(title).toBeInTheDocument();
  });
});
