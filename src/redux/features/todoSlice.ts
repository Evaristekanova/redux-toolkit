import { createSlice } from "@reduxjs/toolkit";

export type Todo = {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

type TodoState = {
    todos: Todo[]
}
const initialState ={
    todos: []
} as TodoState;

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        getAllTodos: (state, action) => {
            state.todos = action.payload;
        },
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        updateTodo: (state, action) => {
            const index = state.todos.findIndex(todo => todo.id === action.payload.id);
            state.todos[index] = action.payload;
        }
    }
});

export const { getAllTodos, addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;


