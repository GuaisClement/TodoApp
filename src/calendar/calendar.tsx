import React, { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import './calendar.css';
import Task from '../task-list/task/Task';
import AddTask from '../task-list/add-task/add-task';
import { TaskModel } from "../model/task-model";
import { addTaskToFirestore, removeTaskFromFirestore, updateTaskInFirestore } from '../firebase/collections/useTask';
//import { TaskFilterProps } from '../task-list/filter/Task-filter';
import tasksFirebase from '../firebase/hooks/hooksFirebase';
import ModifyTask from '../task-list/modify-task/modify-task';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const MyCalendar = () => {
  const [date, setDate] = useState<Value>(new Date());
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const data = tasksFirebase();

  useEffect(() => {
    setTasks(data);
  }, [data]);

  
  useEffect(() => {
    newTasks();
  }, [tasks, date]);


  /* States */
  const [filteredData, setFilteredData] = useState<TaskModel[]>(tasks);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [taskModified, setTaskModified] = useState<TaskModel>(tasks[0]);
  
  // Update Filtered data
  const newTasks = async () => {
    const tasksForSelectedDate = tasks.filter(task => {
      const taskDate = new Date(task.date);
      const taskDateOnly = taskDate.toDateString();

      let valueDateOnly: string | undefined;

      if (date instanceof Date) {
        valueDateOnly = date.toDateString();
      } else if (Array.isArray(date) && date[0] instanceof Date) {
        valueDateOnly = date[0].toDateString();
      }
      return taskDateOnly === valueDateOnly;
    });
    setFilteredData(tasksForSelectedDate);
  }

  /* TASKS ACTIONS */

  // Add Task
  const handleAddTask = async (newTask: TaskModel) => {
    try {
      const taskId = await addTaskToFirestore(newTask);
      newTask.id = taskId;
      setTasks([...tasks, newTask]);
      setIsCreateModalOpen(false);
    } catch (error) {
      // Gérez les erreurs
    }
  }

  // Remove a task
  const handleRemoveTask = async (id: string) => {

    try {

      // Change front
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);

      // Update DB
      await removeTaskFromFirestore(id);

    } catch (error) {
      // Gérez les erreurs
    }
    
  }

  // Check a task
  const handleCheckedTask = async (taskChecked: TaskModel) => {

    try {

      // Change front
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
    
      // If error rolback
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map(task => {
          if (task.id === taskChecked.id) {
            return { ...task, checked: !taskChecked.checked };
          }
          return task;
        });
        return updatedTasks;
      });

      // To replace witn log
      console.error("Erreur lors de la mise à jour de la tâche:", error);
    }
  };

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

  /* CALENDAR ACTIONS */

  const handleDateClick = (value: Value, event: React.SyntheticEvent<any>) => {
    setDate(value);
    const tasksForSelectedDate = tasks.filter(task => {
      const taskDate = new Date(task.date);
      const taskDateOnly = taskDate.toDateString();

      let valueDateOnly: string | undefined;

      if (value instanceof Date) {
        valueDateOnly = value.toDateString();
      } else if (Array.isArray(value) && value[0] instanceof Date) {
        valueDateOnly = value[0].toDateString();
      }
      return taskDateOnly === valueDateOnly;
    });
    setFilteredData(tasksForSelectedDate);
  };


  /*  MODALS visibility */

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
    <div>
      <span style={{ fontSize: 24 }}>{date && date.toLocaleString('fr', { month: 'long', year: 'numeric' })}</span>

      <div className="row-title-task-list">
        <div className="title-task-list">
          Liste de tâches :
        </div>
        <button onClick={handleOpenCreateModal}>Ajouter une Tâche</button>
      </div>

      <Calendar
        locale="FR-fr"
        onChange={setDate}
        value={date}
        className="custom-calendar"
        onClickDay={handleDateClick}
      />
      <div className="column-task">
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

        {filteredData.map((taskModel: TaskModel, index) => (
          <div className="separator" key={taskModel.id}>
            <Task taskId={ taskModel.id } task={taskModel} onRemmoveTask={handleRemoveTask} onChecked={handleCheckedTask} onModifyTask={handleOpenModifyModal} onSelectTag={function (tag: string): void {            } } />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCalendar;
