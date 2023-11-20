import './App.css'
import TaskList from './TaskList'
import Taskbar from './header/Taskbar'
import Task from './task/Task'

function App() {
  const taskProps = {
    id: 1,
    checked: false,
    title: 'Faire les courses',
    content: 'Acheter du lait, des œufs, et du pain.',
    date: new Date(),
  };

  return (
    <>
      <div className="card">    
        <h1>ToDo App</h1>    
        <Taskbar/>
        <TaskList/>
        <div className="card">
          <Task {...taskProps}></Task>
        </div>
      </div>
    </>
  )
}

export default App
