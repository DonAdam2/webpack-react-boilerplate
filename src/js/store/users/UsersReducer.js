const initialState = {
	entries: [],
	isFetching: false,
	fetchedSuccesfully: true,
	test: 'lol',
};

const users = (state = initialState, action) => {
	let nextState = {};
	switch (action.type) {
		case 'TEST_ACTION':
			nextState.test = 'testing';
			break;
	}
	state = { ...state, ...nextState };
	return state;
};

export default users;
