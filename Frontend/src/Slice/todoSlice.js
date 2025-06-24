import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async () => {
    const response = await axiosInstance.get("/todo");
    return response.data.data;
  }
);

export const addTodoThunk = createAsyncThunk('todos/addTodo', async (todo) => {
  const response = await axiosInstance.post('/todo/add', todo);
  return response.data.data;
});

export const deleteTodoThunk = createAsyncThunk('todos/deleteTodo',async(id)=>{
  console.log("Deleting Todo with ID:", id);
  // const id = todo._id;
  const response = await axiosInstance.delete(`/todo/delete/${id}`);
  console.log(response.data.data);
  
  // return response.data.data;
  return id; 
});

export const updateTodoThunk = createAsyncThunk('todos/updateTodo', async (todo) => {
  const response = await axiosInstance.put(`/todo/update/${todo._id}`, todo);
  return response.data.data;
});

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {
    selectedTodo:(state,action)=>{
      state.selectedTodo = action.payload;
    },
    clearSelectedTodo:(state)=>{
      state.selectedTodo = null;
    }
    // addTodo:  (state,action)=>{
    //   const todo = action.payload;
    //   console.log("Adding Todo:", todo);
    //    const response = axiosInstance.post('/todo/add',todo);
    //   console.log("Response from server:", response.data.data);
      
    //  state.todos.push(todo);
    //  console.log("Updated Todos:", state.todos);
    // }
  },
  extraReducers: (builder) => {
    builder
    // get all todo
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add To Todos
      .addCase(addTodoThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodoThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
      })
      .addCase(addTodoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete Todo
      .addCase(deleteTodoThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodoThunk.fulfilled,(state,action)=>{
        state.loading= false;
        // console.log("id and other thing in todo slice",action.payload);
        const id = action.payload;
        // console.log("Deleting Todo with ID:", id);
        state.todos = state.todos.filter((todo) => todo._id !== id);
      })
      .addCase(deleteTodoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      
      // Update Todo
      .addCase(updateTodoThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodoThunk.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTodo = action.payload;
        console.log("Updating Todo:", updatedTodo);
        
        const index = state.todos.findIndex((todo) => todo._id === updatedTodo._id);
        if (index !== -1) {
          state.todos[index] = updatedTodo;
        }
      })
      .addCase(updateTodoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

//  we export reducer/slice in 2 parts, we export the functions in destructured way from the Slice.actions
// and then export the slice.reducer , so that our store know all about the slice 

export const { selectedTodo , clearSelectedTodo } = todoSlice.actions;
export default todoSlice.reducer;
