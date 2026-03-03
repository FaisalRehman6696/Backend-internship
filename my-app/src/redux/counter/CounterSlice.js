import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProduct = createAsyncThunk("fetchproduct", async () => {
  const res = await axios.get("https://fakestoreapi.com/products");
  return res.data;
});

// const initialState = {
//   todos: [{ id: 1, text: "hello world" }],
// };

export const counterSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  // name: "todos",
  // initialState,
  // reducers: {
  //   AddTodo: (state, action) => {
  //     console.log(action);
  //     const todo = {
  //       id: nanoid(),
  //       text: action.payload.text,
  //     };
  //     state.todos.push(todo);
  //   },
  //   RemoveTodo: (state, action) => {
  //     state.todos = state.todos.filter((todo) => todo.id !== action.payload);
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProduct.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export const { AddTodo, RemoveTodo } = counterSlice.actions;

export default counterSlice.reducer;
