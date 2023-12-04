import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Task {
  date: Date;
  description: string;
}

const MyCalendar = () => {
  const [date, setDate] = useState<Value>(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);

  const onChange = (newDate: Value) => {
    setDate(newDate);
    setSelectedTasks(tasks.filter(task => task.date.toDateString() === (newDate as Date).toDateString()));
  };

  const onClickDay = (value: Date, event: React.SyntheticEvent) => {
    alert('clicked day : ' + value);
    console.log('clicked day : ' + value);
    setSelectedTasks(tasks.filter(task => task.date.toDateString() === value.toDateString()));
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { date: date as Date, description: newTask }]);
      setNewTask('');
    }
  };

  return (
    <div>
      <h2>{date && date.toLocaleString('fr', { month: 'long', year: 'numeric' })}</h2>

      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nouvelle tâche"
        />
        <button onClick={addTask}>Ajouter Tâche</button>
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
        <div key={index}>
          {task.date.toLocaleDateString('fr-FR')} - {task.description}
        </div>
      ))}
    </div>
  );
};

export default MyCalendar;
