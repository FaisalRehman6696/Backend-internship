import { createSlice, current } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
const initialState = {
  product: [],
};

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    AddCard: (state, action) => {
      console.log("output", action.payload);
      const existItem = state.product.find(
        (item) => item._id === action.payload._id
      );
      console.log("input", existItem);
      if (existItem) {
        existItem.quantity += 1;
      } else {
        state.product.push({ ...action.payload, quantity: 1 });
      }
    },
    RemoveCard: (state, action) => {
      console.log(action.payload);
      const existItem = state.product.find(
        (items) => items._id === action.payload._id
      );
      console.log(existItem);
      if (existItem) {
        if (existItem.quantity > 1) {
          existItem.quantity -= 1;
        } else {
          state.product = state.product.filter(
            (items) => items._id !== action.payload._id
          );
        }
      }
    },
    clearCard: (state) => {
      state.product = [];
    },
  },
});
// Action creators are generated for each case reducer function
export const { AddCard, RemoveCard, clearCard } = cardSlice.actions;
export const cardReducer = cardSlice.reducer;
