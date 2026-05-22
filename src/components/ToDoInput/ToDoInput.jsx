import React from 'react';
import styles from './ToDoInput.module.css';

function ToDoInput({addToDo}) {
  const [inputValue, setInputValue] = React.useState('');

  function handleToDo(event) {
    event.preventDefault();
    addToDo(inputValue);
    setInputValue('');
  }

  return <div className={styles.wrapper}>
    <form onSubmit={handleToDo}>
      <label>New ToDo:{' '}
      <input 
        required={true}
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}/>
      </label>
      <button>Add</button>
    </form>
  </div>;
}

export default ToDoInput;
