import React from 'react';
import { FaHome, FaList, FaCheck, FaCalendar } from 'react-icons/fa';
import './Taskbar.css';

interface TaskbarProps {
  switchView: (view: string) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ switchView }) => {
  return (
    <div className="taskbar">
      <div className="taskbar-icon" onClick={() => switchView('home')}><FaHome /></div>
      <div className="taskbar-icon" onClick={() => switchView('list')}><FaList /></div>
      <div className="taskbar-icon" onClick={() => switchView('check')}><FaCheck /></div>
      <div className="taskbar-icon" onClick={() => switchView('calendar')}><FaCalendar /></div>
    </div>
  );
}

export default Taskbar;
