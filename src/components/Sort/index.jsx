import React from 'react';
import styles from './Sort.module.scss';

import { useSelector, useDispatch } from 'react-redux';
import { setSort } from '../../redux/slices/filterSlice';

export const sortList = [
	{ name: 'Популярности', sortProperty: 'rating' },
	{ name: 'Цене', sortProperty: 'price' },
	{ name: 'Алфавиту', sortProperty: 'title' },
];

const Sort = ({ toggleOrderSort, setToggleOrderSort }) => {
	const dispatch = useDispatch();
	const sortSlice = useSelector((state) => state.filterSlice.sortSlice);
	const sortRef = React.useRef();

	const [visibleSortPopup, setVisibleSortPopup] = React.useState(false);

	const setSortAndClose = (indexId) => {
		dispatch(setSort(indexId));
		setVisibleSortPopup(false);
	};

	// Скрытие попапа при клике на body
	React.useEffect(() => {
		// Функция закрытия попапа при клике на body
		const handleClickOutside = (event) => {
			!event.path.includes(sortRef.current) && setVisibleSortPopup(false);
		};

		// Прослушка клика на бади с функцией handleClickOutside
		document.body.addEventListener('click', handleClickOutside);

		// Удаление прослушки при переходе на другой page
		return () => {
			document.body.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<div ref={sortRef} className="sort">
			<div className="sort__label label-sort">
				<div className="sort__arrow" onClick={() => setToggleOrderSort(!toggleOrderSort)}>
					<svg width="20" height="12" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							className={toggleOrderSort === false ? styles.arrowDown : styles.arrowUp}
							d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
							fill="#2C2C2C"
						/>
					</svg>
				</div>
				<b>Сортировать по:</b>
				<span onClick={() => setVisibleSortPopup(!visibleSortPopup)}>{sortSlice.name}</span>
			</div>

			{/* popup */}
			{visibleSortPopup && (
				<div className="sort__popup">
					<ul>
						{sortList.map((obj, index) => (
							<li
								key={index}
								onClick={() => setSortAndClose(obj)}
								className={sortSlice.sortProperty === obj.sortProperty ? 'active' : ''}
							>
								{obj.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Sort;
