export const updateObject = (oldObject, UpdatedValues) => {
	return {
		...oldObject,
		...UpdatedValues,
	};
};

export const decodeToken = (token) => JSON.parse(atob(token.split('.')[1]));
