import React, { useRef } from "react";
import './NewTodo.css';

type TodoFormProps = {
    addToList:(item:string)=>void;
}

let TodoForm:React.FC<TodoFormProps> = (props) => {
    let inputRef = useRef<HTMLInputElement>(null);
    let submitHandler=(event:React.FormEvent)=>{
        event.preventDefault();
        let enteredText = inputRef.current!.value;
        props.addToList(enteredText);
        inputRef.current!.value ='';
    }

    return <form className="form-control" onSubmit={submitHandler}>
        <label htmlFor="to-do">Add a todo!</label>
        <input type='text' id="to-do" ref={inputRef}></input>
        <button type="submit">Add</button>
    </form>
}

export default TodoForm;