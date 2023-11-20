// AddTask.js (ou AddTask.jsx si vous utilisez JavaScript)

import React, { useState } from 'react';
import { TaskModel } from '../../model/task-model';

interface AddTaskProps {
  onAddTask: (newTask: TaskModel) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
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
    };

    onAddTask(newTask);
    // Réinitialiser le form
    setTitle('');
    setContent('');
    setDueDate('');
  };

  return (
    <div>
      <h2>Ajouter une tâche</h2>
      <form>
        <label>
          Titre :
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Contenu :
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <br />
        <label>
          Date d'échéance :
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleAddTask}>
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddTask;
