import Task from "./Task";

type SingleData = {
  id: number;
  checked: boolean;
  title: string;
  content: string;  
  Tags: string[];
};

const Data: SingleData[] = [
  {
    id: 0,
    checked: false,
    title: "title",
    content: "description",
    Tags:["tag1","tag2"]
  },
  {
    id: 1,
    checked: true,
    title: "title",
    content: "description",
    Tags:["tag1","tag2"]
  },
];


function TaskList() {
 
    return (
        <div>
          {Data.map((value: SingleData) => (
            <article key={value.id}>
              <Task
                id={value.id}
                checked={value.checked}
                title={value.title}
                content={value.content}
                Tags={value.Tags}
              />
            </article>
          ))}
        </div>
    );
}

export default TaskList;
