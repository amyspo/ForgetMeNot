import React from 'react';


function TaskList({newTask}) {
  return <div>
    <ul>
      {newTask.map((task) => (
        <li key={Math.random()}>{task}</li>
      ))}
    </ul>
  </div>;
}

export default TaskList;
