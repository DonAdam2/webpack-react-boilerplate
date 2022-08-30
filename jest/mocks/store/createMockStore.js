import configureMockStore from 'redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

export default (initialState) => {
  // create a module for creating different states of the store
  const mockStore = configureMockStore(getDefaultMiddleware())(initialState);

  // replace the dispatch method with a spy and keep the functionality
  mockStore.dispatch = jest.fn(mockStore.dispatch);
  return mockStore;
};
