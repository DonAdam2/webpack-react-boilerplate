import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) => {
			//revise this
			if (localStorage.getItem('jwtToken')) {
				return <Component {...props} />;
			}
			return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
		}}
	/>
);

export default PrivateRoute;
