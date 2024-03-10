const Notification = ({ notification, notificationStyle }) => {
  if (notification === null) {
    return null;
  }

  return <div className={notificationStyle}>{notification}</div>;
};

export default Notification;
