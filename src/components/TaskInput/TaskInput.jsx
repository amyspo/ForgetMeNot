import React from 'react';

function TaskInput({ addTask }) {
  const [inputValue, setInputValue] =
    React.useState('');
  
  return <div>
    <form
      className="taskinput"
      onSubmit={event => {
        event.preventDefault();
        addTask(inputValue);
        setInputValue('');
      }}
    >
      <label htmlFor='taskinput'></label>
      <input
        id='taskinput'
        value={inputValue}
        type="text"
        onChange={event => {
          setInputValue(event.target.value);
        }}
      />
      <button>Add Task</button>
      </form>    
  </div>;
}

export default TaskInput;
