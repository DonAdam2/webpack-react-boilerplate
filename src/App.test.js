import { screen } from '@testing-library/react';
// all providers mock
import renderWithProviders from '@/jest/mocks/RenderWithProviders';
//component
import App from './App';

describe('App Component', () => {
  it('Should render app title', async () => {
    renderWithProviders(<App />);
    const title = await screen.findByRole('heading', { name: /webpack react boilerplate/i });
    expect(title).toBeInTheDocument();
  });
});
