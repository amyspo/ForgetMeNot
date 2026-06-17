import React from 'react';
import styles from './ToDo.module.css';
import clsx from 'clsx';
import { useTodos } from '../../use-to-do';
import Button from '../Button/Button';
import { Trash2, Check, Edit2 } from 'react-feather';

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
              : <input className={styles.input} value={todoTitle} 
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
              <p className={styles.p}>Due Date:</p>
              <p className={styles.p}>{dueDate}</p>
            </div>
            <div className={styles.buttons}>
              {!editMode && <Button variants='done' aria-label="Done item" onClick={handleDone} disabled={editMode} icon={<Check />}></Button>}
              <Button variants='edit' icon={editMode ? <Check/> : <Edit2/>} onClick={handleEdit} >
              </Button>
              {!editMode && <Button variants='delete' aria-label="Delete item" onClick={() => deleteTodo(identifier)} disabled={editMode} icon={<Trash2 />}></Button>}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>;
}

export default ToDo;
