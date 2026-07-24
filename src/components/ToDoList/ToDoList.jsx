import React from "react";
import styles from "./ToDoList.module.css";
import ToDo from "../ToDo/ToDo";
import Button from "../Button/Button";

import { useTodos } from "../../use-to-do";

function ToDoList() {
  const [view, setView] = React.useState("open");
  const { data, isLoading, error, deleteTodo } = useTodos(view);

  if (isLoading) {
    return <p>Loading…</p>;
  }

  if (error) {
    console.log(error);
    return <p>Something's gone wrong</p>;
  }

  return (
    <div>
      <div className={styles.buttons}>
        <Button onClick={() => setView("open")}>Open Tasks</Button>
        <Button onClick={() => setView("completed")}>Done Tasks</Button>
      </div>
      <div className={styles.wrapper}>
        <ul className={styles.list}>
          {data?.map(({ id, title, dueDate }) => (
            <ToDo
              key={id}
              title={title}
              identifier={id}
              dueDate={dueDate}
              deleteTodo={deleteTodo}
              status={view}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDoList;
