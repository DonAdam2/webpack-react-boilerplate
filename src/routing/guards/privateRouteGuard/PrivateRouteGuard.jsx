import { useLocation, Navigate } from 'react-router-dom';
//routes
import { getLoginPageUrl } from '@/routing/routingConstants/AppUrls';
//constants
import { isAuthenticated } from '@/constants/Helpers';

const PrivateRouteGuard = ({ children }) => {
  const location = useLocation();

  if (isAuthenticated()) {
    return <>{children}</>;
  }

  return <Navigate replace to={getLoginPageUrl()} state={{ from: location }} />;
};

export default PrivateRouteGuard;
