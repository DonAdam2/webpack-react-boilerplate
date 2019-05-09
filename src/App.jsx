import React, { Component, Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';

import Users from './js/containers/Users';
import AnotherComponent from './js/components/AnotherComponent';
import { getUserTest } from './js/store/users/UsersSelectors';
import { testAction } from './js/store/users/UsersActions';

const AsyncPizza = React.lazy(() => import('./js/containers/Pizza'));

class App extends Component {
	componentDidMount() {
		this.props.testAction();
	}

	render() {
		return (
			<div>
				<div>
					<Link to="/">Users</Link> | <Link to="/pizza">Pizza</Link> |{' '}
					<Link to="/pizza/another-component">Another component</Link>
				</div>
				<p>
					Testing the store <strong>{this.props.userTest}</strong>
				</p>
				<div>
					<Route path="/" exact component={Users} />
					<Route
						path="/pizza"
						exact
						render={() => (
							<Suspense fallback={<div>Loading...</div>}>
								<AsyncPizza />
							</Suspense>
						)}
					/>
					<Route path="/pizza/another-component" exact component={AnotherComponent} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	userTest: getUserTest({ state }),
});

const mapDispatchToProps = (dispatch) => ({
	testAction: () => dispatch(testAction()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(hot(App));
