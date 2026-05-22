import React from 'react';
import styles from './ToDoList.module.css';

function ToDoList({toDoList}) {
  return <div className={styles.wrapper}>
    <ul className={styles.list}>
      {toDoList.map((item) => (
            <li key={Math.random()}>{item}</li>
      ))}
    </ul>
  </div>;
}

export default ToDoList;
