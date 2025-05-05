import React, { useEffect, useRef, useState } from "react";
import "./css/chatbot.css";
import CharmingStars from "./CharmingStars";
import ChatResponse from "./ChatResponse";

export default function ChatBot() {
  const chatBoxRef = useRef(null);
  const [chatBotVisibility, setChatBotVisibility] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [chats, setChats] = useState([
    { message: "How can I help you?", from: "ai" },
  ]);
  const API_URL = "https://treshop-backend.onrender.com/portfolio/chat";
  // const API_URL = "http://localhost:5000/portfolio/chat";

  const generateAiMessage = async (query) => {
    setAiProcessing(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setAiProcessing(false);
      setChats((prevChats) => {
        return [...prevChats, { message: data.reply, from: "ai" }];
      });
    } catch (error) {
      console.log(error);
      setAiProcessing(false);
    }
  };
  useEffect(() => {
    const chatBox = chatBoxRef.current;
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [chats]);
  return (
    <div
      className={`chatbot-container ${chatBotVisibility ? "only-chat" : ""}`}
    >
      {chatBotVisibility ? (
        <div className="chatbot-box">
          <div className="chatbot-inner">
            <div className="chatbot-header">
              <div className="chatbot-flex">
                <div className="ai-image-container">
                  <img src="/vite.svg" alt="ai-image" />
                </div>
                <div className="ai-name-container">
                  <h4 className="m-0">UNI AI</h4>
                </div>
                <div className="ai-head-option">
                  <div className="main-icon">
                    <span
                      className={`bi ${
                        showSettings ? "bi-x" : "bi-three-dots-vertical"
                      }`}
                      onClick={() => {
                        setShowSettings(!showSettings);
                      }}
                    ></span>
                    {showSettings ? (
                      <div className="chatbot-settings">
                        <ul>
                          <li
                            onClick={() => {
                              setShowSettings(false);
                              setChatBotVisibility(false);
                            }}
                          >
                            Exit
                          </li>
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="chatbot-body" ref={chatBoxRef}>
              {chats.map((chat, index) => (
                <div className="chat-container" key={`chat_${index}`}>
                  <div
                    className={`bubble-message ${
                      chat.from == "ai" ? "chat-ai" : "chat-user"
                    }`}
                  >
                    <ChatResponse response={chat.message} />
                  </div>
                </div>
              ))}
              {aiProcessing ? (
                <div className="chat-container">
                  <div className="bubble-message chat-ai">
                    <div className="chat-charm">
                      <CharmingStars />
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="chatbot-footer">
              <div className="chatbot-flex">
                <div className="input-container">
                  <input
                    type="text"
                    placeholder="Your Skills?"
                    className="ai-prompt-input"
                    value={userMessage}
                    onChange={(event) => {
                      setUserMessage(event.target.value);
                    }}
                  />
                </div>
                <div className="input-submit-container">
                  <button
                    className="ai-prompt-submit"
                    onClick={() => {
                      if (aiProcessing) return;
                      setUserMessage("");
                      setChats((prevChats) => {
                        return [
                          ...prevChats,
                          { message: userMessage, from: "user" },
                        ];
                      });
                      generateAiMessage(userMessage);
                    }}
                  >
                    <span className="bi bi-send"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="chatbot-avatar"
          onClick={() => {
            setChatBotVisibility(true);
          }}
        >
          <img src="/assets/images/chatbot.png" width={"100px"} />
        </div>
      )}
    </div>
  );
}
