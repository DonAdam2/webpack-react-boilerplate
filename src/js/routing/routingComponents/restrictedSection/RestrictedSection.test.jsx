import { screen } from '@testing-library/react';
import RestrictedSection from './RestrictedSection';
import renderWithRedux from '@/jest/mocks/RenderWithRedux';

const mockPermissions = ['search', 'createUser'];

describe('RestrictedSection', () => {
  it('renders the children if the requiredPermissions are met', () => {
    renderWithRedux(
      <RestrictedSection requiredPermissions="search">
        <div>Test Content</div>
      </RestrictedSection>,
      {
        preloadedState: {
          app: {
            permissions: mockPermissions,
          },
        },
      }
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('does not render the children if the requiredPermissions are not met', () => {
    renderWithRedux(
      <RestrictedSection requiredPermissions="read">
        <div>Test Content</div>
      </RestrictedSection>,
      {
        preloadedState: {
          app: {
            permissions: mockPermissions,
          },
        },
      }
    );
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });
});
