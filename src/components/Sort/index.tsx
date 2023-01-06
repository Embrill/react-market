import React from 'react';
import styles from './Sort.module.scss';
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate'; // Для удаления лишних перерисовок компонента

import { useDispatch } from 'react-redux';
import { SortPropertyEnum, TSortValues } from '../../redux/filter/types';
import { setSort, setSortOrder } from '../../redux/filter/slice';

// type PopupClick = React.MouseEvent<HTMLBodyElement> & {
// 	path: Node[]
// }

export type SortListItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

// :SortListItem[] - для типизации
export const sortList: SortListItem[] = [
  { name: 'Популярности', sortProperty: SortPropertyEnum.RATING },
  { name: 'Цене', sortProperty: SortPropertyEnum.PRICE },
  { name: 'Алфавиту', sortProperty: SortPropertyEnum.TITLE },
];

interface ISortProps {
  valueSort: TSortValues;
  sortOrder: boolean;
}

const Sort: React.FC<ISortProps> = React.memo(({ valueSort, sortOrder }) => {
  useWhyDidYouUpdate('Sort', { valueSort, sortOrder }); // Для отслеживания лишних перерисовок

  const dispatch = useDispatch();

  // null - Значение
  // HTMLDivElement - Тип
  const sortRef = React.useRef<HTMLDivElement>(null);

  const [visibleSortPopup, setVisibleSortPopup] = React.useState(false);

  const setSortAndClose = (indexId: SortListItem) => {
    dispatch(setSort(indexId));
    setVisibleSortPopup(false);
  };

  // Скрытие попапа при клике на body
  React.useEffect(() => {
    // Функция закрытия попапа при клике на body
    const handleClickOutside = (event: MouseEvent) => {
      // Костыль
      // дубликат event + фэйк path
      //   const _event = event as MouseEvent & {
      //     path: Node[];
      //   };

      // composedPath() >> .path
      sortRef.current && !event.composedPath().includes(sortRef.current) && setVisibleSortPopup(false);
      console.log(sortRef.current);
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
        <div className="sort__arrow" onClick={() => dispatch(setSortOrder(!sortOrder))}>
          <svg width="20" height="12" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              className={sortOrder === false ? styles.arrowDown : styles.arrowUp}
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
        </div>
        <b>Сортировать по:</b>
        <span onClick={() => setVisibleSortPopup(!visibleSortPopup)}>{valueSort.name}</span>
      </div>

      {/* popup */}
      {visibleSortPopup && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, index) => (
              <li
                key={index}
                onClick={() => setSortAndClose(obj)}
                className={valueSort.sortProperty === obj.sortProperty ? 'active' : ''}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
