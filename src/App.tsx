import './App.css'
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
        <Task {...taskProps}></Task>
      </div>
    </>
  )
}

export default App
