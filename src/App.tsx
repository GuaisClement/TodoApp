import React, { useState } from 'react';
import './App.css';
import Taskbar from './header/Taskbar';
import TaskList from './TaskList/TaskList';

function App() {
  const [activeView, setActiveView] = useState('home');

  const switchView = (view: React.SetStateAction<string>) => {
    setActiveView(view);
  };

  return (
    <div className="App">
      <h1>Mon Application</h1>
      <Taskbar switchView={switchView} />
      <main>
        {activeView === 'home' && <p>Contenu de la vue Accueil</p>}
        {activeView === 'list' && <TaskList></TaskList>}
        {activeView === 'check' && <p>Contenu de la vue Check</p>}
        {activeView === 'calendar' && <p>Contenu de la vue Calendrier</p>}
      </main>
    </div>
  );
}

export default App;
