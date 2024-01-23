'use client';

import { useEffect, useState } from "react";
import { getTodos } from "./responses"
import { getAllTodos, Todo } from "@/redux/features/todoSlice"
import { useDispatch } from "react-redux"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { todo } from "node:test";

interface TodoState {
  success: boolean;
  count: number;
  data: Todo[];
}

export default function Todo() {
  const [activeButton, setActiveButton] = useState<'All'|'checked'|'unchecked'>('All')
  const [filteredTodos, setFilteredTodos] = useState<null|true|false>(null)
  const dispatch = useDispatch<AppDispatch>()
  const todoState = useAppSelector((state) => state.todoReducer.todos)
  
  useEffect(()=>{
    const fetchData = async ()=>{
      const response: TodoState = await getTodos()
      dispatch(getAllTodos(response.data))
    }

    fetchData()
  },[dispatch])

  console.log(todoState)
  


  const handleGetTodos =  () => {
    setActiveButton('All')
    setFilteredTodos(null)
  }

  const handleGetCheckedTodos = ()=>{
    setActiveButton('checked')
    setFilteredTodos(true)
  }

  const handleGetUncheckedTodos = ()=>{
    setActiveButton('unchecked')
    setFilteredTodos(false)
  }

  return (
    <section className='w-screen h-screen flex items-center'>
      <div className='w-[90vw] h-[90vh]  mx-auto py-3'>
        <div className='flex flex-row w-[90vw] gap-10 justify-center bg-gray-200 h-12 rounded-lg'>
          <button onClick={handleGetTodos} className={`bg-gray-300 hover:bg-gray-600 hover:text-white py-2 px-3 text-center rounded w-[20vw] ${(activeButton === 'All'? 'bg-gray-600':'')}`}>All</button>
          <button onClick={handleGetCheckedTodos} className={`bg-gray-300 hover:bg-gray-600 hover:text-white py-2 px-3 text-center rounded w-[20vw] ${(activeButton === 'checked'? 'bg-gray-600':'')}`}>Checked</button>
          <button onClick={handleGetUncheckedTodos} className={`bg-gray-300 hover:bg-gray-600 hover:text-white py-2 px-3 text-center rounded w-[20vw] ${(activeButton === 'unchecked'? 'bg-gray-600':'')}`}>Unchecked</button>
        </div>
        <div className="px-8">
        {todoState && todoState?.filter((todo: Todo) => filteredTodos ===null || todo.completed ===filteredTodos).map((todo: Todo) => (
            <div key={todo.id} className='flex flex-row justify-between items-center border border-gray-400 p-3 my-3'>
              <div className='flex flex-row items-center'>
                <input type='checkbox' className='mr-3' checked={todo.completed} />
                <p>{todo.name}</p>
              </div>
              <button className='bg-red-400 hover:bg-red-600 hover:text-white py-2 px-3 text-center rounded'>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
