import React, { useState } from 'react'
import './Task.css'
import { ImBin2 } from "react-icons/im";
import { PiNotePencilBold } from "react-icons/pi";
import { TaskModel } from '../../model/task-model';

type Props = {
    task: TaskModel,
    onRemmoveTask: (id: string)=>void;
    onChecked: (task: TaskModel)=>void;
    onModifyTask: (task: TaskModel)=>void;
    onSelectTag: (tag: string) => void;
}

const Task: React.FC<Props> = (props: Props) => {
    const [showDetails, setShowDetails] = useState(false);

    const handleRemoveTask = () => {
      props.onRemmoveTask(props.task.id);
    };

    const handleModifyTask = () => {
      props.onModifyTask(props.task);
    };

    const handleChecked = () => {

      props.task.checked = !props.task.checked;
      props.onChecked(props.task);
    }

    const handleSelectTag = (tag: string) => {
      props.onSelectTag(tag);
    }

    return (
        <div className='task'>
          <div className='row-title-task'>
              <input type="checkbox" checked={props.task.checked} onChange={handleChecked} />
              <div  onClick={() => {setShowDetails(!showDetails)}} style={{ cursor: 'pointer' }}>
                  <h3>{props.task.title}
                  <div style={{ fontSize: '12px' }}>{props.task.date.getUTCDate()}-{props.task.date.getUTCMonth()+1}</div></h3>
              </div>
              <div className="task-tags" >
                {props.task.tags.map((tag) => (
                  <button onClick={() => handleSelectTag(tag)} key={tag} className="tag-button" >
                    {tag}
                  </button>
                ))}
              </div>
              <div className="task-icon" onClick={handleRemoveTask}>
                <ImBin2></ImBin2>
              </div>
              <div className="modify-icon" onClick={handleModifyTask}>
                <PiNotePencilBold />
              </div>
          </div>
          {showDetails && (
            <div>
              <p>{props.task.content}</p>
              <p>Date: {new Intl.DateTimeFormat('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }).format(props.task.date)}</p>
            </div>
          )}
        </div>
      );
}

export default Task;