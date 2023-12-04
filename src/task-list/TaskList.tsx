import Task from "./task/Task";
import {TaskModel} from "../model/task-model";
import { useState } from "react";
import AddTask from "./add-task/add-task";

import './TaskList.css';

function TaskList() {

  //Liste Tâche
  const [tasks, setTasks] = useState([
    {
      id: 1,
      checked: false,
      title: 'Faire les courses',
      content: 'Acheter du lait, des œufs, et du pain.',
      date: new Date(),
    },
    {
      id: 2,
      checked: true,
      title: 'Courir',
      content: 'Acheter du lait, des œufs, et du pain.',
      date: new Date(),
    },
    {
      id: 3,
      checked: false,
      title: 'Faire la course',
      content: 'Acheter du lait, des œufs, et du pain.',
      date: new Date(),
    }
  ]);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (newTask: TaskModel) => {
    // MAJ locale Ajout tache
    setTasks([...tasks, newTask]);
    setIsModalOpen(false);
  }
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
 
    return (
      <div>
        {isModalOpen && (
          <>
            <div className="overlay" onClick={handleCloseModal}></div>
            <AddTask onAddTask={handleAddTask} onCloseModal={handleCloseModal} />
          </>
        )}
        
        <button onClick={handleOpenModal}>Ajouter une Tâche</button>
        {tasks.map((task: TaskModel) => (
          <article key={task.id}>
            <Task {...task}/>
          </article>
        ))}
      </div>
    );
}

export default TaskList;
