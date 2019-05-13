import { fetchBackgroundImageFailed, fetchBackgroundImageSucceeded } from './UsersActions';

export const initBackgroundImage = () => {
	return (dispatch) => {
		fetch('https://unsplash.it/800/600/?random')
			.then((res) => {
				console.log(res);
				dispatch(fetchBackgroundImageSucceeded(res.url));
			})
			.catch((err) => {
				dispatch(fetchBackgroundImageFailed());
			});
	};
};
