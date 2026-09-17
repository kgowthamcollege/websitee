import React from "react";
import { PRODUCTS, FRAME_SIZES, currency } from "../data/constants";

export default function Shop({ onAddToCart, selectedFrame, onSelectFrame, onAddFrame }) {
  return (
    <section id="section-shop" className="as-section">
      <div className="as-wrap">
        <div className="as-section-head">
          <div className="as-eyebrow">The collection</div>
          <h2>Pick a Product, Add Your Photo</h2>
          <p>Every tag shows the price straight up. Add to cart, upload your photos at checkout, we'll handle the rest.</p>
        </div>

        <div className="as-product-grid">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="as-gift-card">
              <div
                className={`as-gift-photo ${p.id === "mug" ? "as-gift-photo-full" : p.image ? "as-gift-photo-contain" : ""} ${p.id === "cushion" ? "as-gift-photo-cushion" : ""}`}
                style={{ background: p.gradient }}
              >
                {p.image && <img src={p.image} alt={p.name} />}
              </div>
              <div className="as-tag-hang">{currency(p.price)}</div>
              <div className="as-gift-body">
                <div className="as-gift-cat">{p.cat}</div>
                <h3>{p.name}</h3>
                <div className="as-gift-price-row">
                  <div className="as-gift-price">{currency(p.price)}</div>
                  <button className="as-add-btn" onClick={() => onAddToCart(p)}>Add to cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="as-product-grid as-frame-grid" style={{ marginTop: 20 }}>
          <div className="as-gift-card as-frame-card">
            <div className="as-gift-photo">
              <img src="/assets/custom-photo-frame.jpeg" alt="Custom photo frame" />
            </div>
            <div className="as-gift-body">
              <div className="as-gift-cat">Wall Art</div>
              <h3>Custom Photo Frame — Choose a Size</h3>
              <div className="as-frame-size-grid">
                {FRAME_SIZES.map((fs) => (
                  <button
                    key={fs.size}
                    className={`as-size-btn ${selectedFrame?.size === fs.size ? "active" : ""}`}
                    onClick={() => onSelectFrame(fs)}
                  >
                    {fs.size}
                  </button>
                ))}
              </div>
              {selectedFrame && (
                <div className="as-frame-price-display">
                  <button className="as-fp-close" onClick={() => onSelectFrame(null)}>✕</button>
                  <div className="as-fp-col">
                    <div className="as-fp-label">Frame Only</div>
                    <div className="as-fp-amount">
                      {selectedFrame.frame != null ? currency(selectedFrame.frame) : "—"}
                    </div>
                    {selectedFrame.frame != null && (
                      <button className="as-add-btn" onClick={() => onAddFrame("frame")}>Add to cart</button>
                    )}
                  </div>
                  <div className="as-fp-col">
                    <div className="as-fp-label">Glass + Frame</div>
                    <div className="as-fp-amount">
                      {selectedFrame.glass != null ? currency(selectedFrame.glass) : "—"}
                    </div>
                    {selectedFrame.glass != null && (
                      <button className="as-add-btn" onClick={() => onAddFrame("glass")}>Add to cart</button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
