import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "./counter/CounterSlice";
import themeReducer from "./counter/ThemeSlice";
import  cardReducer from "./counter/CardSlice";

export const store = configureStore({
  reducer: {
    products: CounterReducer,
    theme: themeReducer,
    items: cardReducer,
  },
});


