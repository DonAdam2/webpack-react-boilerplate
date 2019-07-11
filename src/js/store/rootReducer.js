import { combineReducers } from 'redux';
import app from './reducers/AppReducer';

const rootReducer = combineReducers({
	app,
});

export default rootReducer;
