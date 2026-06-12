import React from 'react';
import styles from './ToDoInput.module.css';
import { useTodos } from '../../use-to-do';


function ToDoInput() {
  const { isLoading, createTodo} = useTodos();

  const today = new Date().toISOString().split("T")[0];

  const [newTodo, setNewTodo] = React.useState({
    title: '',
    dueDate: today,
  });
 
  function handleToDo(event) {
    event.preventDefault();
    createTodo(newTodo.title, newTodo.dueDate);
    setNewTodo({...newTodo,
      title: '',
      dueDate: today,
    });
  }

  function handleDueNext(e) {
    setNewTodo({
      ...newTodo,
      dueDate: e.target.value
    });
  }

  return <div className={styles.wrapper}>
    <form onSubmit={handleToDo}>
      <div>
      <label>New ToDo:{' '}
      <input 
        disabled={isLoading}
        required={true}
        value={newTodo.title}
        onChange={(event) => {
          setNewTodo({...newTodo, 
            title: event.target.value,
          });
        }}/>
      </label>
      </div>
      <div>
      <label>Due on: 
      <input
          type='date'
          value={newTodo.dueDate}
          onChange={handleDueNext}
      /></label>
      </div>
      <button disabled={isLoading} >
        {isLoading
        ? 'send'
        : 'Add'}
        </button>
    </form>
  </div>;
}

export default ToDoInput;
