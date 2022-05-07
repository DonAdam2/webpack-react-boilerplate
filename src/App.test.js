import { cleanup, render, screen } from '@testing-library/react';
//component
import App from './App';
// mock store provider
import MockProvider from '@/jest/mock/MockProvider';

afterEach(cleanup);

describe('App Component', () => {
  test('renders webpack react boilerplate', async () => {
    render(
      <MockProvider>
        <App />
      </MockProvider>
    );
    const title = await screen.findByText(/webpack react boilerplate/i);
    expect(title).toBeInTheDocument();
  });
});
