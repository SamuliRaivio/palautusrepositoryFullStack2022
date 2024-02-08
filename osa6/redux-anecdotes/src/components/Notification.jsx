import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  return <div style={notification.style}>{notification.content}</div>;
};

export default Notification;
