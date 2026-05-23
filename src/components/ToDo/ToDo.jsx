import React from 'react';
import styles from './ToDo.module.css';
import clsx from 'clsx';

const today = new Date().toISOString().split("T")[0];

function ToDo({title, identifier, deleteTodo}) {
  const [isDone, setIsDone] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);

  function handleDone() {
    setIsDone(!isDone);
  }

  function handleEdit() {
    setEditMode(!editMode);
  }

  return <div>
    <div>
      <ul className={styles.list}>
        <li>
          <div className={styles.flex}>
            <div className={styles.title}>
              {!editMode
              ? <h2 className={clsx(isDone ? styles.titledone : '')}>{title}</h2>
              : <input value={title}></input>}
            </div>
            <div className={styles.date}>
              <p className={styles.p}>Due Date:</p>
              <p className={styles.p}>{today}</p>
              <button onClick={handleEdit}>edit todo</button>
            </div>
            <div className={styles.buttons}>
              <button className={styles.done} onClick={handleDone}>Done</button>
              <button className={styles.delete} onClick={() => deleteTodo(identifier)}>Delete</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>;
}

export default ToDo;
