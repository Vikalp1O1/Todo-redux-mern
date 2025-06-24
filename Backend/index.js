import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDb } from './database/db.js';
import todoRoutes from './routes/todo.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

app.use('/api/todo',todoRoutes);


connectDb().then(()=>{
    console.log(`Mongo Db connected Sucessfully`)
    app.listen(PORT,()=>console.log(`Server Started at ${PORT}`));
}).catch((err)=>{
    console.log('Connection error to MongoDb',err);
    
})
const PORT = process.env.PORT || 3001;

