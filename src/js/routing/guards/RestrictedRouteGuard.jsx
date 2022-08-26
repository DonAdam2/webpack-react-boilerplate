import { Navigate, useLocation } from 'react-router-dom';
//routes
import { getLoginPageUrl } from '../routingConstants/AppUrls';
//constants
import { isAuthenticated } from '@/js/constants/Helpers';
//components
import PermissionsCannotAccess from '../routingComponents/PermissionsCannotAccess';
import RestrictedWrapper from '@/js/routing/routingComponents/RestrictedWrapper';

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
