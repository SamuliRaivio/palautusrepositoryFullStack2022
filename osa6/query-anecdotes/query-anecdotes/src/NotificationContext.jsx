import { createContext, useReducer } from "react";

const initialState = {
  style: {
    display: "none",
  },
  message: "",
};

const messageStyle = {
  border: "solid",
  padding: 10,
  borderWidth: 1,
  marginBottom: 5,
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "NEW":
      console.log(state);
      const newMessage = `anecdote '${action.payload}' created`;
      const newState = { style: messageStyle, message: newMessage };
      console.log(newState);
      return newState;
    case "VOTE":
      return state;
    case "LENGTHERR":
      return state;
    case "HIDE":
      return state;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationCotextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
