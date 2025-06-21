import { useEffect, useRef, useState } from "react";
import "./css/chatbot.css";
import CharmingStars from "./CharmingStars";
import ChatResponse from "./ChatResponse";

export default function ChatBot() {
  const chatBoxRef = useRef(null);
  const inputRef = useRef(null);
  const apiURL = import.meta.env.VITE_API_URL;
  const [chatBotVisibility, setChatBotVisibility] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [chats, setChats] = useState([
    { message: "How can I help you?", from: "ai" },
  ]);
  const placeCaretAtEnd = (el) => {
    if (!el) return;

    const range = document.createRange();
    const sel = window.getSelection();

    range.selectNodeContents(el);
    range.collapse(false); // false = move to end

    sel.removeAllRanges();
    sel.addRange(range);
  };

  const handleInput = () => {
    setUserMessage(inputRef.current.innerText);
    placeCaretAtEnd(inputRef.current);
  };
  const API_URL = `${apiURL}/chatbot`;

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

  const handleSendQuery = () => {
    if (aiProcessing) return;
    if (!userMessage) return;
    setUserMessage("");
    setChats((prevChats) => {
      return [...prevChats, { message: userMessage, from: "user" }];
    });
    generateAiMessage(userMessage);
  };
  useEffect(() => {
    const chatBox = chatBoxRef.current;
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [chats]);

  useEffect(() => {
    if (!chatBotVisibility) {
      document.body.style = "overflow:auto";
    } else {
      document.body.style = "overflow:hidden";
    }
  }, [chatBotVisibility]);
  return (
    <div
      className={`chatbot-container ${chatBotVisibility ? "only-chat" : ""}`}
      style={{
        bottom: chatBotVisibility ? 0 : 20,
        right: chatBotVisibility ? 10 : 50,
      }}
    >
      {chatBotVisibility ? (
        <div className="chatbot-box card">
          <div className="chatbot-inner">
            <div className="chatbot-header">
              <div className="chatbot-flex">
                <div className="ai-image-container">
                  <img src="/favicon.png" alt="ai-image" />
                </div>
                <div className="ai-name-container">
                  <h3 className="m-0">
                    <b>VJBot</b>
                  </h3>
                </div>
                <div className="ai-head-option">
                  <div className="main-icon">
                    <span
                      className="bi bi-x"
                      onClick={() => {
                        setChatBotVisibility(false);
                      }}
                    ></span>
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
              <div className="chatbot-footer-items">
                <div
                  className="ai-input"
                  contentEditable={true}
                  ref={inputRef}
                  onInput={handleInput}
                  onBlur={handleInput}
                  suppressContentEditableWarning={true}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendQuery();
                  }}
                >
                  {userMessage}
                </div>
                <div className="ai-controller">
                  <button className="ai-send-btn" onClick={handleSendQuery}>
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
          <img src="/assets/images/chatbot.png" width={80} />
        </div>
      )}
    </div>
  );
}
