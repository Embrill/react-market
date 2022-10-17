import React from 'react';
import './App.scss';
import '../src/scss/app.scss';
import { Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

// Контекст
export const SearchContext = React.createContext('');

// Render
function App() {
	// state хранения вводимых данных
	// в инпут поиска, также необходимо для контекста
	const [searchValue, setSearchValue] = React.useState('');

	return (
		// Контекст
		<SearchContext.Provider value={{ searchValue, setSearchValue }}>
			<div className="wrapper">
				<Header />
				<div className="content">
					<Routes>
						<Route path="/" element={<Home />} /> {/* Главная страница */}
						<Route path="/cart" element={<Cart />} /> {/* Корзина */}
						<Route path="*" element={<NotFound />} /> {/* Ошибка */}
					</Routes>
				</div>
			</div>
		</SearchContext.Provider>
	);
}

export default App;
