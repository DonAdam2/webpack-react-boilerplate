import { combineReducers } from 'redux';
import users from './users/UsersReducer';

const rootReducer = combineReducers({
	users,
});

export default rootReducer;
