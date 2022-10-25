import React from 'react';
// Подключение модуль css
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😢</span>
        <br></br>
        <p>Ничего не найдено :(</p>
      </h1>
      <p className={styles.description}>К сожалению, такой страницы не существует</p>
    </div>
  );
};

export default NotFoundBlock;
