import { createSlice } from "@reduxjs/toolkit";

//filter reducer just return value for filter
const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterAnecdote(state, action) {
      return (state = action.payload);
    },
  },
});

export const { filterAnecdote } = filterSlice.actions;
export default filterSlice.reducer;
