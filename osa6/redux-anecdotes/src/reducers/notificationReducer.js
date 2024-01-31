import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "test notification",
  reducers: {
    notificationToShow(state, action) {
      state = `You voted ${action.payload}`;
      return state;
    },
  },
});

/* const notificationSlice = createSlice({
  name: "notification",
  initialState: "testinottikaatti",
  reducers: {
    notificationToShow: {
      reducer: (state, action) => {
        state = `You voted ${action.payload}`;
        return state;
      },
      prepare: () => {
        const returnState = () => {
          state = initialState;
        };
        setTimeout(returnState, 5000);
      },
    },
  },
}); */

export const { notificationToShow } = notificationSlice.actions;
export default notificationSlice.reducer;
