import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';

//selectors
import { getTestAction } from './js/store/selectors/AppSelectors';
//actions
import { setTestAction } from './js/store/actions/AppActions';

class App extends Component {
	render() {
		const { testAction, setTestAction } = this.props;
		return (
			<div>
				<p>
					Testing the store <strong>{testAction}</strong>
				</p>
				<button className="std-btn primary" onClick={setTestAction}>
					Change text
				</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	testAction: getTestAction({ state }),
});

const mapDispatchToProps = (dispatch) => ({
	setTestAction: () => dispatch(setTestAction()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(hot(App));
