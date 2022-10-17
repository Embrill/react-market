import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
// react-router
import { BrowserRouter } from 'react-router-dom';

// redux
import { store } from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);
