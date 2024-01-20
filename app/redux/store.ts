import {configureStore} from '@reduxjs/toolkit'
import cformReducer from "./features/cform";
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
    reducer:{
        cformReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;