import { Navigate, useLocation } from 'react-router-dom';

import PermissionsCannotAccess from '@/routing/routingComponents/permissionsCannotAccess/PermissionsCannotAccess';
import RestrictedWrapper from '@/routing/routingComponents/restrictedWrapper/RestrictedWrapper';
import { getLoginPageUrl } from '@/routing/routingConstants/AppUrls';

import { isAuthenticated } from '@/constants/Helpers';

const RestrictedRouteGuard = ({ children, requiredPermissions }) => {
  const location = useLocation();

  if (isAuthenticated()) {
    return (
      <RestrictedWrapper
        requiredPermissions={requiredPermissions}
        notPermittedComponent={
          <PermissionsCannotAccess requiredPermissions={requiredPermissions} />
        }
      >
        {children}
      </RestrictedWrapper>
    );
  } else {
    return <Navigate replace to={getLoginPageUrl()} state={{ from: location }} />;
  }
};

export default RestrictedRouteGuard;
