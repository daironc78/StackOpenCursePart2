const Notification = ({ message, status }) => {
  if (message === null) {
    return null;
  }
  console.log("Message: ", message);
  console.log("Status: ", status);

  return <div className={status ? "success" : "error"}>{message}</div>;
};

export default Notification;
