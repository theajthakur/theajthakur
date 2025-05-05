import React from "react";

const ChatResponse = ({ response }) => {
  const cleanHTML = response
    .replace(/^```html\n/, "")
    .replace(/\n```$/, "")
    .replace("```", "");

  return (
    <div
      className="chat-reply"
      dangerouslySetInnerHTML={{ __html: cleanHTML }}
    />
  );
};

export default ChatResponse;
