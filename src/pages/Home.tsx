import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
// Redux
import { useSelector } from 'react-redux';
import { selectorFilter, setCategoryId, setPageCurrent } from '../redux/slices/filterSlice';
import { fetchPizzas, selectorPizzasData } from '../redux/slices/pizzasSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  // Данные из хранилища REDUX
  const { categoryId, sortSlice, pageCurrent, sortOrder, searchValue } = useSelector(selectorFilter);
  const { items, status } = useSelector(selectorPizzasData);
  const dispatch = useAppDispatch();

  // Смена категорий
  const onChaneCategory = (idx: number) => {
    dispatch(setCategoryId(idx));
  };

  // Смена страниц
  const onChangePage = (number: number) => {
    dispatch(setPageCurrent(number));
  };

  // Запрос на BACK END
  React.useEffect(() => {
    const getPizzas = async () => {
      const categoryUrl = categoryId > 0 ? `category=${categoryId}` : '';
      const ascOrDescUrl = sortOrder === true ? 'asc' : 'desc';
      const searchUrl = searchValue ? `&search=${searchValue}` : ''; // фильтрация с URL адрессом

      // С помощью fetchPizzas мы автоматизируем отлов ошибок,
      // процесса загрузки и конечного завершения запроса
      // Вытаскиваем fetchPizzas из redux и передаем сюда
      dispatch(
        fetchPizzas({
          categoryUrl,
          ascOrDescUrl,
          searchUrl,
          pageCurrent,
          sortSlice,
        })
      );
    };
    getPizzas();
  }, [categoryId, dispatch, pageCurrent, searchValue, sortSlice, sortSlice.sortProperty, sortOrder]);
  // /.Запрос на BACK END

  // Маппинг пиц с возможностью просмотра подробной информации при клике на них
  const dataPizzasComplete = items.map((item: any, index: number) => (
    <PizzaBlock // В key можно передавать index, если index статичный
      key={index}
      title={item.title}
      price={item.price}
      imageUrl={item.imageUrl}
      sizes={item.sizes}
      typesPizza={item.types}
      id={item.id}
      rating={item.rating}
    />
  ));
  const skeletons = [...new Array(4)].map((_, id) => <Skeleton key={id} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryActiveId={categoryId} onChangeCategory={onChaneCategory} />
        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>

      {/* Рендер компонентов в зависимости от статуса загрузки бекенда */}
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😢</h2>
          <p>К сожалению, не удалось получить набор питс. Попробуйте повтроить попытку чуть позже.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? // Рендер скелетона
              skeletons // [...new Array(6)] - создание фейкового массива
            : //
              dataPizzasComplete}
        </div>
      )}

      {/* Пагинация */}
      <Pagination pageCurrent={pageCurrent} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
