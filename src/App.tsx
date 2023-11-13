import { useEffect, useState } from 'react'
import './App.css'
import Taskbar from './header/Taskbar';

function App() {
  return (
    <div className="App">
      <h1>Mon Application</h1>
      {/* Autres composants de votre application */}
      <Taskbar />
    </div>
  );
}

export default App
