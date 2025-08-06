import { screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import renderWithRedux from '@/jest/mocks/RenderWithRedux';

import RestrictedWrapper from './RestrictedWrapper';

const mockPermissions = ['search', 'createUser'];

describe('RestrictedWrapper', () => {
  describe('Single permission', () => {
    it('renders child component when permission is granted', () => {
      renderWithRedux(
        <RestrictedWrapper requiredPermissions="search">
          <div>Test child</div>
        </RestrictedWrapper>,
        {
          preloadedState: {
            app: {
              permissions: mockPermissions,
            },
          },
        }
      );
      expect(screen.getByText('Test child')).toBeInTheDocument();
    });

    it('does not render child component when permission is not granted', () => {
      renderWithRedux(
        <RestrictedWrapper
          requiredPermissions="read"
          notPermittedComponent={<div>No permission</div>}
        >
          <div>Test child</div>
        </RestrictedWrapper>
      );
      expect(screen.queryByText('Test child')).not.toBeInTheDocument();
      expect(screen.getByText('No permission')).toBeInTheDocument();
    });
  });
  describe('Multiple permissions', () => {
    it('renders child component when at least one permission is granted', () => {
      renderWithRedux(
        <RestrictedWrapper requiredPermissions={['search', 'read']}>
          <div>Test child</div>
        </RestrictedWrapper>,
        {
          preloadedState: {
            app: {
              permissions: mockPermissions,
            },
          },
        }
      );
      expect(screen.getByText('Test child')).toBeInTheDocument();
    });

    it('does not render child component when permissions are not granted', () => {
      renderWithRedux(
        <RestrictedWrapper
          requiredPermissions={['read', 'write']}
          notPermittedComponent={<div>No permission</div>}
        >
          <div>Test child</div>
        </RestrictedWrapper>
      );
      expect(screen.queryByText('Test child')).not.toBeInTheDocument();
      expect(screen.getByText('No permission')).toBeInTheDocument();
    });
  });
});
