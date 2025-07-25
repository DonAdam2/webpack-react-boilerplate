import { configureStore } from '@reduxjs/toolkit';
//root reducer
import { reduxSlices } from '../../../src/store/reduxSlices';

// Create a replica of the actual store without redux dev tools
const setupStore = (preloadedState) =>
  configureStore({
    reducer: reduxSlices,
    devTools: false,
    preloadedState,
  });

export default setupStore;
