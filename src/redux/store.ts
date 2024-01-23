import { configureStore } from "@reduxjs/toolkit";
// import { useDispatch } from "react-redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import  todoReducer from "./features/todoSlice";

export const store = configureStore({
    reducer: {
        todoReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;