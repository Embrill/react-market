import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem, CartItem } from '../../redux/slices/cartSlice';
import { RootState } from '../../redux/store';

// Тип пиццы
const typePizzaNames = ['Тонкое', 'Традиционное'];

type PizzaBlockProps = {
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  typesPizza: number[];
  id: string;
  rating: number;
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({ title, price, imageUrl, sizes, typesPizza, id }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) => state.cartSlice.items.find((obj) => obj.id === id));
  const [activeTypeId, setActiveTypeId] = useState(0);
  // Размер пиццы
  const [activeSizeId, setActiveSizeId] = useState(0);

  const adddedCount = cartItem ? cartItem.count : 0;
  // Добавление товара в корзину
  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typePizzaNames[activeTypeId], // отображение типа по индексу
      sizes: sizes[activeSizeId],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        {/* Открытие карточки пиццы при клике на IMG */}
        <Link to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        </Link>
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          {/* Тип пиццы */}
          <ul>
            {typesPizza.map((item, index) => (
              <li onClick={() => setActiveTypeId(index)} key={item} className={activeTypeId === index ? 'active' : ''}>
                {typePizzaNames[item]}
              </li>
            ))}
          </ul>
          {/* Размер пиццы */}
          <ul>
            {sizes.map((item, index) => (
              <li onClick={() => setActiveSizeId(index)} key={index} className={activeSizeId === index ? 'active' : ''}>
                {item} см
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button onClick={onClickAdd} className="button button--outline button--add">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {adddedCount > 0 && <i>{adddedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
