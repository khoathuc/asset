import {configureStore} from '@reduxjs/toolkit'
import testReducer from "./features/test-slice";
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
    reducer:{
        testReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;