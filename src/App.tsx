import React, { useState } from 'react';
import './App.css';
import Taskbar from './header/Taskbar';
// import 'react-calendar/dist/Calendar.css';
import MyCalendar from './calendar/calendar';
import TaskList from './task-list/TaskList';

function App() {
  const [activeView, setActiveView] = useState('home');

  const switchView = (view: React.SetStateAction<string>) => {
    setActiveView(view);
  };

  return (
    <div className="App">
      <Taskbar switchView={switchView} />
      <main>
        {activeView === 'home' && <p>Contenu de la vue Accueil</p>}
        {activeView === 'list' && <TaskList></TaskList>}
        {activeView === 'check' && <p>Contenu de la vue Check</p>}
        {activeView === 'calendar' && <p><MyCalendar/></p>}
      </main>
    </div>
  );
}

export default App;
