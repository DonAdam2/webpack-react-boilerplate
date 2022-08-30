import { configureStore } from '@reduxjs/toolkit';
//root reducer
import { rootReducer } from './rootReducer';

const isDevelopment = process.env.NODE_ENV === 'development';

export default configureStore({
  reducer: rootReducer,
  devTools: isDevelopment,
  middleware: (getDefaultMiddleware) => {
    if (isDevelopment) {
      const { logger } = require('redux-logger');

      return getDefaultMiddleware().concat(logger);
    }

    return getDefaultMiddleware();
  },
});
