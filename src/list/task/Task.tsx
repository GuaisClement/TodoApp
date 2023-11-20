import React, { useState } from 'react'
import './Task.css'

type Props = {
    id: number,
    checked: boolean
    title: string,
    content: string,
    date: Date,
}

const Task: React.FC<Props> = (task: Props) => {
    const [showDetails, setShowDetails] = useState(false);
    const [checked,setChecked] = useState<boolean>(task.checked);

    return (
        <div className='task'>
            <div className='row-title'>
                <input type="checkbox" checked={checked} onChange={() => {setChecked(!checked)}} />
                <div  onClick={() => {setShowDetails(!showDetails)}} style={{ cursor: 'pointer' }}>
                    <h3>{task.title}</h3>
                </div>
          </div>
          {showDetails && (
            <div>
              <p>{task.content}</p>
              <p>Date: {task.date.toDateString()}</p>
            </div>
          )}
        </div>
      );
}



export default Task;