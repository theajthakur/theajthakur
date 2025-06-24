import React, { useEffect, useState } from "react";
import { Mail, Eye, Trash2, Reply } from "lucide-react";
import { notyf } from "../../utils/notyf";

export default function FeedbackAdmin() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiURL}/admin/feedback`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch messages");
        return res.json();
      })
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;

    try {
      const res = await fetch(`${apiURL}/admin/feedback/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id }),
      });

      if (!res.ok) throw new Error("Failed to delete message");
      const data = await res.json();
      notyf[data.status](data.message);

      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      if (replyingTo === id) {
        setReplyingTo(null);
        setReplyText("");
      }
    } catch (err) {
      notyf.error(err.message);
    }
  };

  const handleReplyClick = (id) => {
    if (replyingTo === id) {
      setReplyingTo(null);
      setReplyText("");
    } else {
      setReplyingTo(id);
      setReplyText("");
    }
  };

  const handleSendReply = async (id) => {
    if (!replyText.trim()) {
      notyf.error("Reply cannot be empty");
      return;
    }

    try {
      const res = await fetch(`${apiURL}/admin/feedback/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id, reply: replyText }),
      });

      if (!res.ok) throw new Error("Failed to send reply");

      notyf.success("Reply sent successfully");
      setReplyingTo(null);
      setReplyText("");
    } catch (err) {
      notyf.error(err.message);
    }
  };

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (error)
    return (
      <div className="notyf.success notyf.success-danger my-5">{error}</div>
    );

  return (
    <div className="container py-4">
      <h3 className="mb-4">
        <Mail className="me-2" size={24} />
        User Feedback
      </h3>
      <div className="row">
        {messages.map((msg) => (
          <div key={msg._id} className="col-xl-4 col-lg-6 my-2">
            <div className="card shadow-sm h-100 d-flex flex-column">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-primary">{msg.name}</h5>
                <h6 className="card-subtitle mb-1 text-muted">{msg.email}</h6>
                <h6 className="card-subtitle mb-1 text-muted">{msg.mobile}</h6>
                <small className="text-muted mb-2">
                  {new Date(msg.createdAt).toLocaleString()}
                </small>
                <p className="card-text text-truncate">{msg.message}</p>
                {msg.reply && (
                  <div className="p-2 bg-light mb-3 text-secondary">
                    {msg.reply}
                  </div>
                )}
                <div className="mt-auto d-flex justify-content-between">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#messageModal"
                    onClick={() => setSelectedMessage(msg)}
                  >
                    <Eye size={16} className="me-1" />
                    View
                  </button>
                  {!msg.reply && (
                    <button
                      className={`btn btn-sm ${
                        replyingTo === msg._id
                          ? "btn-success"
                          : "btn-outline-success"
                      }`}
                      onClick={() => handleReplyClick(msg._id)}
                    >
                      <Reply size={16} className="me-1" />
                      Reply
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(msg._id)}
                  >
                    <Trash2 size={16} className="me-1" />
                    Delete
                  </button>
                </div>
                {replyingTo === msg._id && (
                  <div className="mt-3">
                    <textarea
                      className="form-control mb-2"
                      rows="3"
                      placeholder="Type your reply here..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleSendReply(msg._id)}
                    >
                      Send Reply
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="modal fade"
        id="messageModal"
        tabIndex="-1"
        aria-labelledby="messageModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {selectedMessage && (
              <>
                <div className="modal-header">
                  <h5 className="modal-title" id="messageModalLabel">
                    {selectedMessage.name}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    <strong>Email:</strong> {selectedMessage.email}
                  </p>
                  <p>
                    <strong>Message:</strong>
                    <br />
                    {selectedMessage.message}
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => handleReplyClick(selectedMessage._id)}
                    data-bs-dismiss="modal"
                  >
                    <Reply size={16} className="me-1" />
                    Reply
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
