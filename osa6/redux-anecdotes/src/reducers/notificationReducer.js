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
    notificationToShow(state, action) {
      const style = {
        border: "solid",
        padding: 10,
        borderWidth: 1,
      };
      state = { style: style, content: action.payload };
      return state;
    },
    //notificationHide just changes state to initialState
    //point is to hide notification after 5 secounds. I tried to find good way to include the 5 secound delay in this reducer but leave it for the components
    notificationHide(state) {
      state = {
        style: {
          display: "none",
        },
        content: "",
      };
      return state;
    },
  },
});

export const { notificationToShow, notificationHide } =
  notificationSlice.actions;

//setNotification is called in the actual component
//handles notification to show and after given secounds hides it
//async/await might be useless here
export const setNotification = (content, secounds) => {
  return async (dispatch) => {
    dispatch(notificationToShow(content));
    await setTimeout(() => {
      dispatch(notificationHide());
    }, secounds * 1000);
  };
};
export default notificationSlice.reducer;
