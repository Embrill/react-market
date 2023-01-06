import './App.scss';
import '../src/scss/app.scss';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Loadable from 'react-loadable'; // Для ленивой загрузки с использованием SSR

// Components
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
// import NotFound from './pages/NotFound';
// import Cart from './pages/Cart';
// import FullPizza from './pages/FullPizza';

// Использование динамического импорта с lazy загрузкой...
// ...это используется тогда, если главный бандл становится слишком болшьшим...
// ...и с помощью этого бандл разбивается на несколько частей
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));
// const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));

// Тоже, что и просто React.lazy, но с SSR
const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
  loading: () => <h2>Идет загрузка корзины...</h2>,
});

// Render
function App() {
  return (
    <Routes>
      {/* Главный роут, который не ререндерится */}
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} /> {/* Главная страница */}
        <Route path="cart" element={<Cart />} />
        {/* Корзина */}
        <Route
          path="pizza/:id"
          element={
            <React.Suspense fallback={<h2>Идет загрузка...</h2>}>
              <FullPizza />
            </React.Suspense>
          }
        />{' '}
        {/* ":" - означает что-то динамическое */}
        <Route
          path="*"
          element={
            <React.Suspense fallback={<h2>Идет загрузка...</h2>}>
              <NotFound />
            </React.Suspense>
          }
        />{' '}
        {/* Ошибка */}
      </Route>
    </Routes>
  );
}

export default App;
