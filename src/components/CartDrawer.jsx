import React from "react";
import { UPI_ID, currency } from "../data/constants";

export default function CartDrawer({
  open,
  onClose,
  cart,
  onRemove,
  total,
  onCheckoutWhatsapp,
  onRazorpay,
  qrOpen,
  onToggleQr,
}) {
  return (
    <>
      {open && <div className="as-overlay" onClick={onClose} />}
      <div className={`as-cart-drawer ${open ? "open" : ""}`}>
        <div className="as-cart-head">
          <h3>Your Cart</h3>
          <button onClick={onClose} style={{ fontSize: 20 }}>✕</button>
        </div>
        <div className="as-cart-items">
          {cart.length === 0 && <p style={{ color: "var(--as-ink-soft)" }}>Your cart is empty.</p>}
          {cart.map((i) => (
            <div key={i.id} className="as-cart-item">
              <div>
                <div>{i.name}</div>
                <div style={{ fontSize: 13, color: "var(--as-ink-soft)" }}>
                  Qty {i.qty} · {currency(i.price)}
                </div>
              </div>
              <button onClick={() => onRemove(i.id)}>Remove</button>
            </div>
          ))}
        </div>
        <div className="as-cart-foot">
          <div className="as-cart-total">
            <span>Total</span>
            <span>{currency(total)}</span>
          </div>
          <button className="as-checkout-btn" onClick={onCheckoutWhatsapp} disabled={cart.length === 0}>
            Checkout via WhatsApp →
          </button>
          <button className="as-checkout-btn as-razorpay-btn" onClick={onRazorpay} disabled={cart.length === 0}>
            Pay Now with Razorpay
          </button>
          <button className="as-checkout-btn as-qr-toggle-btn" onClick={onToggleQr}>
            📱 Scan to Pay (UPI)
          </button>
          {qrOpen && (
            <div className="as-qr-pay-box">
              <img
                src="/assets/upi-qr.jpeg"
                alt="UPI payment QR code"
                style={{
                  width: "100%",
                  maxWidth: 220,
                  height: "auto",
                  display: "block",
                  margin: "0 auto 12px",
                  borderRadius: 12,
                  background: "#fff",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
                }}
              />
              <div className="as-qr-pay-label">Scan with GPay, PhonePe, Paytm or any UPI app</div>
              <div className="as-qr-pay-id">{UPI_ID}</div>
            </div>
          )}
          <div className="as-upi-note">
            Pay by UPI to <b>{UPI_ID}</b> — we'll confirm and send a receipt.
          </div>
        </div>
      </div>
    </>
  );
}
