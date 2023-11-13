import React from 'react'

type Props = {
    id: number;
    checked: boolean;
    title: string;
    content: string;  
    Tags: string[];
}

const Task: React.FC<Props> = (props) => {
    
    return (
    <div>
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <p>{props.Tags}</p>
    </div>
    );
    
}



export default Task;

