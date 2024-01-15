import Task from "./task/Task";
import {TaskModel} from "../model/task-model";
import { useEffect, useRef, useState } from "react";
import AddTask from "./add-task/add-task";

import './TaskList.css';
import {TaskFilter,TaskFilterProps} from './filter/Task-filter';
import tasksFirebase from "../firebase/hooks/hooksFirebase";
import { addTaskToFirestore, removeTaskFromFirestore, updateTaskInFirestore } from "../firebase/collections/useTask";
import ModifyTask from "./modify-task/modify-task";

function TaskList() {
  // Task list
  const [tasks, setTasks] = useState<any[]>([]);
  const data = tasksFirebase();

  // filter
  const [filteredData, setFilteredData] = useState<TaskModel[]>(tasks);

  // Init fetch db data
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


  // Filter
  const handleFilterChange = (filteredData: TaskModel[]) => {    
    setFilteredData(filteredData);
  };
  const taskFilterRef = useRef<TaskFilterProps | null>(null);

  // filter inner action
  const getNewData = (): TaskModel[] => {  
    return taskFilterRef.current?.getNewFilteredData() || [];
  };
  const addNewData = (newTask: TaskModel): TaskModel[] => {  
    return taskFilterRef.current?.setNewFilteredData(newTask) || [];
  };

  const setNewData = (tasks: TaskModel[]): TaskModel[] => {  
    return taskFilterRef.current?.setFilteredData(tasks) || [];
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

  // States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [taskModified, setTaskModified] = useState<TaskModel>(tasks[0]);


  /* Actions */
  const handleAddTask = async (newTask: TaskModel) => {

    try {

      // MAJ Locale
      setTasks([...tasks, newTask]);
      setIsCreateModalOpen(false);
      addNewData(newTask);
      setFilteredData(getNewData);
      handleFilterChange;

      const taskId = await addTaskToFirestore(newTask);

      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map(task => {
          if (task.id === newTask.id) {
            return { ...task, id: taskId };
          }
          return task;
        });
        return updatedTasks;
      });

    } catch (error) {

      // Remove on task
      const updatedTasks = tasks.filter(task => task.id !== '');
      setTasks(updatedTasks);

      // Remove on filtered Task
      const updatedFilteredTasks = filteredData.filter(task => task.id !== '');
      setFilteredData(updatedFilteredTasks);
    }

    
  }

  const handleRemoveTask = async (id: string) => {

    // Sauvegardez la tâche à supprimer
    const taskToRemove = tasks.find(task => task.id === id);

    try {
      
      // Remove on task
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);

      // Remove on filtered Task
      const updatedFilteredTasks = filteredData.filter(task => task.id !== id);//n'utilise pas le composant filter pour le filtrage
      setFilteredData(updatedFilteredTasks);

      await removeTaskFromFirestore(id);
    } catch (error) {

      if (taskToRemove) {
        setTasks(prevTasks => [...prevTasks, taskToRemove]);
      }
    }
    
  }

  const handleCheckedTask = async (checkedtask: TaskModel) =>{
    try {

      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map(task => {
          if (task.id === checkedtask.id) {
            return { ...task, checked: checkedtask.checked };
          }
          return task;
        });
        return updatedTasks;
      });

      await updateTaskInFirestore(checkedtask.id, checkedtask);
    } catch (error) {

      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map(task => {
          if (task.id === task.id) {
            return { ...task, checked: !task.checked };
          }
          return task;
        });
        return updatedTasks;
      });
    }
    
  }

  const handleModifyTask = async (taskModified: TaskModel) => {

    const oldTask: TaskModel[] = tasks;

    try {


      const taskIndex = tasks.findIndex(task => task.id === taskModified.id);

      if (taskIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex] = taskModified;
        setTasks(updatedTasks);
        setNewData(updatedTasks);
  
        await updateTaskInFirestore(taskModified.id, taskModified);
      }

    } catch (error) {
      setTasks(oldTask);
    }
    console.log(taskModified);
    setIsModifyModalOpen(false);
  }


  /* MODALS  visibility*/

  const handleOpenModifyModal = (task: TaskModel) => {
    setTaskModified(task);
    setIsModifyModalOpen(true);
  }

  const handleCloseModifyModal = () => {
    setTaskModified(tasks[0]);
    setIsModifyModalOpen(false);
  }
  
  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  }

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  }
 
  /* RETURN */

  return (
    <div className="task-list">
      {isCreateModalOpen && (
        <>
          <div className="overlay" onClick={handleCloseCreateModal}></div>
          <AddTask onAddTask={handleAddTask} onCloseModal={handleCloseCreateModal} />
        </>
      )}

      {isModifyModalOpen && (
        <>
          <div className="overlay" onClick={handleCloseModifyModal}></div>
          
          <ModifyTask task={taskModified} onModifyTask={handleModifyTask} onCloseModal={handleCloseModifyModal} />
        </>
      )}
        <div className="row-title-task-list">
          <div className="title-task-list">
              Liste de tâches :
          </div>
          <button className="add-task-button" onClick={handleOpenCreateModal}>Ajouter une Tâche</button>
        </div>

        <TaskFilter 
          ref={taskFilterRef as React.MutableRefObject<TaskFilterProps | null>}
          data={tasks} onFilterChange={handleFilterChange}
          getNewFilteredData={function (): TaskModel[] { throw new Error("getNewFilteredData."); } }
          setNewFilteredData={function (): void { } }
          setFilteredData={function (): void { }} 
          setNewTagSelected={function (tag: string): void {throw new Error("setNewTagSelected.tag: "+tag);
          } }        />
        <div className="column-task">
          {filteredData.map((task: TaskModel) => (
            <div className="separator">
              <article key={task.id}>
                <Task taskId={task.id} task={task} onRemmoveTask={handleRemoveTask} onChecked={handleCheckedTask} onSelectTag={setNewTag} onModifyTask={handleOpenModifyModal} onFav={()=>{}}
                />
              </article>
            </div>
          ))}
        </div>
      </div>
  );
}

export default TaskList;
