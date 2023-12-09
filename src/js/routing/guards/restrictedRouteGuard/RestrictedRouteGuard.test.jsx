import { waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Route, Routes } from 'react-router-dom';
//routing
import RestrictedRouteGuard from '@/js/routing/guards/restrictedRouteGuard/RestrictedRouteGuard';
//jest mocks
import renderWithProviders from '@/jest/mocks/RenderWithProviders';
//constants
import { isAuthenticated } from '@/js/constants/Helpers';
import { getLoginPageUrl } from '@/js/routing/routingConstants/AppUrls';

//mock isAuthenticated function
jest.mock('@/js/constants/Helpers', () => ({
  isAuthenticated: jest.fn(),
}));

const mockPermissions = ['search', 'createUser'];

describe('RestrictedRouteGuard', () => {
  it('renders children when authenticated and permissions are granted', async () => {
    isAuthenticated.mockReturnValue(true);
    const adminRoute = '/admin',
      routesConfig = [
        { path: '/', element: <>Home Page</> },
        { path: getLoginPageUrl(), element: <>Login Page</> },
        {
          path: adminRoute,
          element: (
            <RestrictedRouteGuard requiredPermissions={mockPermissions}>
              <div>Admin Page</div>
            </RestrictedRouteGuard>
          ),
        },
      ];

    const { container } = renderWithProviders(
      <Routes>
        {routesConfig.map((el, i) => (
          <Route key={i} path={el.path} element={el.element} />
        ))}
      </Routes>,
      { initialEntries: [adminRoute] } //navigate to admin route
    );

    await waitFor(() => expect(container).toContainHTML('<div>Admin Page</div>'));
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
            <RestrictedRouteGuard requiredPermissions={mockPermissions}>
              <div>Admin Page</div>
            </RestrictedRouteGuard>
          ),
        },
      ];

    const { container } = renderWithProviders(
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
