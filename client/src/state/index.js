import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: "6648ccdf04e86b1f0ecf427c",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
