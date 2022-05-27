import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
//root reducer
import rootReducer from '@/js/store/rootReducer';

const composeEnhancers = compose;

// Create a replica of the actual store without redux dev tools
export default createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
