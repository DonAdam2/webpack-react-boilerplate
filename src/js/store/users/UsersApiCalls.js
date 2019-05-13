import axios from 'axios';
import { fetchBackgroundImageFailed, fetchBackgroundImageSucceeded } from './UsersActions';

const url = 'https://www.mocky.io/v2/5ccfe7d13200006f0000f8c7';

export const initBackgroundImage = () => {
	return (dispatch) => {
		axios
			.get(url)
			.then((res) => {
				dispatch(fetchBackgroundImageSucceeded(res.data.movies[0].image));
			})
			.catch((err) => {
				dispatch(fetchBackgroundImageFailed());
			});
	};
};
