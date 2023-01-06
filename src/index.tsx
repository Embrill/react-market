import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
// react-router
import { BrowserRouter } from 'react-router-dom';
// redux
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';
// redux-persist
import { PersistGate } from 'redux-persist/integration/react';

const rootElem = document.getElementById('root');

// Если нет "root" страницы, то рендера не произойдет | TypeScript
if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  );
}
