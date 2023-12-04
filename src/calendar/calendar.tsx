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
    alert('clicked day : ' + value);
    console.log('clicked day : ' + value);
    setSelectedTasks(tasks.filter(task => task.date.toDateString() === value.toDateString()));
  };

  const addTask = (newTask: TaskModel) => {
    setTasks([...tasks, newTask]);
    setNewTask('');
    setAddTaskModalOpen(false);
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

      {/* Liste des tâches pour la date sélectionnée */}
      {selectedTasks.map((task, index) => (
        <Task
          key={index}
          id={index}
          checked={false} // À remplacer par la logique appropriée
          title={task.date.toLocaleDateString('fr-FR')}
          content={task.content}
          date={task.date}
        />
      ))}

      {isAddTaskModalOpen && (
        <AddTask onAddTask={addTask} onCloseModal={() => setAddTaskModalOpen(false)} />
      )}
    </div>
  );
};

export default MyCalendar;
