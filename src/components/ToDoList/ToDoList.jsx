import React from 'react';
import styles from './ToDoList.module.css';
import ToDo from '../ToDo/ToDo';

import { useTodos } from '../../use-to-do';

function ToDoList() {
  const { data, isLoading, error, deleteTodo} = useTodos();

  if (isLoading) {
    return <p>Loading…</p>;
  }

  if (error) {
    console.log(error)
    return <p>Something's gone wrong</p>;
  }

  return <div className={styles.wrapper}>
    <ul className={styles.list}>
      {data?.map(({id, title, dueDate}) => (
         <ToDo key={id} title={title} identifier={id} dueDate={dueDate} deleteTodo={deleteTodo}/>
      ))}
    </ul>
  </div>;
}

export default ToDoList;
