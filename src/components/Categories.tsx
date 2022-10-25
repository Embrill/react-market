import React from 'react';

// Название категорий
const categoryName = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

type CategoriesProps = {
  categoryActiveId: number;
  onChangeCategory: (indexItem: number) => void;
  // () => void - типизация ф-и
};

const Categories: React.FC<CategoriesProps> = ({ categoryActiveId, onChangeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categoryName.map((item, indexItem) => (
          <li
            key={indexItem}
            onClick={() => onChangeCategory(indexItem)}
            className={categoryActiveId === indexItem ? 'active' : ''}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
