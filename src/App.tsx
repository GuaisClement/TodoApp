import './App.css'
import React, { useState } from 'react';
import Taskbar from './header/Taskbar'
import TaskList from './TaskList/TaskList';

function App() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTaskList, setTaskList] = useState(false);

  
  const toggleTaskList = () => {    
    setTaskList(!showTaskList);
  };
  const toggleCalendar = () => {    
    setShowCalendar(!showCalendar);
  };

  return (
    <>
      <div className="App">
        <h1>Mon Application</h1>
        <Taskbar onCalendar={toggleCalendar} onList={toggleTaskList}/>
        
        <TaskList/> 
             
      </div>
    </>
  )
}

export default App;
