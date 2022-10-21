import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
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
    return 'Загрузка...';
  }

  // Пицца уже загрузилась
  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <p></p>
      <h4>{pizza.price} Р</h4>
    </div>
  );
};

export default FullPizza;
