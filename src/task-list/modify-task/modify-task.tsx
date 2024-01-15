// AddTask.js (ou AddTask.jsx si vous utilisez JavaScript)

import React, { useState } from 'react';
import { TaskModel } from '../../model/task-model';
import '../add-task/add-task.css';
import { IoClose } from 'react-icons/io5';

type ModifyTaskProps = {
    task: TaskModel,
    onModifyTask: (taskModified: TaskModel) => void;
    onCloseModal: () => void;
};

const ModifyTask: React.FC<ModifyTaskProps> = (props: ModifyTaskProps) => {
  const [title, setTitle] = useState(props.task.title);
  const [content, setContent] = useState(props.task.content);
  const [dueDate, setDueDate] = useState(props.task.date.toISOString().split('T')[0]);

  const handleAddTask = () => {
    const taskModified = {
      id: props.task.id,
      checked: props.task.checked,
      title,
      content,
      date: dueDate ? new Date(dueDate) : new Date(),
      tags : props.task.tags,
      favorite: props.task.favorite
    };

    props.onModifyTask(taskModified);
    // Réinitialiser le form
    setTitle('');
    setContent('');
    setDueDate('');
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='close' onClick={props.onCloseModal}>
          <IoClose></IoClose>
        </div>
        <h2>Modifier</h2>
        <form>
          <div className='form-element'>
            <label>Titre : </label>
            <input type="text" value={title} placeholder='Titre' onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className='form-element'>
            <label>Contenu : </label>
            <textarea value={content} placeholder='Contenu' onChange={(e) => setContent(e.target.value)} />
          </div>
          <div className='form-element'>
            <label> Date d'échéance : </label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>
          <button type="button" onClick={handleAddTask} disabled={!title.trim()}>
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModifyTask;
