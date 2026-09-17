import React from "react";
import { UPLOAD_PRODUCT_OPTIONS } from "../data/constants";

export default function UploadPage({
  fileInputRef,
  photos,
  onFiles,
  onRemovePhoto,
  form,
  onFormChange,
  uploadDone,
  onConfirm,
  onReset,
}) {
  return (
    <section id="section-upload" className="as-section" style={{ background: "var(--as-cream-2)" }}>
      <div className="as-wrap">
        <div className="as-section-head">
          <div className="as-eyebrow">Upload your photos</div>
          <h2>Send Us Your Favourite Moments</h2>
          <p>Upload your photos here, fill in your details, and confirm your order — we'll receive everything on WhatsApp and start working on your gift.</p>
        </div>

        {!uploadDone ? (
          <div>
            <div className="as-upload-zone" onClick={() => fileInputRef.current?.click()}>
              <p>Tap to select photos or drag & drop here</p>
              <div className="as-sub">JPG, PNG, WEBP — up to 10 photos, 10 MB each</div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              style={{ display: "none" }}
              onChange={(e) => {
                onFiles(e.target.files);
                e.target.value = "";
              }}
            />

            {photos.length > 0 && (
              <div className="as-upload-preview-grid">
                {photos.map((p, i) => (
                  <div key={i} className="as-upload-thumb">
                    <img src={p.url} alt="" />
                    <button onClick={() => onRemovePhoto(i)}>✕</button>
                  </div>
                ))}
              </div>
            )}
            {photos.length > 0 && (
              <div className="as-upload-count">
                {photos.length} photo{photos.length === 1 ? "" : "s"} selected
              </div>
            )}

            <div className="as-upload-form-row">
              <input
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => onFormChange({ ...form, name: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Phone / WhatsApp number"
                value={form.phone}
                onChange={(e) => onFormChange({ ...form, phone: e.target.value })}
              />
            </div>
            <div className="as-upload-form-row">
              <select value={form.product} onChange={(e) => onFormChange({ ...form, product: e.target.value })}>
                <option value="">Select a product</option>
                {UPLOAD_PRODUCT_OPTIONS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Occasion — birthday, anniversary, etc."
                value={form.occasion}
                onChange={(e) => onFormChange({ ...form, occasion: e.target.value })}
              />
            </div>
            <div className="as-upload-form-row full">
              <textarea
                placeholder="Any special instructions — frame size, text on mug, quantity, etc. (optional)"
                value={form.notes}
                onChange={(e) => onFormChange({ ...form, notes: e.target.value })}
              />
            </div>

            <button className="as-upload-confirm-btn" onClick={onConfirm}>
              ➤ Confirm &amp; Send to WhatsApp
            </button>
            <div className="as-upload-note">
              This will open WhatsApp with your order details pre-filled to <b>+91 86820 01729</b>. Please also
              share your photos in the same chat — nothing sends without your confirmation.
            </div>
          </div>
        ) : (
          <div className="as-upload-success">
            <div className="as-check-circle">✓</div>
            <h3>Order Sent!</h3>
            <p>
              Your order details have been sent to our WhatsApp. Please share your uploaded photos in the same
              WhatsApp chat so we can start printing. We'll confirm receipt shortly!
            </p>
            <button className="as-btn-primary" style={{ marginTop: 20 }} onClick={onReset}>
              Upload Another Order
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
