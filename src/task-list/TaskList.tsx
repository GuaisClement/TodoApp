import Task from "./task/Task";
import {TaskModel} from "../model/task-model";
import { useEffect, useRef, useState } from "react";
import AddTask from "./add-task/add-task";

import './TaskList.css';
import {TaskFilter,TaskFilterProps} from './filter/Task-filter';
import tasksFirebase from "../firebase/hooks/hooksFirebase";
import { addTaskToFirestore, removeTaskFromFirestore, updateTaskInFirestore } from "../firebase/collections/useTask";

function TaskList() {
  //Liste Tâche
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tasks, setTasks] = useState<any[]>([]);

  const data = tasksFirebase();

  //filter
  const [filteredData, setFilteredData] = useState<TaskModel[]>(tasks);

  useEffect(() => {
    setTasks(data);
    setFilteredData(data);
    data.map((task) => {
      const isTaskToday = isDateToday(task.date);
      if (isTaskToday && !task.tags.includes('today')) {
        task.tags.push('today');
      }else if (!isTaskToday && task.tags.includes('today')) {
        task.tags.splice(task.tags.indexOf('today'), 1);
      }
    });
  }, [data]);

  const handleFilterChange = (filteredData: TaskModel[]) => {    
    setFilteredData(filteredData);
  };

  const taskFilterRef = useRef<TaskFilterProps | null>(null);

  //filter
  const getNewData = (): TaskModel[] => {  
    return taskFilterRef.current?.getNewFilteredData() || [];
  };
  const setNewData = (newTask: TaskModel): TaskModel[] => {  
    return taskFilterRef.current?.setNewFilteredData(newTask) || [];
  };
  const setNewTag = (tag:string): TaskModel[] => {  
    return taskFilterRef.current?.setNewTagSelected(tag) || [];
  };
  const isDateToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = async (newTask: TaskModel) => {

    try {
      const taskId = await addTaskToFirestore(newTask);
      newTask.id = taskId;
      setTasks([...tasks, newTask]);
      setIsModalOpen(false);
      setNewData(newTask);//utilise le composant filter
      setFilteredData(getNewData);
    } catch (error) {
      // Gérez les erreurs
    }
  }

  const handleRemoveTask = async (id: string) => {
    try {
      await removeTaskFromFirestore(id);

      // Remove on task
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);

      // Remove on filtered Task
      const updatedFilteredTasks = filteredData.filter(task => task.id !== id);//n'utilise pas le composant filter pour le filtrage
      setFilteredData(updatedFilteredTasks);
    } catch (error) {
      // Gérez les erreurs
    }    
  }

  const handleCheckedTask = async (task: TaskModel) =>{
    try {
      await updateTaskInFirestore(task.id, task);
    } catch (error) {
      // Gérez les erreurs
    }
    
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

        <div className="row-title-task-list">
          <div className="title-task-list">
              Liste de tâches :
          </div>
          <button className="add-task-button" onClick={handleOpenModal}>Ajouter une Tâche</button>
        </div>

        <TaskFilter 
          ref={taskFilterRef as React.MutableRefObject<TaskFilterProps | null>}
          data={tasks} onFilterChange={handleFilterChange}
          getNewFilteredData={function (): TaskModel[] { throw new Error("getNewFilteredData."); } }
          setNewFilteredData={function (): void { } } 
          setNewTagSelected={function (tag: string): void {throw new Error("setNewTagSelected.tag: "+tag);
          } }        />
        <div className="column-task">
          {filteredData.map((task: TaskModel) => (
            <div className="separator">
              <article key={task.id}>
                <Task task={task} onRemmoveTask={handleRemoveTask} onChecked={handleCheckedTask} onSelectTag={setNewTag}/>
              </article>
            </div>
          ))}
        </div>
      </div>
    );
}

export default TaskList;
