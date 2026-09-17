import React from "react";

export default function BottomNav({ cartCount, onHome, onShop, onUpload, onCart, onChat }) {
  return (
    <nav className="as-bottom-nav">
      <button className="as-bnav-item" onClick={onHome}>🏠<span>Home</span></button>
      <button className="as-bnav-item" onClick={onShop}>🛍️<span>Shop</span></button>
      <button className="as-bnav-item" onClick={onUpload}>⬆️<span>Upload</span></button>
      <button className="as-bnav-item" onClick={onCart}>
        🛒{cartCount > 0 && <span className="as-bnav-badge">{cartCount}</span>}
        <span>Cart</span>
      </button>
      <button className="as-bnav-item" onClick={onChat}>💬<span>Chat</span></button>
    </nav>
  );
}
