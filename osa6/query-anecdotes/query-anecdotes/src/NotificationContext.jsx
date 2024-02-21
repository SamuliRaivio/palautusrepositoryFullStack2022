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
      const createdMessage = `anecdote '${action.payload}' created`;
      const createdState = { style: messageStyle, message: createdMessage };
      console.log(createdState);
      return createdState;
    case "VOTE":
      const votedMessage = `anecdote '${action.payload}' voted`;
      const votedState = { style: messageStyle, message: votedMessage };
      return votedState;
    case "LENGTHERR":
      const errorLengthMessage = `ERROR anecdote must be at over 4 char`;
      const errorLenghtState = {
        style: messageStyle,
        message: errorLengthMessage,
      };
      return errorLenghtState;
    case "HIDE":
      return initialState;
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
