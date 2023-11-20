import Task from "../list/task/Task";
import {TaskModel} from "../model/task-model";

const Data: TaskModel[] = [
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
    title: 'Courir',
    content: 'Acheter du lait, des œufs, et du pain.',
    date: new Date(),
  },
  {
    id: 3,
    checked: false,
    title: 'Faire la course',
    content: 'Acheter du lait, des œufs, et du pain.',
    date: new Date(),
  }
];


function TaskList() {
 
    return (
        <div>
          {Data.map((value: TaskModel) => (
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
