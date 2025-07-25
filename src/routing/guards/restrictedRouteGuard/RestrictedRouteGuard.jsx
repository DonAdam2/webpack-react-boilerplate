import { Navigate, useLocation } from 'react-router-dom';
//routes
import { getLoginPageUrl } from '@/routing/routingConstants/AppUrls';
//constants
import { isAuthenticated } from '@/constants/Helpers';
//components
import PermissionsCannotAccess from '@/routing/routingComponents/permissionsCannotAccess/PermissionsCannotAccess';
import RestrictedWrapper from '@/routing/routingComponents/restrictedWrapper/RestrictedWrapper';

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
