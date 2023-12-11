import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import Task from '../task-list/task/Task' // Assurez-vous que le chemin est correct
import AddTask from '../task-list/add-task/add-task'; // Assurez-vous que le chemin est correct
import {TaskModel} from "../model/task-model";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const MyCalendar = () => {
  const [date, setDate] = useState<Value>(new Date());
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [selectedTasks, setSelectedTasks] = useState<TaskModel[]>([]);
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState<boolean>(false);

  const onChange = (newDate: Value) => {
    setDate(newDate);
    setSelectedTasks(tasks.filter(task => task.date.toDateString() === (newDate as Date).toDateString()));
  };

  const onClickDay = (value: Date, event: React.SyntheticEvent) => {
    setSelectedTasks(tasks.filter(task => task.date.toDateString() === value.toDateString()));
  };

  const addTask = (newTask: TaskModel) => {
    setTasks([...tasks, newTask]);
    setSelectedTasks([...selectedTasks, newTask]); // Mettre à jour selectedTasks
    setNewTask('');
    setAddTaskModalOpen(false);
  };

  const handleRemoveTask = (id: number) => {
    // Remove on task
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);

    // Remove on selectedTasks
    const updatedSelectedTasks = selectedTasks.filter(task => task.id !== id);
    setSelectedTasks(updatedSelectedTasks);
  };

  return (
    <div>
      <h2>{date && date.toLocaleString('fr', { month: 'long', year: 'numeric' })}</h2>

      <div>
        <button onClick={() => setAddTaskModalOpen(true)}>Ajouter Tâche</button>
      </div>

      <Calendar
        locale="FR-fr"
        onChange={onChange}
        value={date}
        className="custom-calendar"
        onClickDay={onClickDay}
      />

      {selectedTasks.map((task, index) => (
      <Task {...task} onRemmoveTask={handleRemoveTask}/>
      ))}
      {isAddTaskModalOpen && (
        <AddTask onAddTask={addTask} onCloseModal={() => setAddTaskModalOpen(false)} />
      )}
    </div>
  );
};

export default MyCalendar;
