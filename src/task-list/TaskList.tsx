import Task from "./task/Task";
import {TaskModel} from "../model/task-model";
import { useRef, useState } from "react";
import AddTask from "./add-task/add-task";

import './TaskList.css';
import {TaskFilter,TaskFilterProps} from './filter/Task-filter';

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

  const handleOnCheck = (id: number) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      );
    });
  };

  const taskFilterRef = useRef<TaskFilterProps | null>(null);

  const getNewData = (): TaskModel[] => {  
    return taskFilterRef.current?.getNewFilteredData() || [];
  };
  const setNewData = (newTask: TaskModel): TaskModel[] => {  
    return taskFilterRef.current?.setNewFilteredData(newTask) || [];
  };

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (newTask: TaskModel) => {
    // MAJ locale Ajout tache
    setTasks([...tasks, newTask]);
    setIsModalOpen(false);
    setNewData(newTask);
    setFilteredData(getNewData);
    handleFilterChange
  }

  const handleRemoveTask = (id: number) => {

    // Remove on task
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);

    // Remove on filtered Task
    const updatedFilteredTasks = filteredData.filter(task => task.id !== id);
    setFilteredData(updatedFilteredTasks);
    
  }
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
 
    return (
      <div className="task-list">
        {isModalOpen && (
          <>
            <div className="overlay" onClick={handleCloseModal}></div>
            <AddTask onAddTask={handleAddTask} onCloseModal={handleCloseModal} />
          </>
        )}

        <div className="row-title">
          <div className="title">
              Liste de tâches :
          </div>
          <button onClick={handleOpenModal}>Ajouter une Tâche</button>
        </div>

        <TaskFilter 
          ref={taskFilterRef as React.MutableRefObject<TaskFilterProps | null>}
          data={tasks} onFilterChange={handleFilterChange}
          getNewFilteredData={function (): TaskModel[] {
            throw new Error("Function not implemented.");
          } } setNewFilteredData={function (): void {
            throw new Error("Function not implemented.");
          } }
        />

        <div className="column-task">
          {filteredData.map((task: TaskModel) => (
            <article key={task.id}>
              <Task {...task} onRemmoveTask={handleRemoveTask} onCheck={handleOnCheck}/>
            </article>
          ))}
        </div>
      </div>
    );
}

export default TaskList;
