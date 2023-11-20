
import { FaHome, FaList, FaCheck, FaCalendar } from 'react-icons/fa';
import './Taskbar.css';

interface TaskbarProps{
  onList : ()=> void;
  onCalendar : ()=> void;
}

const Taskbar: React.FC<TaskbarProps> = (props: TaskbarProps) => {  
  return (
    <div className="taskbar">
      <div className="taskbar-icon"><FaHome /></div>
      <div className="taskbar-icon" onClick={props.onList}><FaList /></div>
      <div className="taskbar-icon"><FaCheck /></div>
      <div className="taskbar-icon" onClick={props.onCalendar}><FaCalendar /></div>
    </div>
  );
}

export default Taskbar;
