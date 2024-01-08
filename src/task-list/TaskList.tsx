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
  const [tasks, setTasks] = useState<TaskModel[]>([]);

  const data = tasksFirebase();

  //filter
  const [filteredData, setFilteredData] = useState<TaskModel[]>(tasks);

  useEffect(() => {
    setTasks(data);
    setFilteredData(data);
  }, [data]);

  const handleFilterChange = (filteredData: TaskModel[]) => {    
    setFilteredData(filteredData);
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

  const handleAddTask = async (newTask: TaskModel) => {

    try {
      const taskId = await addTaskToFirestore(newTask);
      newTask.id = taskId;
      setTasks([...tasks, newTask]);
      setIsModalOpen(false);
      setNewData(newTask);
      setFilteredData(getNewData);
      handleFilterChange;
    } catch (error) {
      // Gérez les erreurs
    }
  }

  const handleRemoveTask = async (id: string) => {

    try {
      const taskId = await removeTaskFromFirestore(id);

      // Remove on task
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);

      // Remove on filtered Task
      const updatedFilteredTasks = filteredData.filter(task => task.id !== id);
      setFilteredData(updatedFilteredTasks);
    } catch (error) {
      // Gérez les erreurs
    }
    
  }

  const handleCheckedTask = async (task: TaskModel) =>{
    try {
      const taskId = await updateTaskInFirestore(task.id, task);
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
          {filteredData.map((taskModel: TaskModel) => (
            <div className="separator">
              <article key={taskModel.id}>
                <Task task={taskModel} onRemmoveTask={handleRemoveTask} onChecked={handleCheckedTask}/>
              </article>
            </div>
          ))}
        </div>
      </div>
    );
}

export default TaskList;
