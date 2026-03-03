import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: "light" },
  reducers: {
    ToggleTheme: (state, action) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});
export const { ToggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
