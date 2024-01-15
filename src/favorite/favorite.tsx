
import { useEffect, useState } from "react";
import { addTaskToFirestore, removeTaskFromFirestore, updateTaskInFirestore } from "../firebase/collections/useTask";
import tasksFirebase from "../firebase/hooks/hooksFirebase";
import { TaskModel } from "../model/task-model";
import AddTask from "../task-list/add-task/add-task";
import Task from "../task-list/task/Task";
import './favorite.css';

function favorite() {
  //Liste Tâche
  const [tasks, setTasks] = useState<any[]>([]);

  const data = tasksFirebase();

  useEffect(() => {
    const favoriteTasks = data.filter(task => task.favorite);
    setTasks(favoriteTasks);
  }, [data]);


  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = async (newTask: TaskModel) => {

    try {

      //MAJ Locale
      setTasks([...tasks, newTask]);
      setIsModalOpen(false);

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
    }

    
  }

  const handleRemoveTask = async (id: string) => {

    // Sauvegardez la tâche à supprimer
    const taskToRemove = tasks.find(task => task.id === id);

    try {
      
      // Remove on task
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);

      await removeTaskFromFirestore(id);
    } catch (error) {

      if (taskToRemove) {
        setTasks(prevTasks => [...prevTasks, taskToRemove]);
      }
    }
    
  }

  const handleCheckedTask = async (task: TaskModel) =>{
    try {

      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map(task => {
          if (task.id === task.id) {
            return { ...task, checked: task.checked };
          }
          return task;
        });
        return updatedTasks;
      });

      await updateTaskInFirestore(task.id, task);
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
            Favoris
        </div>
        <button onClick={handleOpenModal}>Ajouter une Tâche</button>
      </div>

      <div className="column-task">
        {tasks.map((task: TaskModel) => (
          <div className="separator">
            <article key={task.id}>
              <Task taskId={task.id} task={task} onRemmoveTask={handleRemoveTask} onChecked={handleCheckedTask} onModifyTask={handleOpenModal} onSelectTag={function (tag: string): void {
                throw new Error("Function not implemented.");
              } }/>
            </article>
          </div>
        ))}
      </div>
    </div>
    );
 
    
}

export default favorite;
