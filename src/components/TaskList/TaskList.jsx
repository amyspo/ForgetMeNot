import React from 'react';

function TaskList({newTask}) {
  return <div>
    <ul>
      {newTask.map((task) => (
        <li key={Math.random()}>
          <div>
            <h3>{task.taskTitle}</h3> 
            Due: {task.dueNext} Schedule: {task.scheduledAs}
          </div>
          <div>
            Description: {task.taskDescription} 
          </div>
        </li>
      ))}
    </ul>
  </div>;
}

export default TaskList;
