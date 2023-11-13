import React, { useState } from 'react';
import { FaHome, FaList, FaCheck, FaCalendar } from 'react-icons/fa';
import './Taskbar.css';
import Calendar from '../calendar/calendar'; // Assurez-vous d'importer le composant Calendar depuis le bon emplacement

const Taskbar = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div className="taskbar">
      <div className="taskbar-icon"><FaHome /></div>
      <div className="taskbar-icon"><FaList /></div>
      <div className="taskbar-icon"><FaCheck /></div>
      <div className="taskbar-icon" onClick={toggleCalendar}><FaCalendar /></div>

      {showCalendar && <Calendar />}
    </div>
  );
}

export default Taskbar;
