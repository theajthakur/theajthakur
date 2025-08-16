import React from "react";

const ChatResponse = ({ response }) => {
  try {
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
  } catch (error) {
    console.log(error.message || error);
    return "Something went wrong";
  }
};

export default ChatResponse;
