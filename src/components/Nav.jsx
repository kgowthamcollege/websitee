import React from "react";

export default function Nav({
  sidebarOpen,
  onToggleSidebar,
  cartCount,
  bump,
  onCartClick,
  onShopClick,
  onLogoClick,
  onAdminClick,
}) {
  return (
    <nav className="as-nav">
      <div className="as-nav-inner">
        <button
          className={`as-sidebar-toggle ${sidebarOpen ? "active" : ""}`}
          aria-label="Menu"
          onClick={onToggleSidebar}
        >
          <span /><span /><span />
        </button>
        <div className="as-logo" onClick={onLogoClick}>
          Amman <span>Studios Gifts</span>
        </div>
        <div className="as-nav-right">
          <button className="as-cart-btn" onClick={onCartClick} aria-label="Cart">
            🛒
            {cartCount > 0 && <span className={`as-cart-count ${bump ? "pop" : ""}`}>{cartCount}</span>}
          </button>
          <a
            className="as-nav-cta"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onShopClick();
            }}
          >
            Shop Gifts
          </a>
        </div>
      </div>
    </nav>
  );
}
