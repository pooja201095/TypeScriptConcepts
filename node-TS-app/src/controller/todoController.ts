import express from 'express';
import {Todo} from '../models/todo';

let Todos:Todo[] =[];

export let createTodo: express.RequestHandler = (req,res, next) =>{
    let text = (req.body as {text:string}).text;
    let newTodo = new Todo(Math.random().toString(),text);
    Todos.push(newTodo);
    res.status(201).json({message:'Todo created successfully',data:newTodo}); 
}

export let getTodoList: express.RequestHandler = (req,res, next) =>{
    res.status(200).json({todos:Todos}); 
}

export let updateTodo: express.RequestHandler<{id:string}> = (req,res, next) =>{
    let id = req.params.id;
    let newText = (req.body as {text:string}).text;
    let todoIndex = Todos.findIndex((item)=>item.id===id);
    if(todoIndex<0){
        throw Error('Could not find todo');
    }
    Todos[todoIndex].text = newText;
    res.json({message:'Update successful',todos:Todos}); 
}

export let deleteTodo: express.RequestHandler<{id:string}> = (req,res, next) =>{
    let id = req.params.id;
    let todoIndex = Todos.findIndex((item)=>item.id===id);
    if(todoIndex<0){
        throw Error('Could not find todo');
    }
    Todos.splice(todoIndex,1);
    res.json({message:'Deleted successfully'}); 
}