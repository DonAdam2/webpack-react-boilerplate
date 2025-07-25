import { useSelector } from 'react-redux';
//selectors
//replace the following with your own selector
import { getAppUserPermissionsList } from '@/store/app/selectors/AppSelectors';

const RestrictedWrapper = ({ requiredPermissions, children, notPermittedComponent }) => {
  const userPermissionsList = useSelector((state) => getAppUserPermissionsList({ state }));

  if (Array.isArray(requiredPermissions)) {
    for (let i = 0; i < requiredPermissions.length; i++) {
      for (let j = 0; j < userPermissionsList.length; j++) {
        if (requiredPermissions[i] === userPermissionsList[j]) return <>{children}</>;
      }
    }
  }
  if (typeof requiredPermissions === 'string') {
    if (userPermissionsList.findIndex((permission) => permission === requiredPermissions) > -1)
      return <>{children}</>;
  }
  return <>{notPermittedComponent}</>;
};

export default RestrictedWrapper;
