import { Router } from "express";
import {createTodo, getTodoList, updateTodo, deleteTodo} from '../controller/todoController';

let todoRoutes = Router();

todoRoutes.get('/',getTodoList);
todoRoutes.post('/',createTodo);
todoRoutes.patch('/:id',updateTodo);
todoRoutes.delete('/:id',deleteTodo);

export default todoRoutes;