import { TEST_ACTION } from '../AppActionTypes';
import { updateObject } from '../../../constants/Helpers';

const initialState = {
  testString: 'Initial test',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TEST_ACTION:
      return updateObject(state, { testString: 'Final test' });
    default:
      return state;
  }
};

export default reducer;
