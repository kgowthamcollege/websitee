import React from "react";
import { QUICK_REPLIES } from "../data/constants";

export default function ChatWidget({
  open,
  onOpen,
  onClose,
  messages,
  input,
  onInputChange,
  onSend,
  onQuickReply,
}) {
  return (
    <>
      <button className="as-chat-fab" onClick={onOpen} aria-label="Chat with Amman AI">💬</button>
      {open && (
        <div className="as-chat-panel">
          <div className="as-chat-head-bar">
            <div>
              <h4>Amman AI</h4>
              <p>Gift ideas, orders & questions</p>
            </div>
            <button onClick={onClose}>✕</button>
          </div>
          <div className="as-chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`as-chat-msg as-chat-${m.role}`}>{m.text}</div>
            ))}
          </div>
          <div className="as-chat-suggest">
            {QUICK_REPLIES.map((q) => (
              <button key={q} className="as-chip" onClick={() => onQuickReply(q)}>
                {q.length > 22 ? q.slice(0, 20) + "…" : q}
              </button>
            ))}
          </div>
          <div className="as-chat-input-row">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSend();
              }}
            />
            <button onClick={() => onSend()} aria-label="Send">➤</button>
          </div>
        </div>
      )}
    </>
  );
}
