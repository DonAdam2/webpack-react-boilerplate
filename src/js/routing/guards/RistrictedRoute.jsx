import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
//replace the following with your own selectors
import { getUserPermissionsList } from '../../store/app/selectors/AppSelectors';
//components
import PermissionsCannotAccess from '../routingComponents/PermissionsCannotAccess';

const RestrictedRoute = ({ component: Component, requiredPermissions, ...rest }) => {
	const userPermissionsList = useSelector((state) => getUserPermissionsList({ state }));

	return (
		<Route
			{...rest}
			render={(props) => {
				//revise this
				if (localStorage.getItem('jwtToken')) {
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
				} else {
					return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
				}
			}}
		/>
	);
};

RestrictedRoute.propTypes = {
	requiredPermissions: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

export default RestrictedRoute;
