// AddTask.js (ou AddTask.jsx si vous utilisez JavaScript)

import React, { useState } from 'react';
import { TaskModel } from '../../model/task-model';
import './add-task.css';
import { IoClose } from 'react-icons/io5';

type AddTaskProps = {
  onAddTask: (newTask: TaskModel) => void;
  onCloseModal: () => void;
};

const AddTask: React.FC<AddTaskProps> = ({ onAddTask, onCloseModal }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleAddTask = () => {
    const newTask = {
      id: Math.random(),
      checked: false,
      title,
      content,
      date: dueDate ? new Date(dueDate) : new Date(),
      tags : ["tag2"],
    };

    onAddTask(newTask);
    // Réinitialiser le form
    setTitle('');
    setContent('');
    setDueDate('');
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='close' onClick={onCloseModal}>
          <IoClose></IoClose>
        </div>
        <h2>Ajouter une tâche</h2>
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
          <button type="button" onClick={handleAddTask}>
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
