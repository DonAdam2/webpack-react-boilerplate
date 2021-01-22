import { combineReducers } from 'redux';
import app from './app/reducers/AppReducer';

const rootReducer = combineReducers({
	app,
});

export default rootReducer;
