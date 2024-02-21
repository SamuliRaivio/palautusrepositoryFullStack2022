import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const Notification = () => {
  const [state, dispatch] = useContext(NotificationContext);

  //if (true) return null;

  return <div style={state.style}>{state.message}</div>;
};

export default Notification;
