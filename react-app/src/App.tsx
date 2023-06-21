import React, { useState } from 'react';
import TodoList from './TodoList';
import TodoForm from './ToDoForm';

let App:React.FunctionComponent = () => {
  let [todos,setTodos] = useState<{id:string,value:string}[]>([{id:'1',value:'finish course'}]);
  // let todos = [{id:'t1',value:'finish course'},{id:'t2',value:'exercise'}];
  let addTodo = (item:string) => {
    console.log(item);
    setTodos((prevTodos)=>[...prevTodos,{id:Math.random().toString(),value:item}]);
  }

  let deleteTodo = (todoId:string)=>{
    setTodos((prevTodos)=>{
      return prevTodos.filter(todo => todo.id!==todoId);
    })
  }
  return (
    <div className="App">
      <TodoForm addToList={addTodo}/>
      <TodoList items={todos} deleteTodoFn={deleteTodo}/>
    </div>
  );
}

export default App;
