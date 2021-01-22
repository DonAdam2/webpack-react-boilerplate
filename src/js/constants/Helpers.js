export const updateObject = (oldObject, UpdatedValues) => {
	return {
		...oldObject,
		...UpdatedValues,
	};
};
