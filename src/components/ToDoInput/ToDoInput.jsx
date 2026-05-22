import React from 'react';
import styles from './ToDoInput.module.css';

function ToDoInput({addToDo}) {
  const [inputValue, setInputValue] = React.useState('');
  const [status, setStatus] = React.useState('idle');
 
  function handleToDo(event) {
    event.preventDefault();
    sendTask(inputValue);
    addToDo(inputValue);
    setInputValue('');
  }

  async function sendTask(inputValue) {

    setStatus('loading');

    try {
      const response = await fetch("api/todos", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: inputValue,
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

  return <div className={styles.wrapper}>
    <form onSubmit={handleToDo}>
      <label>New ToDo:{' '}
      <input 
        disabled={status === 'loading'}
        required={true}
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}/>
      </label>
      <button disabled={status === 'loading'} >
        {status === 'loading'
        ? 'send'
        : 'Add'}
        </button>
    </form>
    <div>{status}</div>
  </div>;
}

export default ToDoInput;
