import './App.css'
import Task from './task/Task'
import Taskbar from './header/Taskbar'

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
      <div className="App">
        <h1>Mon Application</h1>
        {/* Autres composants de votre application */}
        <Taskbar />
      </div>
      <div className="card">
        <Task {...taskProps}></Task>
      </div>
    </>
  )
}

export default App;
