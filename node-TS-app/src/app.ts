import express, {Request,Response,NextFunction} from 'express';
import todoRoutes from './routes/todos';
import { json } from 'body-parser';

// Can use NextJs to get node+typescript support out of the box instead of custom installations of @types.

const app = express();

app.use(json());

app.use('/todos',todoRoutes);

app.use((err:Error, req:Request, res:Response, next:NextFunction)=>{
    res.status(500).json({message:err.message});
})

app.listen(3000);