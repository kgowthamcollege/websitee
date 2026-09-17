import React from "react";
import { FAQS } from "../data/constants";

export default function Faq({ openIndex, onToggle }) {
  return (
    <section id="section-faq" className="as-section">
      <div className="as-wrap">
        <div className="as-section-head">
          <div className="as-eyebrow">Good to know</div>
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className="as-faq-list">
          {FAQS.map((f, i) => (
            <div key={i} className="as-faq-item">
              <button className="as-faq-q" onClick={() => onToggle(i)}>
                {f.q}
                <span className="as-plus">{openIndex === i ? "−" : "+"}</span>
              </button>
              {openIndex === i && (
                <div className="as-faq-a">
                  <p>{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
