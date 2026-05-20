import React from 'react';

function TaskList({newTask}) {
  const [filter, setFilter] = React.useState('all')

  const today = new Date().toISOString().split("T")[0];

  const displayedTasks =
  filter === "today"
    ? newTask.filter(task => task.dueNext === today)
    : newTask;

  return <div>
    <div>
      <fieldset>
        <legend>Show all tasks or only todays:</legend>

        <label>
        <input
          type="radio"
          name="taskFilter"
          value="all"
          checked={filter === "all"}
          onChange={(e) => setFilter(e.target.value)}
        />
        All Tasks
      </label>

      <label>
        <input
          type="radio"
          name="taskFilter"
          value="today"
          checked={filter === "today"}
          onChange={(e) => setFilter(e.target.value)}
        />
        Todays Tasks
      </label>
      </fieldset>
    </div>
    <ul>
      {displayedTasks.map((task) => (
        <li key={Math.random()}>
          <div>
            <h3>{task.taskTitle}</h3> 
            Due: {task.dueNext} Schedule: {task.scheduledAs}
          </div>
          <div>
            Description: {task.taskDescription} 
          </div>

          <div>
            <input type="checkbox" id="done" />
            <label htmlFor="done">Done</label>
          </div>
        </li>
      ))}
    </ul>
  </div>;
}

export default TaskList;
