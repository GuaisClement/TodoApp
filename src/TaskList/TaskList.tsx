import Task from "../task/Task";


type Task = {
  id: number;
  checked: boolean;
  title: string;
  content: string;  
  date: Date;
};

const Data: Task[] = [
  {
    id: 0,
    checked: false,
    title: "title &",
    content: "description",
    date: new Date(),
  },
  {
    id: 1,
    checked: false,
    title: 'Faire les courses',
    content: 'Acheter du lait, des œufs, et du pain.',
    date: new Date(),
  },
];


function TaskList() {
 
    return (
        <div>
          {Data.map((value: Task) => (
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
