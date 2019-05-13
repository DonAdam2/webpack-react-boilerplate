import React, { Component, Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';

import Users from './js/containers/Users';
import AnotherComponent from './js/components/AnotherComponent';
import { getBGFailedFetch, getBGImg, getUserTest } from './js/store/users/UsersSelectors';
import { testAction } from './js/store/users/UsersActions';
import { initBackgroundImage } from './js/store/users/UsersApiCalls';

const AsyncPizza = React.lazy(() => import('./js/containers/Pizza'));

class App extends Component {
	componentDidMount() {
		this.props.testAction();
		this.props.setBackgroundImage();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log(this.props.userImage, this.props.userImageFailed);
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
				<img src={this.props.userImage} />
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
	userImage: getBGImg({ state }),
	userImageFailed: getBGFailedFetch({ state }),
});

const mapDispatchToProps = (dispatch) => ({
	testAction: () => dispatch(testAction()),
	setBackgroundImage: () => dispatch(initBackgroundImage()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(hot(App));
