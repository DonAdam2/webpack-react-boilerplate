import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
//lodash
import { isEmpty } from 'lodash';
//replace the following with your own selectors
import {
	getAppCurrentLoggedInUser,
	getUserPermissionsList,
} from '../store/app/selectors/AppSelectors';
//components
import LoadingIcon from '../components/UI/LoadingIcon';
import PermissionsCannotAccess from '../components/PermissionsCannotAccess';

const RestrictedRoute = ({ component: Component, requiredPermissions, ...rest }) => {
	const currentLoggedInUser = useSelector((state) => getAppCurrentLoggedInUser({ state })),
		userPermissionsList = useSelector((state) => getUserPermissionsList({ state }));

	return (
		<Route
			{...rest}
			render={(props) => {
				if (isEmpty(currentLoggedInUser)) {
					return <LoadingIcon />;
				}
				if (Array.isArray(requiredPermissions)) {
					for (let i = 0; i < requiredPermissions.length; i++) {
						for (let j = 0; j < userPermissionsList.length; j++) {
							if (requiredPermissions[i] === userPermissionsList[j])
								return <Component {...props} />;
						}
					}
				}
				if (typeof requiredPermissions === 'string') {
					if (
						userPermissionsList.findIndex((permission) => permission === requiredPermissions) > -1
					)
						return <Component {...props} />;
				}
				return <PermissionsCannotAccess requiredPermissions={requiredPermissions} />;
			}}
		/>
	);
};

RestrictedRoute.propTypes = {
	requiredPermissions: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

export default RestrictedRoute;
