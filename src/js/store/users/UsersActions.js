import { FETCH_BACKGROUND_IMG_FAILED, SET_BACKGROUND_IMG, TEST_ACTION } from '../actionTypes';

export const testAction = () => ({
	type: TEST_ACTION,
	payload: 'testing',
});

// fetch image actions
const fetchBackgroundImageSucceeded = (img) => ({
	type: SET_BACKGROUND_IMG,
	image: img,
});

const fetchBackgroundImageFailed = () => ({
	type: FETCH_BACKGROUND_IMG_FAILED,
});

export const initBackgroundImage = () => {
	return (dispatch) => {
		fetch('https://unsplash.it/800/600/?random')
			.then((res) => {
				dispatch(fetchBackgroundImageSucceeded(res.url));
			})
			.catch((err) => {
				dispatch(fetchBackgroundImageFailed());
			});
	};
};
