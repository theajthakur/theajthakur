import React, { useState } from "react";
import "./css/chatbot.css";

export default function ChatBot() {
  const [chatBotVisibility, setChatBotVisibility] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  return (
    <div className="chatbot-container">
      {chatBotVisibility ? (
        <div className="chatbot-box">
          <div className="chatbot-inner">
            <div className="chatbot-header">
              <div className="chatbot-flex">
                <div className="ai-image-container">
                  <img src="/vite.svg" alt="ai-image" />
                </div>
                <div className="ai-name-container">
                  <h4 className="m-0">YUNI AI</h4>
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
            <div className="chatbot-body"></div>
            <div className="chatbot-footer">
              <div className="chatbot-flex">
                <div className="input-container">
                  <input
                    type="text"
                    placeholder="Your Skills?"
                    className="ai-prompt-input"
                  />
                </div>
                <div className="input-submit-container">
                  <button className="ai-prompt-submit">
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
