import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const test = "asd";

  return <div style={notification.style}>{notification.content}</div>;
};

export default Notification;
