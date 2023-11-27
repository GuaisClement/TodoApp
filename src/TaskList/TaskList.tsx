import { useState } from "react";
import Task from "../list/task/Task";
import {TaskModel} from "../model/task-model";
import TaskFilter from './TaskFilter'; 

const Data: TaskModel[] = [
  {
    id: 1,
    checked: false,
    title: 'Faire les courses',
    content: 'Acheter du lait, des œufs, et du pain.',
    date: new Date(),
    tags : ["tag1"],
  },
  {
    id: 2,
    checked: true,
    title: 'Courir',
    content: 'Avec ses pieds',
    date: new Date(),
    tags : ["tag1","tag2","tag3"],
  },
  {
    id: 3,
    checked: false,
    title: 'Faire la course',
    content: 'Vroum Vroum',
    date: new Date(),
    tags : ["tag2"],
  },
  {
    id: 4,
    checked: true,
    title: 'Rire',
    content: 'c\'est important dans la vie',
    date: new Date(),
    tags : ["tag3","tag4"],
  },
];


function TaskList() {
  const [filteredData, setFilteredData] = useState<TaskModel[]>(Data);

  const handleFilterChange = (filteredData: TaskModel[]) => {
    setFilteredData(filteredData);
  };

  return (
    <div>
      <TaskFilter data={Data} onFilterChange={handleFilterChange} />
      {filteredData.map((value: TaskModel) => (
        <article key={value.id}>
          <Task
            id={value.id}
            checked={value.checked}
            title={value.title}
            content={value.content}
            date={value.date}
          />
        </article>
      ))}
    </div>
  );
}

export default TaskList;
