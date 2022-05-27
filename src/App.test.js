// all providers mock
import { render, screen } from '@/jest/mocks/OverrideRenderOfRTL';
//component
import App from './App';

describe('App Component', () => {
  test('renders webpack react boilerplate', async () => {
    render(<App />);
    const title = await screen.findByRole('heading', { name: /webpack react boilerplate/i });
    expect(title).toBeInTheDocument();
  });
});
