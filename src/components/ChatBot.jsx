import React from "react";
import "./css/chatbot.css";

export default function ChatBot() {
  return (
    <div className="chatbot-container">
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
                  <span className="bi bi-three-dots-vertical"></span>
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
    </div>
  );
}
