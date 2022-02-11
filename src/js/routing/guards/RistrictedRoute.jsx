import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
//managers
import LocalStorageManager from '../../managers/LocalStorageManger';
//selectors
//replace the following with your own selector
import { getAppUserPermissionsList } from '../../store/app/selectors/AppSelectors';
//routes
//replace the following with your own url
import { getLoginPageUrl } from '../routingConstants/AppUrls';
//components
import PermissionsCannotAccess from '../routingComponents/PermissionsCannotAccess';

const RestrictedRoute = ({ children, requiredPermissions }) => {
  const userPermissionsList = useSelector((state) => getAppUserPermissionsList({ state })),
    location = useLocation();

  if (LocalStorageManager.getItem('token')) {
    if (Array.isArray(requiredPermissions)) {
      for (let i = 0; i < requiredPermissions.length; i++) {
        for (let j = 0; j < userPermissionsList.length; j++) {
          if (requiredPermissions[i] === userPermissionsList[j]) return children;
        }
      }
    }
    if (typeof requiredPermissions === 'string') {
      if (userPermissionsList.findIndex((permission) => permission === requiredPermissions) > -1)
        return children;
    }
    return <PermissionsCannotAccess requiredPermissions={requiredPermissions} />;
  } else {
    return <Navigate replace to={getLoginPageUrl()} state={{ from: location }} />;
  }
};

RestrictedRoute.propTypes = {
  requiredPermissions: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

export default RestrictedRoute;
