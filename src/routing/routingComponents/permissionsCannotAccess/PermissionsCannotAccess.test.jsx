import { render, screen } from '@testing-library/react';
import PermissionsCannotAccess from './PermissionsCannotAccess';

describe('PermissionsCannotAccess', () => {
  it('renders a list of required permissions', () => {
    const requiredPermissions = ['permission1', 'permission2'];
    render(<PermissionsCannotAccess requiredPermissions={requiredPermissions} />);

    const errorMsg = screen.getByText(/Unauthorized access!/i);
    expect(errorMsg).toBeInTheDocument();

    requiredPermissions.forEach((permission) => {
      const permElement = screen.getByText(permission);
      expect(permElement).toBeInTheDocument();
    });
  });

  it('renders a single permission', () => {
    const requiredPermission = 'permission1';
    render(<PermissionsCannotAccess requiredPermissions={requiredPermission} />);

    const permElement = screen.getByText(requiredPermission);
    expect(permElement).toBeInTheDocument();
  });
});
