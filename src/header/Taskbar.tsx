import React from 'react';
import { FaCalendar, FaHome, FaList, FaStar } from 'react-icons/fa';
import './Taskbar.css';

interface TaskbarProps {
  switchView: (view: string) => void;
  isDarkMode: boolean;
}

const Taskbar: React.FC<TaskbarProps> = ({ switchView, isDarkMode}) => {
  return (
    <div className={`taskbar ${isDarkMode ? 'Component-dark-mode' : 'Component-light-mode'}`}>
      <div className="taskbar-icon" onClick={() => switchView('home')}><FaHome /></div>
      <div className="taskbar-icon" onClick={() => switchView('list')}><FaList /></div>
      <div className="taskbar-icon" onClick={() => switchView('fav')}><FaStar/></div>
      <div className="taskbar-icon" onClick={() => switchView('calendar')}><FaCalendar /></div>      
    </div>
  );
}

export default Taskbar;
