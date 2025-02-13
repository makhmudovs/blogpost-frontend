import React from "react";

interface Notification {
  message: string;
  msgType: string;
}

const Notification: React.FC<Notification> = ({ message, msgType }) => {
  const colors = {
    info: "dark:text-blue-400 bg-blue-50 text-blue-800",
    danger: "dark:text-red-400 bg-red-50 text-red-800",
    success: "dark:text-green-400 bg-green-50 text-green-800",
  };
  if (message !== null) {
    return (
      <div
        className={`p-4 mb-4 text-sm  rounded-lg  dark:bg-gray-800 ${colors[msgType]}`}
        role="alert"
      >
        <span className="font-medium">{msgType.toUpperCase()} alert!</span>{" "}
        {message}
        {"."}
      </div>
    );
  } else {
    return null;
  }
};

export default Notification;
