import React from 'react';
import styles from './ToDoInput.module.css';
import { mutate } from 'swr';


function ToDoInput() {
  const today = new Date().toISOString().split("T")[0];
  const [newTodo, setNewTodo] = React.useState({
    title: '',
    dueDate: today,
  });
  const [status, setStatus] = React.useState('idle');
  const [dateStatus, setDateStatus] = React.useState('idle');
 
  function handleToDo(event) {
    event.preventDefault();
    sendTask(newTodo);
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

  async function sendTask(newTodo) {

    setStatus('loading');

    try {
      const response = await fetch("api/todos", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTodo.title,
        }),
      });

      const json = await response.json();

      try {
        if (json.id) {
        setStatus('success');
        const todoId = json.id;
        const dateResponse = await fetch(`api/todos/${todoId}/due-date`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dueDate: newTodo.dueDate,
        }),

      });
      
        const dateJson = await dateResponse.json();

        console.log(dateJson);

        } else {
          setStatus('error');
        }
      } catch {
        setDateStatus('error');
      }
    } catch {
        setStatus('error');
    }
    mutate('/api/todos/open');
  }

  return <div className={styles.wrapper}>
    <form onSubmit={handleToDo}>
      <div>
      <label>New ToDo:{' '}
      <input 
        disabled={status === 'loading'}
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
          value={newTodo.dueNext}
          onChange={handleDueNext}
      /></label>
      </div>
      <button disabled={status === 'loading'} >
        {status === 'loading'
        ? 'send'
        : 'Add'}
        </button>
    </form>
    <div>{status}</div>
    <div>{dateStatus}</div>
  </div>;
}

export default ToDoInput;
