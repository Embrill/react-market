import React from 'react';
// Подключение модуль css
import styles from './NotFoundBlock.module.scss';

const index = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😢</span>
        <br></br>
        Ничего не найдено :(
      </h1>
      <p className={styles.description}>
        К сожалению, такой страницы не существует
      </p>
    </div>
  );
};

export default index;
