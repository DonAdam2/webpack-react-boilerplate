import '@testing-library/jest-dom/extend-expect';
import '@testing-library/react/cleanup-after-each';
import createStore from 'redux-mock-store';

global.Provider = Provider;
global.createStore = createStore;
