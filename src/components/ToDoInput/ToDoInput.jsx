import React from "react";
import styles from "./ToDoInput.module.css";
import { useTodos } from "../../use-to-do";
import Button from "../Button/Button";
import { Plus } from "react-feather";

function ToDoInput() {
  const { isLoading, createTodo } = useTodos();

  // const today = new Date().toISOString().split("T")[0];

  const [newTodo, setNewTodo] = React.useState({
    title: "",
    dueDate: "",
  });

  function handleToDo(event) {
    event.preventDefault();
    createTodo(newTodo.title, newTodo.dueDate);
    setNewTodo({ ...newTodo, title: "", dueDate: "" });
  }

  function handleDueNext(e) {
    setNewTodo({
      ...newTodo,
      dueDate: e.target.value,
    });
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleToDo}>
        <div className={styles.formgroup}>
          <label htmlFor="task">
            Task:{" "}
            <input
              id="task"
              disabled={isLoading}
              required={true}
              value={newTodo.title}
              onChange={(event) => {
                setNewTodo({ ...newTodo, title: event.target.value });
              }}
            />
          </label>
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="dueDate">
            Due on:{" "}
            <input
              id="dueDate"
              type="date"
              value={newTodo.dueDate}
              onChange={handleDueNext}
            />
          </label>
        </div>
        <Button icon={<Plus />} aria-label="Add Task" disabled={isLoading}>
          {isLoading ? "send" : ""}
        </Button>
      </form>
    </div>
  );
}

export default ToDoInput;
