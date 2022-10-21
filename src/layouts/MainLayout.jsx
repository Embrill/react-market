import React from 'react';
import Header from '../components/Header';

// Для отображение дочерних элементов без ререндера родительских элементов
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        {/* Все что выше - не ререндерится */}
        {/* Отображение всех дочерних элементов*/}
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
