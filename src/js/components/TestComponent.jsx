import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
//selectors
import { getTestAction } from '../store/selectors/AppSelectors';
//actions
import { setTestAction } from '../store/actions/AppActions';

const TestComponent = () => {
	const dispatch = useDispatch(),
		testAction = useSelector((state) => getTestAction({ state }));

	return (
		<div className="container" style={{ textAlign: 'center' }}>
			<p>
				Testing the store <strong>{testAction}</strong>
			</p>
			<button className="std-btn primary" onClick={() => dispatch(setTestAction())}>
				Change text
			</button>
		</div>
	);
};

export default TestComponent;
