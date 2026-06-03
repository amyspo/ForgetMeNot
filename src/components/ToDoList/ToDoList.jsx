import React from 'react';
import styles from './ToDoList.module.css';
import useSWR from 'swr';
import ToDo from '../ToDo/ToDo';

const ENDPOINT = '/api/todos/open';

async function fetcher(endpoint) {
  const response = await fetch(endpoint);
  const json = await response.json();

  if (!response.ok) {
    throw json;
  }
  return json;
}

function ToDoList() {
  const { data, isLoading, error, mutate } = useSWR(ENDPOINT, fetcher);

  async function deleteTodo(identifier) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this task?'
    );

    if (!confirmed) return;

    const response = await fetch(`/api/todos/${identifier}`, {
     method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Could not delete todo');
    }
    mutate();
  }

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
