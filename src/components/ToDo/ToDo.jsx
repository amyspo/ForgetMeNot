import React from "react";
import styles from "./ToDo.module.css";
import clsx from "clsx";
import { useTodos } from "../../use-to-do";
import Button from "../Button/Button";
import { Trash2, Check, Edit2, Edit } from "react-feather";

function ToDo({ title, identifier, dueDate, deleteTodo, status }) {
  const [isDone, setIsDone] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [todoTitle, setTodoTitle] = React.useState(title);
  const [editDate, setEditDate] = React.useState(dueDate);
  const { editTodo, editedDate, completeTodo, reopenTodo } = useTodos();

  const hasDate = editDate !== "" && editDate !== undefined;

  function handleDone() {
    setIsDone(!isDone);
    completeTodo(identifier);
  }

  function handleEdit() {
    setEditMode(!editMode);
    editTodo(todoTitle, identifier);
    editedDate(editDate, identifier);
  }

  return (
    <div>
      <div>
        <ul className={styles.list}>
          <li>
            <div className={styles.flex}>
              <div className={styles.title}>
                {!editMode ? (
                  <h2 className={clsx(isDone ? styles.titledone : "")}>
                    {todoTitle}
                  </h2>
                ) : (
                  <input
                    className={styles.input}
                    value={todoTitle}
                    autoFocus={editMode}
                    onChange={(event) => {
                      setTodoTitle(event.target.value);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        setTodoTitle(todoTitle);
                        handleEdit();
                      }
                    }}
                  />
                )}
                {!editMode ? (
                  hasDate && (
                    <>
                      <p className={styles.p}>Due Date:</p>
                      <p className={styles.p}>{editDate}</p>
                    </>
                  )
                ) : (
                  <label>
                    Due on:
                    <input
                      type="date"
                      value={editDate}
                      onChange={(event) => {
                        setEditDate(event.target.value);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          setEditDate(editDate);
                          handleEdit();
                        }
                      }}
                    />
                  </label>
                )}
              </div>
              <div className={styles.buttons}>
                {status === "open" && (
                  <>
                    {!editMode && (
                      <Button
                        variants="done"
                        aria-label="Mark as Done"
                        onClick={handleDone}
                        icon={<Check />}
                      ></Button>
                    )}
                    <Button
                      variants="edit"
                      aria-label="Edit Task"
                      icon={editMode ? <Check /> : <Edit2 />}
                      onClick={handleEdit}
                    ></Button>
                    {!editMode && (
                      <Button
                        variants="delete"
                        aria-label="Delete Task"
                        onClick={() => deleteTodo(identifier)}
                        icon={<Trash2 />}
                      ></Button>
                    )}
                  </>
                )}
                {status === "completed" && (
                  <>
                    <Button
                      variants="reopen"
                      aria-label="Reopen Task"
                      icon={<Edit />}
                      onClick={() => reopenTodo(identifier)}
                    ></Button>
                    <Button
                      variants="delete"
                      aria-label="Delete Task"
                      onClick={() => deleteTodo(identifier)}
                      icon={<Trash2 />}
                    ></Button>
                  </>
                )}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ToDo;
