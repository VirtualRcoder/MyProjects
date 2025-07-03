import React from "react";

const MessageBubble = ({ sender, text }) => {
  const isUser = sender === "user";
  const messageClass = isUser ? "user-message" : "bot-message";

  return (
    <div className={`message-wrapper ${isUser ? "align-right" : "align-left"}`}>
        <div className={`message ${messageClass}`}>
            {text}
        </div>
    </div>
  );
};

export default MessageBubble;
