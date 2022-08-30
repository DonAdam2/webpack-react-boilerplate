import { combineReducers } from '@reduxjs/toolkit';
// slices
import app from './app/slices/AppSlice';
/* PLOP_INJECT_IMPORT */

export const rootReducer = combineReducers({
  app,
  /* PLOP_INJECT_REDUCER_SLICE */
});
