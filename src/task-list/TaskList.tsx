import Task from "./task/Task";
import {TaskModel} from "../model/task-model";
import { useState } from "react";
import AddTask from "./add-task/add-task";

import './TaskList.css';
import TaskFilter from "./filter/Task-filter";

function TaskList() {
  //Liste Tâche
  const [tasks, setTasks] = useState([
    {
      id: 1,
      checked: false,
      title: 'Faire les courses',
      content: 'Acheter du lait, des œufs, et du pain.',
      date: new Date(),
      tags : ["tag1"],
    },
    {
      id: 2,
      checked: true,
      title: 'Courir',
      content: 'Avec ses pieds',
      date: new Date(),
      tags : ["tag1","tag2","tag3"],
    },
    {
      id: 3,
      checked: false,
      title: 'Faire la course',
      content: 'Vroum Vroum',
      date: new Date(),
      tags : ["tag2"],
    },
    {
      id: 4,
      checked: true,
      title: 'Rire',
      content: 'c\'est important dans la vie',
      date: new Date(),
      tags : ["tag3","tag4"],
    },
  ]);

  //filter
  const [filteredData, setFilteredData] = useState<TaskModel[]>(tasks);
  const handleFilterChange = (filteredData: TaskModel[]) => {
    setFilteredData(filteredData);
  };

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (newTask: TaskModel) => {
    // MAJ locale
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
        <TaskFilter data={tasks} onFilterChange={handleFilterChange} />
        {filteredData.map((value: TaskModel) => (
          <article key={value.id}>
            <Task
              id={value.id}
              checked={value.checked}
              title={value.title}
              content={value.content}
              date={value.date}
            />
          </article>
        ))}
      </div>
    );
}

export default TaskList;
