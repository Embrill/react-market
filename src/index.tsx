import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
// react-router
import { BrowserRouter } from 'react-router-dom';
// redux
import { store } from './redux/store';
import { Provider } from 'react-redux';

const rootElem = document.getElementById('root');

// Если нет "root" страницы, то рендера не произойдет | TypeScript
if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}
