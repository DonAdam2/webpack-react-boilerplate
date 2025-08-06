import { StrictMode } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { createRoot } from 'react-dom/client';

import '@/public/assets/images/metaImage.jpg';

import 'regenerator-runtime/runtime';

import App from './App';
import store from './store/store';

import './scss/global.scss';
/* PLOP_INJECT_PWA_IMPORTS */

const container = document.getElementById('root'),
  root = createRoot(container);

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

/* PLOP_INJECT_PWA_REGISTERER */
