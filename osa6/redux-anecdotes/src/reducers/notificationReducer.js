import { createSlice } from "@reduxjs/toolkit";

//notification reducers state includes shown message and style thats main purpose is to show or hide the actual component
//as the notification will be shown after users actions, initial state will be hidden
//so initialState is object with style: display: "none" and content: ""
const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    style: {
      display: "none",
    },
    content: "",
  },
  reducers: {
    //notificationToShow takes message to display as action payload so shown message depends on how this will be used in components
    //so this reducer will be used in both vote and add and the style will be the same
    notificationToShow: {
      reducer: (state, action) => {
        state = action.payload;
        return state;
      },
      prepare: (value) => {
        const style = {
          border: "solid",
          padding: 10,
          borderWidth: 1,
        };
        const content = value;
        return { payload: { style, content } };
      },
    },
    //notificationHide just changes state to initialState
    //point is to hide notification after 5 secounds. I tried to find good way to include the 5 secound delay in this reducer but leave it for the components
    notificationHide: {
      reducer: (state, initialState) => {
        state = initialState;
        return state;
      },
    },
  },
});

export const { notificationToShow, notificationHide } =
  notificationSlice.actions;
export default notificationSlice.reducer;
