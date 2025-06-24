import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { deleteTodoThunk, fetchTodos, selectedTodo, updateTodoThunk } from './Slice/todoSlice'
import Card from './components/Card'



function App() {
  
  const navigate = useNavigate();
  const todos = useSelector((state) => state.todos);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
const dispatch = useDispatch();


// Fetch all Todo when it start, directly from the backend databse
useEffect(()=>{
  dispatch(fetchTodos());
},[dispatch]);

// then it got stored in the redux store and then we can access it from the redux store

// console.log("Todos from Redux Store:", todos);
// todos.map((todo) => {
//   console.log("Todo ID:", todo._id);
//   console.log("Todo Title:", todo.title);
//   console.log("Todo Text:", todo.text);
// });

   if(loading){return <p className='text-gray-500'>Loading...</p>}
  if(error){return <p className='text-red-500'>Error: {error}</p>}

  return (
    <>
     <div className='flex flex-col items-center mb-6'> <h1 className='text-2xl font-bold mb-4'>Todo App</h1>
      <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition' onClick={() => navigate('/add')}>Add Todo</button>
</div>
      <div className='flex gap-4 flex-wrap justify-center'>{
        todos?.map((todo) => (
          <Card key={todo._id} title={todo.title} text={todo.text} onEdit={() => {
            dispatch(selectedTodo(todo));
            navigate('/add');
          }} onDelete={() => dispatch(deleteTodoThunk(todo._id))} />
        ))
      }</div>
    </>
  )
}

export default App
