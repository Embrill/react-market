import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectorFilter, setCategoryId, setPageCurrent } from '../redux/slices/filterSlice';
import { fetchPizzas, selectorPizzasData } from '../redux/slices/pizzasSlice';

const Home = () => {
	// Глобальный компанент
	const { searchValue } = React.useContext(SearchContext);

	// Данные из хранилища REDUX
	const { categoryId, sortSlice, pageCurrent, sortOrder } = useSelector(selectorFilter);
	const { items, status } = useSelector(selectorPizzasData);
	const dispatch = useDispatch();

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

	const dataPizzasComplete = items.map((item, index) => (
		<PizzaBlock // В key можно передавать index, если index статичный
			key={index}
			title={item.title}
			price={item.price}
			imageUrl={item.imageUrl}
			sizes={item.sizes}
			typesPizza={item.types}
			id={item.id}
		/>
	));
	const skeletons = [...new Array(4)].map((_, id) => <Skeleton key={id} />);

	return (
		<div className="container">
			<div className="content__top">
				<Categories categoryActiveId={categoryId} onChangeCategory={(id) => dispatch(setCategoryId(id))} />
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
			<Pagination pageCurrent={pageCurrent} onChangePage={(number) => dispatch(setPageCurrent(number))} />
		</div>
	);
};

export default Home;
