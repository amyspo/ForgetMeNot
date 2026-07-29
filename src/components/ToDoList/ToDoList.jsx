import React from "react";
import styles from "./ToDoList.module.css";
import ToDo from "../ToDo/ToDo";
import Button from "../Button/Button";

import { useTodos } from "../../use-to-do";

function ToDoList() {
  const [view, setView] = React.useState("open");
  const { data, isLoading, error, deleteTodo, reopenTodo } = useTodos(view);

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
        <Button isActive={view === 'open'} onClick={() => setView("open")}>Open Tasks</Button>
        <Button isActive={view === 'completed'} onClick={() => setView("completed")}>Done Tasks</Button>
      </div>
      <div>
        <ul className={styles.list}>
          {data?.length === 0 ? <p>You don't have any ToDo's.</p> : <></>}
          {data?.map(({ id, title, dueDate }) => (
            <ToDo
              key={id}
              title={title}
              identifier={id}
              dueDate={dueDate}
              deleteTodo={deleteTodo}
              reopenTodo={reopenTodo}
              status={view}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDoList;
