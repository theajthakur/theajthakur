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
  const [response, setResponse] = useState("");

  const saveCaretPosition = (el) => {
    const sel = window.getSelection();
    if (!sel.rangeCount) return null;
    return sel.getRangeAt(0).cloneRange(); // clone is important
  };

  const restoreCaretPosition = (el, range) => {
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const handleInput = (e) => {
    const el = e.target;
    const caret = saveCaretPosition(el);

    setUserMessage(el.innerText); // update React state

    // Let React finish DOM updates first, then restore caret
    requestAnimationFrame(() => {
      if (caret) restoreCaretPosition(el, caret);
    });
  };

  const API_URL = `${apiURL}/chatbot`;

  const generateAiMessage = async (query) => {
    setAiProcessing(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, lastResponse: response }),
      });

      const data = await res.json();
      setAiProcessing(false);

      if (
        data &&
        data.reply &&
        typeof data.reply === "string" &&
        data.reply.trim() !== ""
      ) {
        setResponse(data.reply);
        setChats((prevChats) => [
          ...prevChats,
          { message: data.reply, from: "ai" },
        ]);
      } else {
        console.warn("No valid AI response received.");
        setChats((prevChats) => [
          ...prevChats,
          {
            message:
              "Something went wrong, Please contact 'Vijay' by <a target='_blank' href='https://wa.me/+919695146906'>Whatsapp</a> or <a href='mailto://vijaysingh.handler@gmail.com' target='_blank'>Mail</a>",
            from: "ai",
          },
        ]);
      }
    } catch (error) {
      console.error("AI fetch error:", error);
      setAiProcessing(false);
    }
  };

  const handleSendQuery = () => {
    setTimeout(() => {
      inputRef.current.innerText = "";
    }, 100);
    if (aiProcessing) return;
    if (!userMessage.trim()) return;

    const msg = userMessage;
    setUserMessage("");

    setChats((prevChats) => [...prevChats, { message: msg, from: "user" }]);

    generateAiMessage(msg);
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
                    <ChatResponse response={chat?.message} />
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
                  contentEditable
                  ref={inputRef}
                  onInput={(e) => setUserMessage(e.currentTarget.innerText)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") return handleSendQuery();
                  }}
                  suppressContentEditableWarning
                />

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
