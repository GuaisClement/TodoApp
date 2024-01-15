
import { useEffect, useState } from "react";
import { TaskModel } from "../model/task-model";
import { addTaskToFirestore, removeTaskFromFirestore, updateTaskInFirestore } from "../firebase/collections/useTask";
import tasksFirebase from "../firebase/hooks/hooksFirebase";
import AddTask from "../task-list/add-task/add-task";
import Task from "../task-list/task/Task";
import './favorite.css';
import ModifyTask from "../task-list/modify-task/modify-task";

function favorite() {
  // Tasks list
  const [tasks, setTasks] = useState<any[]>([]);

  const data = tasksFirebase();

  // fetch db data
  useEffect(() => {
    setTasks(data);
  }, [data]);

  // Update filtered task each change on tasks
  useEffect(() => {
    filterTasks();
  }, [tasks]);

  const filterTasks = async () => {
    const favoriteTasks = tasks.filter(task => {
      if(task.favorite)
      {
        return task;
      }
    })
    setFilteredData(favoriteTasks);
  }

  // States
  const [filteredData, setFilteredData] = useState<TaskModel[]>(tasks);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [taskModified, setTaskModified] = useState<TaskModel>(tasks[0]);

  // Ajouter Task
  const handleAddTask = async (newTask: TaskModel) => {

    try {

      // Change Front
      setTasks([...tasks, newTask]);
      setIsCreateModalOpen(false);

      // Update DB and retrieve ID
      const taskId = await addTaskToFirestore(newTask);

      // Set Id
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

      // Remove the new task
      const updatedTasks = tasks.filter(task => task.id !== '');
      setTasks(updatedTasks);

      //Add log
    }
    
  }

  // Remove Task
  const handleRemoveTask = async (id: string) => {

    // Save removed task
    const taskToRemove = tasks.find(task => task.id === id);

    try {
      
      // Change Front
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);

      // Update DB
      await removeTaskFromFirestore(id);
    } catch (error) {

      // add the removed task
      if (taskToRemove) {
        setTasks(prevTasks => [...prevTasks, taskToRemove]);
      }
    }
    
  }

  // Check Task
  const handleCheckedTask = async (taskChecked: TaskModel) =>{
    try {

      // Change Front 
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map(task => {
          if (task.id === taskChecked.id) {
            return { ...task, checked: taskChecked.checked };
          }
          return task;
        });
        return updatedTasks;
      });

      // Update DB
      await updateTaskInFirestore(taskChecked.id, taskChecked);
    } catch (error) {

      // Remove the change
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map(task => {
          if (task.id === taskChecked.id) {
            return { ...task, checked: !taskChecked.checked };
          }
          return task;
        });
        return updatedTasks;
      });
    }
    
  }

  // Modify the task
  const handleModifyTask = async (taskModified: TaskModel) => {

    // Save a backup
    let oldTask: TaskModel[] = [...tasks];

    try {

      // Change Front
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map(task => {
          if (task.id === taskModified.id) {
            return taskModified;
          }
          return task;
        });
        return updatedTasks;
      });
      
      // Update DB
      await updateTaskInFirestore(taskModified.id, taskModified);

    } catch (error) {

      // use Backup
      setTasks(oldTask);
    }
    
    setIsModifyModalOpen(false);
  }

  // SET Fav
  const handleFavTask = async (taskFav: TaskModel) =>{
    try {
      // Change Front 
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map(task => {
          if (task.id === taskFav.id) {
            return { ...task, favorite: taskFav.favorite };
          }
          return task;
        });
        return updatedTasks;
      });
    } catch (error) {

      // Remove the change
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map(task => {
          if (task.id === taskFav.id) {
            return { ...task, favorite: !taskFav.favorite };
          }
          return task;
        });
        return updatedTasks;
      });
    }
    
  }
  
  /* MODALS  Visibility */
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
            Favoris
        </div>
        <button onClick={handleOpenCreateModal}>Ajouter une Tâche</button>
      </div>

      <div className="column-task">
        {filteredData.map((task: TaskModel) => (
          <div className="separator">
            <article key={task.id}>
              <Task taskId={task.id} task={task} onRemmoveTask={handleRemoveTask} onChecked={handleCheckedTask} onModifyTask={handleOpenModifyModal} 
              onSelectTag={()=>{}} onFav={handleFavTask}/>
            </article>
          </div>
        ))}
      </div>
    </div>
    );
 
    
}

export default favorite;
