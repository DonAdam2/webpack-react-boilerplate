import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//components
import App from '../App';
//reducers
import app from '../js/store/app/reducers/AppReducer';

describe('<App/> Component', () => {
	let wrapper,
		store = null;

	beforeEach(() => {
		store = mockedStore({ initialState: {}, reducer: app });
		wrapper = mount(
			<Provider store={store}>
				<App />
			</Provider>
		);
	});

	it('Renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(
			<Provider store={store}>
				<App />
			</Provider>,
			div
		);
		ReactDOM.unmountComponentAtNode(div);
	});
});
