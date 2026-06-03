import React from 'react';
import styles from './ToDo.module.css';
import clsx from 'clsx';



function ToDo({title, identifier, dueDate, deleteTodo}) {
  const [isDone, setIsDone] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [todoTitle, setTodoTitle] = React.useState(title);

  async function sendNewTitle(todoTitle) {

    try {
      const response = await fetch(`api/todos/${identifier}/rename`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newTitle: todoTitle,
        }),
      });

      const json = await response.json();

      if (json.id) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
        setStatus('error');
    }
  }

  function handleDone() {
    setIsDone(!isDone);
  }

  function handleEdit() {
    setEditMode(!editMode);
    sendNewTitle(todoTitle);
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
                    sendNewTitle(todoTitle);
                }
                }}/>}
            </div>
            <div className={styles.date}>
              <p className={styles.p}>Due Date:</p>
              <p className={styles.p}>{dueDate}</p>
              <button onClick={handleEdit}>{editMode 
                  ? 'DONE'
                  : 'start edit'}
              </button>
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
