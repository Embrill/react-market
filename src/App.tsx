import './App.scss';
import '../src/scss/app.scss';
import { Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';

// Render
function App() {
  return (
    <Routes>
      {/* Главный роут, который не ререндерится */}
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} /> {/* Главная страница */}
        <Route path="cart" element={<Cart />} /> {/* Корзина */}
        <Route path="pizza/:id" element={<FullPizza />} /> {/* ":" - означает что-то динамическое */}
        <Route path="*" element={<NotFound />} /> {/* Ошибка */}
      </Route>
    </Routes>
  );
}

export default App;
