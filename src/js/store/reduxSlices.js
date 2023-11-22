import { combineReducers } from '@reduxjs/toolkit';
// slices
import app from './app/slices/AppSlice';
/* PLOP_INJECT_IMPORT */

export const slices = combineReducers({
  /* PLOP_INJECT_REDUCER_SLICE */
  app,
});

export const reduxSlices = (state, action) => {
  /*reset redux slices except one property of a slice*/
  /*if (action.type === 'user/logoutUser') {
    // Preserve the state of user.featureFlags
    const featureFlags = state.user.featureFlags;

    // Reset the user slice to its initial state except featureFlags
    const userSlice = updateObject(userInitialState, { featureFlags });

    // Reset redux state
    state = undefined;

    state = updateObject(state, { user: userSlice });
  }*/

  /*reset all redux slices*/
  /*if (action.type === 'user/logoutUser') {
    // Reset redux state
    state = undefined;
  }*/

  return slices(state, action);
};
