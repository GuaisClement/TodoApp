import React, { useState } from 'react';
import './App.css';
import Taskbar from './header/Taskbar';
// import 'react-calendar/dist/Calendar.css';
import MyCalendar from './calendar/calendar';
import TaskList from './task-list/TaskList';
import Home from './home/Home';
import Favorite from './favorite/favorite';

function App() {
  const [activeView, setActiveView] = useState('home');

  const switchView = (view: React.SetStateAction<string>) => {
    setActiveView(view);
  };

  return (
    <div className="App">
      <Taskbar switchView={switchView} />
      <main>
        {activeView === 'home' && <Home></Home>}
        {activeView === 'list' && <TaskList></TaskList>}
        {activeView === 'check' && <Favorite></Favorite>}
        {activeView === 'calendar' && <p><MyCalendar/></p>}
      </main>
    </div>
  );
}

export default App;
