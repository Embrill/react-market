import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

// Типизируем FullPizza, как тип: React.FC | FC - functional component
const FullPizza: React.FC = () => {

  const [pizza, setPizza] = React.useState<{
    // Добавляем "<>" и внутрь описываем вложенные свойства и их типы
    imageUrl: string,
    title: string,
    price: number,
  }>();

  const { id } = useParams(); // Используется для назначения id
  // id === params.id
  const navigate = useNavigate(); // как useDispatch(), но для navigate

  // Запрос на бекенд
  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const response = await axios.get('https://633e73820dbc3309f3b5d032.mockapi.io/photo_collections/' + id);
        setPizza(response.data);
      } catch (error) {
        alert('К сожалению, такой пиццы нет.');
        navigate('/'); // Перенаправление на главную
      }
    }

    fetchPizza();
  }, []);

  // Если пиццы еще грузится
  if (!pizza) {
    // Возвращаем фрагмент строчки, т.к. этого требует TS
    return <h2>Загрузка...</h2>
  }
  // После проверки  if (!pizza) - pizza в любом случае будет {объектом}
  // Так как выбор с undefined уже отсекается проверкой

  // Пицца уже загрузилась
  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} Р</h4>
    </div>
  );
};

export default FullPizza;
