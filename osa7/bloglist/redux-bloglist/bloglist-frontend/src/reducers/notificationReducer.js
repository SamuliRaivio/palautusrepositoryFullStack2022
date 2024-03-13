import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    style: "none",
    content: "",
  },
  reducers: {
    show(state, action) {
      state = action.payload;
      return state;
    },
    hide(state) {
      state = { style: "none", content: "" };
      return state;
    },
  },
});

export const { show, hide } = notificationSlice.actions;

export const setNotification = (style, content) => {
  const payload = { style: style, content: content };
  return async (dispatch) => {
    dispatch(show(payload));
    await setTimeout(() => {
      dispatch(hide());
    }, 3000);
  };
};

export default notificationSlice.reducer;
