import { JsonValue } from "@prisma/client/runtime/library";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type cfieldType = {
  id: string;
  name: string;
  type: string;
  note?: string;
};

const initialState = [{ name: "khoa", type: "le" }] as cfieldType[];

export const cform = createSlice({
  name: "cform",
  initialState: initialState,
  reducers: {
    sync: (state, action: PayloadAction<JsonValue>) => {
      const newData: cfieldType[] = action.payload as cfieldType[];
      if (newData == null) {
        return [];
      }
      return newData;
    },

    fieldAdded: (state, action: PayloadAction<cfieldType>) => {
      state.push(action.payload);
    },

    fieldUpdate: (state, action: PayloadAction<cfieldType>) => {
      const index = state.findIndex((field) => field.id === action.payload.id);

      if (index !== -1) {
        // Create a new array with the updated field
        return [
          ...state.slice(0, index),
          action.payload,
          ...state.slice(index + 1),
        ];
      }
    },
  },
});

export const { fieldAdded, sync, fieldUpdate } = cform.actions;

export default cform.reducer;
