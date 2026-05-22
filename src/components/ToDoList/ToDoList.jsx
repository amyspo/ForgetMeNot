import React from 'react';
import styles from './ToDoList.module.css';
import useSWR from 'swr';

const ENDPOINT = 'api/todos/open';

async function fetcher(endpoint) {
  const response = await fetch(endpoint);
  const json = await response.json();

  if (!response.ok) {
    throw json;
  }
  return json;
}

function ToDoList() {
  const { data, isLoading, error } = useSWR(ENDPOINT, fetcher);

  if (isLoading) {
    return <p>Loading…</p>;
  }

  if (error) {
    console.log(error)
    return <p>Something's gone wrong</p>;
  }

  return <div className={styles.wrapper}>
    <ul className={styles.list}>
      {data?.map(({id, title}) => (
         <li key={id}>{title}</li>
      ))}
    </ul>
  </div>;
}

export default ToDoList;
