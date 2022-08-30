import { configureStore } from '@reduxjs/toolkit';
//root reducer
import { rootReducer } from '@/js/store/rootReducer';

// Create a replica of the actual store without redux dev tools
export default configureStore({
  reducer: rootReducer,
  devTools: false,
});
