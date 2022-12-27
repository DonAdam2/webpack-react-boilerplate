import { configureStore } from '@reduxjs/toolkit';
//root reducer
import { reduxSlices } from './reduxSlices';

const isDevelopment = process.env.NODE_ENV === 'development';

export default configureStore({
  reducer: reduxSlices,
  devTools: isDevelopment,
  middleware: (getDefaultMiddleware) => {
    if (isDevelopment) {
      const { logger } = require('redux-logger');

      return getDefaultMiddleware().concat(logger);
    }

    return getDefaultMiddleware();
  },
});
