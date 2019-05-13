import { FETCH_BACKGROUND_IMG_FAILED, SET_BACKGROUND_IMG, TEST_ACTION } from '../actionTypes';

export const testAction = () => ({
	type: TEST_ACTION,
	payload: 'testing',
});

// fetch image actions
export const fetchBackgroundImageSucceeded = (img) => ({
	type: SET_BACKGROUND_IMG,
	image: img,
});

export const fetchBackgroundImageFailed = () => ({
	type: FETCH_BACKGROUND_IMG_FAILED,
});
