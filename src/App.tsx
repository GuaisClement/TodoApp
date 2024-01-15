import React, { useEffect, useState } from 'react';
import './App.css';
import Taskbar from './header/Taskbar';
// import 'react-calendar/dist/Calendar.css';
import MyCalendar from './calendar/calendar';
import TaskList from './task-list/TaskList';
import Home from './home/Home';
import { CiDark, CiLight } from "react-icons/ci";

function App() {
  const [activeView, setActiveView] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
  };

  const switchView = (view: React.SetStateAction<string>) => {
    setActiveView(view);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bg-color', isDarkMode ? '#242424' : '#ffffff');
    root.style.setProperty('--bg-color-oposite', isDarkMode ? '#ffffff' : '#242424');
}, [isDarkMode]);

  return (
    <div className={`App ${isDarkMode ? 'Component-dark-mode' : 'Component-light-mode'}`}>      
      <Taskbar isDarkMode={isDarkMode} switchView={switchView} />
      <div className="toggleDarkMode" onClick={toggleDarkMode}>
        {isDarkMode ? <CiLight /> : <CiDark />}
      </div>

      <main>
        {activeView === 'home' && <Home></Home>}
        {activeView === 'list' && <TaskList></TaskList>}
        {activeView === 'check' && <p>Contenu Archivé</p>}
        {activeView === 'calendar' && <p><MyCalendar /></p>}
      </main>
    </div>
  );
}

export default App;
