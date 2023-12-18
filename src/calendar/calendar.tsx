import React, { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import './calendar.css';
import Task from '../task-list/task/Task' // Assurez-vous que le chemin est correct
import AddTask from '../task-list/add-task/add-task'; // Assurez-vous que le chemin est correct
import {TaskModel} from "../model/task-model";
import { addTaskToFirestore, removeTaskFromFirestore, updateTaskInFirestore } from '../firebase/collections/useTask';
import { TaskFilterProps } from '../task-list/filter/Task-filter';
import tasksFirebase from '../firebase/hooks/hooksFirebase';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const MyCalendar = () => {
  const [date, setDate] = useState<Value>(new Date());
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const data = tasksFirebase();

  useEffect(() => {
    setTasks(data);
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    const tasksForSelectedDate = data.filter(task => {
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
  }, [date, data]);

    const [filteredData, setFilteredData] = useState<TaskModel[]>(tasks);
    
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

  const handleDateClick = (value: Value, event: React.SyntheticEvent<any>) => {
    setDate(value);
    const tasksForSelectedDate = data.filter(task => {
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
  

  return (
    <div>
      <span style={{ fontSize: 24 }}>{date && date.toLocaleString('fr', { month: 'long', year: 'numeric' })}</span>

      <div className="row-title-task-list">
        <div className="title-task-list">
            Liste de tâches :
        </div>
        <button onClick={handleOpenModal}>Ajouter une Tâche</button>
      </div>

      <Calendar
        locale="FR-fr"
        onChange={setDate}
        value={date}
        className="custom-calendar"
        onClickDay={handleDateClick}
      />
      <div className="column-task">
        {isModalOpen && (
          <>
            <div className="overlay" onClick={handleCloseModal}></div>
            <AddTask onAddTask={handleAddTask} onCloseModal={handleCloseModal} />
          </>
        )}

        {filteredData.map((taskModel: TaskModel) => (
          <div className="separator" key={taskModel.id}>
            <Task task={taskModel} onRemmoveTask={handleRemoveTask} onChecked={handleCheckedTask}/>
          </div>
        ))}
      </div>

    </div>
  );
};
export default MyCalendar;
