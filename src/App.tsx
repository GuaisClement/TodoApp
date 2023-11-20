import './App.css'
import Task from './list/task/Task'
import Taskbar from './header/Taskbar'
import { TaskModel } from './model/task-model';
import { useState } from 'react';
import AddTask from './list/add-task/add-task';

function App() {

  // Liste Tâche
  const [tasks, setTasks] = useState([
    {
      id: 1,
      checked: false,
      title: 'Faire les courses',
      content: 'Acheter du lait, des œufs, et du pain.',
      date: new Date(),
    },
    {
      id: 2,
      checked: true,
      title: 'Faire les courses',
      content: 'Acheter du lait, des œufs, et du pain.',
      date: new Date(),
    },
    {
      id: 3,
      checked: false,
      title: 'Faire les courses',
      content: 'Acheter du lait, des œufs, et du pain.',
      date: new Date(),
    }
  ]);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (newTask: TaskModel) => {
    // MAJ locale
    setTasks([...tasks, newTask]);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true)
  };

  const handleCloseModal = () => {
    setIsModalOpen(false)
  };

  return (
    <>
      <div className="App">

        {isModalOpen && (
          <AddTask onAddTask={handleAddTask} onCloseModal={handleCloseModal} />
        )}

        <h1>Mon Application</h1>
        <Taskbar />
        <AddTask onAddTask={handleAddTask} onCloseModal={handleCloseModal}/>
        
        {tasks.map((tasks) => (
          <div className="card" key={tasks.id}>
            <Task {...tasks}></Task>
          </div>
        ))}
        
      </div>
    </>
  )
}

export default App;
