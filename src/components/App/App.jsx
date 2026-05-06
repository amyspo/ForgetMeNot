import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TaskList from '../TaskList/TaskList';
import TaskInput from '../TaskInput/TaskInput';

function App() {
  const [newTask, setNewTask] = React.useState([]);

  function addTask (nT) {
    const newArray = [...newTask, nT];
    setNewTask(newArray);
  }

  console.log(newTask);

  return (
  <div>
    <Header/>
    <TaskInput addTask={addTask} />
    <TaskList newTask={newTask} />
    <Footer/>
  </div>
  );
}

export default App;
