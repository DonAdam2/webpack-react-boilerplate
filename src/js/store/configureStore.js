import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

const middlewares = [];

// log redux data in development mode only
if (process.env.NODE_ENV !== 'production') {
	const { logger } = require('redux-logger');
	middlewares.push(logger);
}

const configureStore = () => {
	const store = createStore(
		rootReducer,
		/* preloadedState, */
		composeWithDevTools(applyMiddleware(thunkMiddleware, ...middlewares))
	);

	// enable hot loading in development mode only
	if (process.env.NODE_ENV !== 'production' && module.hot) {
		module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer));
	}

	return store;
};
export default configureStore;
