import React from 'react';
import { Navigate } from 'react-router-dom';
//managers
import LocalStorageManager from '../../managers/LocalStorageManger';
//routes
//replace the following with your own url
import { getHomePageUrl } from '../routingConstants/AppUrls';

//used to load authentication routes (ex: login, signup, ...etc)
const AuthenticationRoute = ({ children }) => {
  if (!LocalStorageManager.getItem('token')) {
    return children;
  }

  return <Navigate replace to={getHomePageUrl()} />;
};

export default AuthenticationRoute;
