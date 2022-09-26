import { configureStore } from '@reduxjs/toolkit';
//root reducer
import { rootReducer } from '@/js/store/rootReducer';

// Create a replica of the actual store without redux dev tools
const setupStore = (preloadedState) =>
  configureStore({
    reducer: rootReducer,
    devTools: false,
    preloadedState,
  });

export default setupStore;
