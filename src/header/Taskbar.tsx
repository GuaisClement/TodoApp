import React from 'react';
import { FaHome, FaList, FaCheck, FaCalendar} from 'react-icons/fa';
import './Taskbar.css';

const Taskbar = () => {
  return (
    <div className="taskbar">
        <div className="taskbar-icon"><FaHome /></div>
        <div className="taskbar-icon"><FaList /></div>
        <div className="taskbar-icon"><FaCheck /></div>
        <div className="taskbar-icon"><FaCalendar /></div>
    </div>
  );
}

export default Taskbar;