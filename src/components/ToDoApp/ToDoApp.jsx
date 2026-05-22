import React from 'react';
import Header from '../Header/Header';
import ToDoInput from '../ToDoInput';
import ToDoList from '../ToDoList';
import ToDo from '../ToDo';

function ToDoApp() {

  return <div>
    <Header/>
    <ToDoInput/>
    <ToDoList/>
  </div>;
}

export default ToDoApp;
