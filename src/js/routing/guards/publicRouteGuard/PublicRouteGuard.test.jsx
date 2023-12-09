import { waitFor } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
//routing
import PublicRouteGuard from './PublicRouteGuard';
import { getHomePageUrl, getLoginPageUrl } from '@/js/routing/routingConstants/AppUrls';
//constants
import { isAuthenticated } from '@/js/constants/Helpers';
//jest mocks
import renderWithRouter from '@/jest/mocks/RenderWithRouter';

//mock isAuthenticated function
jest.mock('@/js/constants/Helpers', () => ({
  isAuthenticated: jest.fn(),
}));

describe('PublicRouteGuard', () => {
  it('redirects to required route if redirect is passed', async () => {
    const { container } = renderWithRouter(
      <Routes>
        <Route
          path="/"
          element={
            <PublicRouteGuard redirect={getHomePageUrl()}>
              <>Initial page</>
            </PublicRouteGuard>
          }
        />
        <Route path={getHomePageUrl()} element={<>Home page</>} />
      </Routes>
    );

    await waitFor(() => expect(container).toContainHTML('<div>Home page</div>'));
  });
  it('renders home page if user is authenticated and the route is restricted', async () => {
    isAuthenticated.mockReturnValue(true);
    const { container } = renderWithRouter(
      <Routes>
        <Route
          path={getLoginPageUrl()}
          element={
            <PublicRouteGuard restricted>
              <>Login page</>
            </PublicRouteGuard>
          }
        />
        <Route path={getHomePageUrl()} element={<>Home page</>} />
      </Routes>,
      { initialEntries: [getLoginPageUrl()] }
    );

    await waitFor(() => expect(container).toContainHTML('<div>Home page</div>'));
  });
  it('renders children if not restricted and no redirect', async () => {
    const { container } = renderWithRouter(
      <PublicRouteGuard>
        <>About page</>
      </PublicRouteGuard>
    );

    await waitFor(() => expect(container).toContainHTML('<div>About page</div>'));
  });
});
