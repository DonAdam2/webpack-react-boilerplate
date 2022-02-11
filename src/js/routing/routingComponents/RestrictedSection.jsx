import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
//replace the following with your own selector
import { getUserPermissionsList } from '../../store/app/selectors/AppSelectors';

const RestrictedSection = ({ requiredPermissions, children }) => {
  const userPermissionsList = useSelector((state) => getUserPermissionsList({ state }));

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
  return null;
};

RestrictedSection.propTypes = {
  requiredPermissions: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

export default RestrictedSection;
