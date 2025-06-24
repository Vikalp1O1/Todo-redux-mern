import express from 'express';
const router = express.Router();
import {addTodo, deleteTodo, findTitleById, getAllTodo, updateTodo} from '../controllers/todo.controller.js';



router.get('/',getAllTodo);
router.post('/add',addTodo);
router.get('/:id',findTitleById);
router.put('/update/:id',updateTodo);
router.delete('/delete/:id',deleteTodo);

export default router;