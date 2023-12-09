import { waitFor } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
//routing
import PrivateRouteGuard from '@/js/routing/guards/privateRouteGuard/PrivateRouteGuard';
//constants
import { isAuthenticated } from '@/js/constants/Helpers';
import { getLoginPageUrl } from '@/js/routing/routingConstants/AppUrls';
//jest mocks
import renderWithRouter from '@/jest/mocks/RenderWithRouter';

//mock isAuthenticated function
jest.mock('@/js/constants/Helpers', () => ({
  isAuthenticated: jest.fn(),
}));

describe('PrivateRouteGuard', () => {
  it('renders children when authenticated', async () => {
    isAuthenticated.mockReturnValue(true);
    const children = <div>Test</div>,
      { container } = renderWithRouter(<PrivateRouteGuard>{children}</PrivateRouteGuard>);

    await waitFor(() => expect(container).toContainHTML('<div>Test</div>'));
  });

  it('redirects to login page when not authenticated', async () => {
    isAuthenticated.mockReturnValue(false);
    const adminRoute = '/admin',
      routesConfig = [
        { path: '/', element: <>Home Page</> },
        { path: getLoginPageUrl(), element: <>Login Page</> },
        {
          path: adminRoute,
          element: (
            <PrivateRouteGuard>
              <div>Admin Page</div>
            </PrivateRouteGuard>
          ),
        },
      ];

    const { container } = renderWithRouter(
      <Routes>
        {routesConfig.map((el, i) => (
          <Route key={i} path={el.path} element={el.element} />
        ))}
      </Routes>,
      { initialEntries: [adminRoute] } //navigate to admin route
    );

    await waitFor(() => expect(container).toContainHTML('<div>Login Page</div>'));
  });
});
