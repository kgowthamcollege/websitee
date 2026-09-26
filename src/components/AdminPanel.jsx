import React from "react";
import { currency } from "../data/constants";

export default function AdminPanel({
  open,
  onClose,
  unlocked,
  email,
  onEmailChange,
  password,
  onPasswordChange,
  onCheckPassword,
  error,
  message,
  inquiries,
  orders,
  onClearOrders,
  onSignOut,
}) {
  if (!open) return null;

  return (
    <div className="as-admin-overlay">
      {!unlocked ? (
        <div className="as-admin-login-box">
          <h3>Admin Access</h3>
          <p>Sign in with your authorized Firebase admin account.</p>
          <input
            type="email"
            placeholder="Admin email"
            autoComplete="username"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onCheckPassword();
            }}
          />
          <button onClick={onCheckPassword}>Unlock</button>
          {error && <div className="as-admin-error">{message}</div>}
          <div style={{ marginTop: 14 }}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
              style={{ fontSize: 12, color: "var(--as-ink-soft)" }}
            >
              Cancel
            </a>
          </div>
        </div>
      ) : (
        <div className="as-admin-panel">
          <div className="as-admin-head">
            <h3>Admin Dashboard</h3>
            <button onClick={onClose}>✕</button>
          </div>
          <div className="as-admin-stats">
            <div className="as-admin-stat">
              <div className="as-num">{orders.length}</div>
              <div className="as-lbl">Orders</div>
            </div>
            <div className="as-admin-stat">
              <div className="as-num">{currency(orders.reduce((s, o) => s + o.total, 0))}</div>
              <div className="as-lbl">Total Revenue</div>
            </div>
          </div>
          <div className="as-admin-section-title">Orders</div>
          {orders.length === 0 && <div className="as-admin-empty">No orders yet.</div>}
          {orders.map((o, i) => (
            <div key={i} className="as-admin-order">
              <div className="as-admin-order-top">
                <span>{o.method}</span>
                <span>{currency(o.total)}</span>
              </div>
              <div className="as-admin-order-items">
                {o.items.map((it) => `${it.name} × ${it.qty}`).join(", ")}
              </div>
              <div className="as-admin-order-meta">{new Date(o.ts).toLocaleString("en-IN")}</div>
            </div>
          ))}
          <div className="as-admin-section-title">Enquiries</div>
          {inquiries.length === 0 && <div className="as-admin-empty">No enquiries yet.</div>}
          {inquiries.map((inquiry) => (
            <div key={inquiry.id} className="as-admin-order">
              <div className="as-admin-order-top">
                <span>{inquiry.type}</span>
                <span>{inquiry.phone}</span>
              </div>
              <div className="as-admin-order-items">{inquiry.name}{inquiry.product ? ` · ${inquiry.product}` : ""}</div>
              <div className="as-admin-order-meta">{new Date(inquiry.ts).toLocaleString("en-IN")}</div>
            </div>
          ))}
          {message && <div className="as-admin-error">{message}</div>}
          <div className="as-admin-actions">
            <button onClick={onClearOrders}>Clear All Data</button>
            <button onClick={onSignOut}>Sign Out</button>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
