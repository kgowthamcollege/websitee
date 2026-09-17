import React from "react";
import { UPI_ID } from "../data/constants";

export default function Contact({ form, onFormChange, onSubmit }) {
  return (
    <section id="section-contact" className="as-section">
      <div className="as-wrap as-visit-grid">
        <div>
          <div className="as-section-head" style={{ marginBottom: 22 }}>
            <div className="as-eyebrow">Get in touch</div>
            <h2>Custom Order? Just Ask.</h2>
          </div>
          <div className="as-visit-info">
            <div className="as-row">
              <div className="as-k">Studio</div>
              <div className="as-v">24 Kamarajar Street, Pazhavanthangal, Chennai 600114</div>
            </div>
            <div className="as-row">
              <div className="as-k">Hours</div>
              <div className="as-v">Mon–Sat, 10:00 AM – 7:30 PM</div>
            </div>
            <div className="as-row">
              <div className="as-k">Contact</div>
              <div className="as-v">+91 86820 01729</div>
            </div>
            <div className="as-row">
              <div className="as-k">UPI</div>
              <div className="as-v">{UPI_ID}</div>
            </div>
          </div>
        </div>
        <div className="as-contact-form">
          <input
            type="text"
            placeholder="Full name"
            value={form.name}
            onChange={(e) => onFormChange({ ...form, name: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Phone number"
            value={form.phone}
            onChange={(e) => onFormChange({ ...form, phone: e.target.value })}
          />
          <select value={form.type} onChange={(e) => onFormChange({ ...form, type: e.target.value })}>
            <option>Custom Order Enquiry</option>
            <option>Bulk / Corporate Gifting</option>
            <option>General Enquiry</option>
          </select>
          <input
            type="text"
            placeholder="Product of interest (optional)"
            value={form.product}
            onChange={(e) => onFormChange({ ...form, product: e.target.value })}
          />
          <button onClick={onSubmit}>Send to Amman Studios →</button>
          <div className="as-form-note">We'll open WhatsApp with your details pre-filled — nothing sends without your confirmation.</div>
        </div>
      </div>
    </section>
  );
}
