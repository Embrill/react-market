import React from 'react';

import { Pagination, Skeleton, Categories, Sort, PizzaBlock } from '../components';

// Redux
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { selectorFilter } from '../redux/filter/selectors';
import { setCategoryId, setPageCurrent } from '../redux/filter/slice';
import { selectorPizzasData } from '../redux/pizza/selectors';
import { fetchPizzas } from '../redux/pizza/asyncActions';

const Home: React.FC = () => {
  // Данные из хранилища REDUX
  const { items, status } = useSelector(selectorPizzasData);
  const { categoryId, sortValues, pageCurrent, sortOrder, searchValue } = useSelector(selectorFilter);
  const dispatch = useAppDispatch();

  // Смена категорий
  const onChaneCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []); // Ф-я создается при первом рендере и не делает лишнего перерендера

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
          sortValues,
        })
      );
    };
    getPizzas();
  }, [categoryId, dispatch, pageCurrent, searchValue, sortValues, sortValues.sortProperty, sortOrder]);
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
        <Sort valueSort={sortValues} sortOrder={sortOrder} />
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
