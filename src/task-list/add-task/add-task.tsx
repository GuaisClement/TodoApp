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
  const [tags, setTags] = useState<string[]>([]);  
  const [tagInput, setTagInput] = useState('');

  const handleAddTask = () => {
    const newTask = {
      id: '',
      checked: false,
      title,
      content,
      date: dueDate ? new Date(dueDate) : new Date(),
      tags,
    };

    onAddTask(newTask);
    // Réinitialiser le form
    setTitle('');
    setContent('');
    setDueDate('');
    setTags([]);
  };

  
  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags((prevTags) => [...prevTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
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
          <div className='form-element'>
            <label>Tags : </label>
            <div>
              <input
                type="text"
                value={tagInput}
                placeholder='Ajouter un tag'
                onChange={(e) => setTagInput(e.target.value)}
              />
              <button type="button" onClick={handleAddTag}>
                Ajouter Tag
              </button>
            </div>
            <div>
              {tags.map((tag) => (
                <span key={tag} className="tag">                  
                  <button type="button" onClick={() => handleRemoveTag(tag)}>
                  {tag}
                  &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
          <button type="button" onClick={handleAddTask} disabled={!title.trim()}>
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
