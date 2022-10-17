import React from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

const Home = () => {
	// Redux
	// Данные из хранилища redux
	const categoryActiveId = useSelector((state) => state.filterSlice.categoryId);
	const sortActiveId = useSelector((state) => state.filterSlice.sortList.sortProperty);
	// посредник вызова функции
	const dispatch = useDispatch();

	const [dataPizzas, setDataPizzas] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	const [currentPage, setCurrentPage] = React.useState(1);

	const [toggleOrderSort, setToggleOrderSort] = React.useState(false);
	const { searchValue } = React.useContext(SearchContext);

	// Запрос на BACK END
	const categoryUrl = categoryActiveId > 0 ? `category=${categoryActiveId}` : '';
	const ascOrDescUrl = toggleOrderSort === true ? 'asc' : 'desc';
	const searchUrl = searchValue ? `&search=${searchValue}` : ''; // фильтрация с URL адрессом
	React.useEffect(() => {
		/* 		fetch(
			`https://633e73820dbc3309f3b5d032.mockapi.io/photo_collections?page=${currentPage}&limit=4&${categoryUrl}&sortBy=${sortActiveId}&order=${ascOrDescUrl}${searchUrl}`
		)
			.then((response) => {
				return response.json(); // конвертация ответа в json
			})
			.then((json) => {
				setDataPizzas(json);
				setIsLoading(false);
			}); */
		setIsLoading(true); // при каждом запросе на бэк - появление скелетона
		axios
			.get(
				`https://633e73820dbc3309f3b5d032.mockapi.io/photo_collections?page=${currentPage}&limit=4&${categoryUrl}&sortBy=${sortActiveId}&order=${ascOrDescUrl}${searchUrl}`
			)
			.then((response) => {
				setDataPizzas(response.data);
				setIsLoading(false);
			});
	}, [categoryActiveId, sortActiveId, toggleOrderSort, searchValue, currentPage, categoryUrl, ascOrDescUrl, searchUrl]); //  [] - вызвать только один раз / [dataPizzas] - если это изменится, то снова вызов useEffect()
	// /.Запрос на BACK END

	const dataPizzasComplete = dataPizzas.map((item, index) => (
		<PizzaBlock // В key можно передавать index, если index статичный
			key={index}
			title={item.title}
			price={item.price}
			image={item.imageUrl}
			sizes={item.sizes}
			typesPizza={item.types}
		/>
	));
	const skeletons = [...new Array(4)].map((_, id) => <Skeleton key={id} />);

	// ========================== Render =============================
	return (
		<div className="container">
			<div className="content__top">
				<Categories categoryActiveId={categoryActiveId} onChangeCategory={(id) => dispatch(setCategoryId(id))} />
				<Sort toggleOrderSort={toggleOrderSort} setToggleOrderSort={setToggleOrderSort} />
			</div>

			<h2 className="content__title">Все пиццы</h2>

			<div className="content__items">
				{isLoading
					? // Рендер скелетона
					  skeletons // [...new Array(6)] - создание фейкового массива
					: //
					  dataPizzasComplete}
			</div>
			<Pagination onChangePage={(number) => setCurrentPage(number)} />
		</div>
	);
};

export default Home;
