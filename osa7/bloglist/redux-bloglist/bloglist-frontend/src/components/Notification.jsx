/* const Notification = ({ notification, notificationStyle }) => {
  if (notification === null) {
    return null;
  }

  return <div className={notificationStyle}>{notification}</div>;
};

export default Notification; */

import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  return <div className={notification.style}>{notification.content}</div>;
};

export default Notification;
