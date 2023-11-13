import './App.css'
import TaskList from './TaskList'

function App() {
  return (
    <>
      <div className="card">    
        <h1>ToDo App</h1>    
        <Taskbar/>
        <TaskList/>
      </div>     
    </>
  )
}

export default App
