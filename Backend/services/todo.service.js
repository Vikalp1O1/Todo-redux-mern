import { Todo } from "../model/todo.model.js";

export const allTodoService = async () => {
  try {
    const todos = Todo.find();
    return todos;
  } catch (error) {
    throw new Error(`Error getting Todos ${error.message}`);
  }
};

export const addTodoService = async ({ title, text }) => {
  try {
    // console.log("kkk")
    const todo = new Todo({
      title,
      text,
    });

    const savedTodo = await todo.save();
    // console.log(savedTodo,"gggggggg");

    return savedTodo;
  } catch (error) {
    throw new Error(`Error Saving Todo ${error.message}`);
  }
};

export const findTitleByIdService = async ({ id }) => {
  try {
    const todo = await Todo.findById(id);
    // console.log(todo)
    return todo;
  } catch (error) {
    throw new Error(`Error getting Todo By Id ${error.message}`);
  }
};

export const updateTodoService = async (req) => {
  try {
    const title = req.body.title;
    const text = req.body.text;
    const id = req.params.id;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        title: title,
        text: text,
      },
      { new: true }
    );

    return updatedTodo;
  } catch (error) {
    throw new Error(`Error while Updating ${error.message}`);
  }
};

export const deleteTodoService = async (req) => {
  try {
    const id = req.params.id;

    const todoToDelete = await Todo.findByIdAndDelete(id);

    return todoToDelete;
  } catch (error) {
    throw new Error("Error Deleting Todo" + error.message);
  }
};
