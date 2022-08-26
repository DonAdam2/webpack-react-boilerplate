import { Navigate, useLocation } from 'react-router-dom';
//routes
import { getHomePageUrl } from '../routingConstants/AppUrls';
//constants
import { isAuthenticated } from '@/js/constants/Helpers';

//used to load authentication routes (ex: login, signup, ...etc) and public routes
const PublicRouteGuard = ({ restricted, children, redirect }) => {
  const location = useLocation();

  if (redirect) {
    return <Navigate replace to={redirect} />;
  } else if (isAuthenticated() && restricted) {
    return <Navigate replace to={getHomePageUrl()} state={{ from: location }} />;
  } else {
    return <>{children}</>;
  }
};

export default PublicRouteGuard;
