import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  card: [],
};

export const cardSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    AddToCard: (state, action) => {
      if (!action.payload?.id) return;
      const existItem = state.card.find((item) => item?.id === action.payload);

      if (existItem) {
        existItem.quantity += 1;
      } else {
        state.card.push({ ...action.payload, quantity: 1 });
      }
    },
    IncreasQuantity: (state, action) => {
      const existingtItem = state.card.find(
        (item) => item.id == action.payload
      );

      if (existingtItem) {
        existingtItem.quantity += 1;
      }
    },
    DecreasQuantity: (state, action) => {
      const existItem = state.card.find((item) => item.id === action.payload);
      if (existItem.quantity === 1) {
        state.card = state.card.filter((item) => item.id !== action.payload);
      } else {
        existItem.quantity -= 1;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { AddToCard, IncreasQuantity, DecreasQuantity } =
  cardSlice.actions;

export default cardSlice.reducer;
