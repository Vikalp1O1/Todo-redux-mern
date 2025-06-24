import { addTodoService, allTodoService, deleteTodoService, findTitleByIdService, updateTodoService } from "../services/todo.service.js";

const getAllTodo = async (req,res)=>{

    try {
        const todos = await allTodoService();
        res.status(200).json({message:'List of All Todos',data:todos})
    } catch (error) {
        res.status(400).json({message:'Error while getting todos',error:error.message});
    }
};

const addTodo = async (req,res)=>{

    try {
       
        const todo = await addTodoService(req.body);
        res.status(201).json({message:'Todo Created Successfully',data:todo});
        
    } catch (error) {
        res.status(400).json({message:'Error adding Todo',error:error.message});
    }
};

const findTitleById = async (req,res) => {
    try {
        const todo = await findTitleByIdService(req.params);
        console.log("Todo got by Id",todo);
    res.status(202).json({message:'Got Todo by Id',data:todo});
    } catch (error) {
        res.status(400).json({message:'Error While finding todo',error:error.message});
    }
};

const updateTodo = async(req,res)=>{

   try {
     const todo = await updateTodoService(req);
     console.log('Todo to Update',todo);
     
    res.status(203).json({message:'Todo Updated Successfully',data:todo});
   } catch (error) {
    res.status(400).json({message:'Error while updating',error:error.message});
   }
};

const deleteTodo = async(req,res) =>{
    try {
        const todo = await deleteTodoService(req);
        res.status(200).json({message:'Todo Deleted Successfully',data:todo});
    } catch (error) {
        res.status(400).json({message:'Error While Deleting Todo',error:error.message})
    }
}




export {getAllTodo, addTodo,findTitleById,updateTodo,deleteTodo};