import React from "react";
import { MessageNotificationProps } from "@/types";

const MessageNotification: React.FC<MessageNotificationProps> = ({
  message,
}) => {
  if (!message) return null;

  return (
    <div
      className={`mb-6 p-4 rounded-lg ${
        message.type === "success"
          ? "bg-green-100 border border-green-300 text-green-700"
          : "bg-red-100 border border-red-300 text-red-700"
      }`}
    >
      {message.text}
    </div>
  );
};

export default MessageNotification;
