import React from 'react';
import styles from './ToDo.module.css';
import clsx from 'clsx';
import { useTodos } from '../../use-to-do';

function ToDo({title, identifier, dueDate, deleteTodo}) {
  const [isDone, setIsDone] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [todoTitle, setTodoTitle] = React.useState(title);
  const { editTodo } = useTodos();

  function handleDone() {
    setIsDone(!isDone);
  }

  function handleEdit() {
    setEditMode(!editMode);
    // console.log(identifier)
    editTodo(todoTitle, identifier);
  }

  return <div>
    <div>
      <ul className={styles.list}>
        <li>
          <div className={styles.flex}>
            <div className={styles.title}>
              {!editMode
              ? <h2 className={clsx(isDone ? styles.titledone : '')}>{todoTitle}</h2>
              : <input value={todoTitle} 
                onChange = {(event) => {
                  setTodoTitle(event.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    setTodoTitle(todoTitle);
                    setEditMode(false);
                    editTodo(todoTitle);
                }
                }}/>}
            </div>
            <div className={styles.date}>
              <p className={styles.p}>Due Date:</p>
              <p className={styles.p}>{dueDate}</p>
              <button onClick={handleEdit}>{editMode 
                  ? 'done edit'
                  : 'start edit'}
              </button>
            </div>
            <div className={styles.buttons}>
              <button className={styles.done} onClick={handleDone} disabled={editMode}>Done</button>
              <button className={styles.delete} onClick={() => deleteTodo(identifier)} disabled={editMode}>Delete</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>;
}

export default ToDo;
