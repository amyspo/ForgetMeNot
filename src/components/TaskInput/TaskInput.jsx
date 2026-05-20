import React from 'react';
import styles from './TaskInput.module.css';

function TaskInput({ addTask }) {
  const today = new Date().toISOString().split("T")[0];

  const [task, setTask] = React.useState({
    taskTitle: 'Do Laundry',
    taskDescription: 'Sort laundry and wash it',
    dueNext: today,
    scheduledAs: 'monthly',
  });

  console.log(task);

  function handleTitleChange(e) {
    setTask({
      ...task,
      taskTitle: e.target.value
    });
  }

  function handleDescriptionChange(e) {
    setTask({
      ...task,
      taskDescription: e.target.value
    });
  }

  function handleDueNext(e) {
    setTask({
      ...task,
      dueNext: e.target.value
    });
  }

  function handleScheduledAs(e) {
    setTask({
      ...task,
      scheduledAs: e.target.value
    });
  }
  
  return <div>
    <form
      className="taskinput"
      onSubmit={event => {
        event.preventDefault();
        addTask(task);
        setTask({
          taskTitle: '',
          taskDescription: '',
          dueNext: '2026-05-15',
          scheduledAs: 'daily',
        });
      }}
    >
      <div>
      <label>New Task: 
        <input
        value={task.taskTitle}
        onChange={handleTitleChange}
        />
      </label>
      </div>
      <div>
      <label>Description:  
        <textarea
        value={task.taskDescription}
        onChange={handleDescriptionChange}
        />
      </label>
      </div>
      <div>
        <label>Schedule:
          <select
            value={task.scheduledAs}
            onChange={handleScheduledAs}
          >
              <option value="daily">
                daily
              </option>
              <option value="weekly">
                weekly
              </option>
              <option value="monthly">
                monthly
              </option>
              <option value="yearly">
                yearly
              </option>
            </select>
          </label>
        </div>
      <div>
        <label>Next Due Date: 
          <input
          type='date'
          value={task.dueNext}
          onChange={handleDueNext}
        /></label>
      </div>
      <button>Add Task</button>   
      </form>
  </div>;
}

export default TaskInput;
