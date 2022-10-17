import React from 'react';

// onClickCategory === setCategoryActiveIndex в Home.jsx
const Categories = ({ categoryActiveId, onChangeCategory }) => {
  // fake categories for testing purposes
  const dataCategory = [
    { name: 'Все' },
    { name: 'Мясные' },
    { name: 'Вегетарианская' },
    { name: 'Гриль' },
    { name: 'Острые' },
    { name: 'Закрытые' },
  ];

  return (
    <div className="categories">
      <ul>
        {dataCategory.map((item, indexItem) => (
          <li
            key={indexItem}
            onClick={() => onChangeCategory(indexItem)}
            className={categoryActiveId === indexItem ? 'active' : ''}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
