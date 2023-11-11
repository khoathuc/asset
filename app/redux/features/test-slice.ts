import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialState = {
    value: TestState
}

type TestState  = {
    isChecked: boolean,
    name: string,
}

const initialState = {
    value:{
        isChecked: false,
        name: "khoale"
    }
}

export const test = createSlice({
    name: "test",
    initialState: initialState,
    reducers: {
        testAction: (state, action: PayloadAction<string>)=>{
            console.log(action)
            return {
                value:{
                    isChecked: true,
                    name: action.payload
                }
            };
        },
    }
})

export const {testAction} = test.actions;

export default test.reducer;