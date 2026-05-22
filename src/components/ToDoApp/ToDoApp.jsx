import React from 'react';
import Header from '../Header/Header';
import ToDoInput from '../ToDoInput';
import ToDoList from '../ToDoList';

function ToDoApp() {
  const [toDoList, setToDoList] = React.useState([]);

  function addToDo(newToDo) {
    const newList = [...toDoList, newToDo];
    setToDoList(newList);
    console.log(newList);
  }

  return <div>
    <Header/>
    <ToDoInput addToDo={addToDo}/>
    <ToDoList toDoList={toDoList}/>
  </div>;
}

export default ToDoApp;
