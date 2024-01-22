'use client';

import { getTodos } from "./responses"
import { getAllTodos, Todo } from "@/redux/features/todoSlice"
import { useDispatch } from "react-redux"
import { AppDispatch, useAppSelector } from "@/redux/store"

export default function Todo() {
  const dispatch = useDispatch<AppDispatch>()
  const todos = useAppSelector((state) => state.todoReducer.todos)

  const handleGetTodos = async () => {
    const response = await getTodos()
    dispatch(getAllTodos(response))
    console.log(response)

  }

  const handleGetCheckedTodos = async () => {
    const response = await getTodos()
    const checkedTodos = response.filter((todo: Todo) => todo.completed === true)
    dispatch(getAllTodos(checkedTodos))
  }

  const handleGetUncheckedTodos = async () => {
    const response = await getTodos()
    const uncheckedTodos = response.filter((todo: Todo) => todo.completed === false)
    dispatch(getAllTodos(uncheckedTodos))
  }


  return (
    <section className='w-screen h-screen flex items-center'>
      <div className='w-[90vw] h-[90vh] border border-red-400 mx-auto py-3'>
        <div className='flex flex-row w-[90vw] gap-10 justify-center'>
          <button onClick={handleGetTodos} className='bg-gray-300 hover:bg-gray-600 hover:text-white py-2 px-3 text-center rounded w-[20vw]'>All</button>
          <button onClick={handleGetCheckedTodos} className='bg-gray-300 hover:bg-gray-600 hover:text-white py-2 px-3 text-center rounded w-[20vw]'>Checked</button>
          <button onClick={handleGetUncheckedTodos} className='bg-gray-300 hover:bg-gray-600 hover:text-white py-2 px-3 text-center rounded w-[20vw]'>Unchecked</button>
        </div>
        <div>
          {todos.map((todo: Todo) => (
            <div key={todo.id} className='flex flex-row justify-between items-center border border-gray-400 p-3 my-3'>
              <div className='flex flex-row items-center'>
                <input type='checkbox' className='mr-3' checked={todo.completed} />
                <p>{todo.title}</p>
              </div>
              <button className='bg-red-400 hover:bg-red-600 hover:text-white py-2 px-3 text-center rounded'>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
