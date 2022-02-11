import { combineReducers } from 'redux';
// slices
import app from './app/reducers/AppReducer';
/* PLOP_INJECT_IMPORT */

const rootReducer = combineReducers({
  app,
  /* PLOP_INJECT_REDUCER_SLICE */
});

export default rootReducer;
