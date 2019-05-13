import { FETCH_BACKGROUND_IMG_FAILED, SET_BACKGROUND_IMG, TEST_ACTION } from '../actionTypes';

const initialState = {
	test: 'lol',
	backgroundImage: null,
	backgroundImageFailedFetch: false,
};

const users = (state = initialState, action) => {
	switch (action.type) {
		case TEST_ACTION:
			return {
				...state,
				test: 'testing',
			};
		case SET_BACKGROUND_IMG:
			return {
				...state,
				backgroundImage: action.image,
			};
		case FETCH_BACKGROUND_IMG_FAILED:
			return {
				...state,
				backgroundImageFailedFetch: true,
			};
		default:
			return state;
	}
};

export default users;
