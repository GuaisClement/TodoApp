import './App.css'
import Taskbar from './header/Taskbar'
import TaskList from './TaskList/TaskList';

function App() {

  return (
    <>
      <div className="App">
        <h1>Mon Application</h1>
        <Taskbar />
        <TaskList/>       
      </div>
    </>
  )
}

export default App;
