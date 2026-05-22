import React from 'react';
import Header from '../Header/Header';
import ToDoInput from '../ToDoInput';
import ToDoList from '../ToDoList';

function ToDoApp() {

  return <div>
    <Header/>
    <ToDoInput/>
    <ToDoList/>
  </div>;
}

export default ToDoApp;
