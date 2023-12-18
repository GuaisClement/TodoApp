import React, { useState } from 'react'
import './Task.css'
import { ImBin2 } from "react-icons/im";
import { TaskModel } from '../../model/task-model';

type Props = {
    task: TaskModel,
    onRemmoveTask: (id: string)=>void;
    onChecked: (task: TaskModel)=>void;
}

const Task: React.FC<Props> = (props: Props) => {
    const [showDetails, setShowDetails] = useState(false);
    const [checked,setChecked] = useState<boolean>(props.task.checked);

    const handleRemoveTask = () => {
      props.onRemmoveTask(props.task.id);
    };

    const handleChecked = () => {
      setChecked(!checked);
      props.onChecked(props.task);
    }

    return (
        <div className='task'>
          <div className='row-title-task'>
              <input type="checkbox" checked={checked} onChange={() => {handleChecked}} />
              <div  onClick={() => {setShowDetails(!showDetails)}} style={{ cursor: 'pointer' }}>
                  <span style={{ fontSize: 24 }}>{props.task.title}</span>
              </div>
              <div className="task-icon" onClick={handleRemoveTask}>
                <ImBin2></ImBin2>
              </div>
          </div>
          {showDetails && (
            <div>
              <span>{props.task.content}</span>
              <br />
              <span>Date: {props.task.date.toDateString()}</span>
            </div>
          )}
        </div>
      );
}

export default Task;