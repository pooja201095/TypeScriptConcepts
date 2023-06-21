import React from "react";
import './TodoList.css';

interface TodoStructure {
    items: {id:string,value:string}[],
    deleteTodoFn:(id:string)=>void;
}

let TodoList:React.FC<TodoStructure> = (props) => {
    return <ul>
        {props.items.map((item) => <li key={item.id}><span>{item.value}</span><button onClick={props.deleteTodoFn.bind(null,item.id)}>X</button></li>)}
    </ul>
}

export default TodoList;