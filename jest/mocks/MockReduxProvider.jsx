import React from 'react';
import { Provider } from 'react-redux';
// default store
import store from './store';

const MockReduxProvider = ({ children, mockStore = store }) => (
  <Provider store={mockStore}>{children}</Provider>
);

export default MockReduxProvider;
