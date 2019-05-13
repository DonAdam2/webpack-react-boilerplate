import { FETCH_BACKGROUND_IMG_FAILED, SET_BACKGROUND_IMG, TEST_ACTION } from '../actionTypes';

const updateObject = (oldObject, UpdatedValues) => {
	return {
		...oldObject,
		...UpdatedValues,
	};
};

const initialState = {
	test: 'lol',
	backgroundImage: null,
	backgroundImageFailedFetch: false,
};

const users = (state = initialState, action) => {
	switch (action.type) {
		case TEST_ACTION:
			return updateObject(state, { test: 'testing' });
		case SET_BACKGROUND_IMG:
			return updateObject(state, { backgroundImage: action.image });
		case FETCH_BACKGROUND_IMG_FAILED:
			return updateObject(state, { backgroundImageFailedFetch: true });
		default:
			return state;
	}
};

export default users;
