import React from "react";
import { PROCESS_STEPS, TESTIMONIALS } from "../data/constants";

export default function Process() {
  return (
    <>
      <section id="section-process" className="as-section as-section-dark">
        <div className="as-wrap">
          <div className="as-section-head">
            <div className="as-eyebrow">How it works</div>
            <h2>From Photo to Package</h2>
          </div>
          <div className="as-process-grid">
            {PROCESS_STEPS.map(([num, title, body]) => (
              <div key={num} className="as-process-card">
                <div className="as-process-num">{num}</div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="as-section">
        <div className="as-wrap">
          <div className="as-section-head">
            <div className="as-eyebrow">Happy customers</div>
            <h2>What People Say</h2>
          </div>
          <div className="as-testi-grid">
            {TESTIMONIALS.map(([quote, name]) => (
              <div key={name} className="as-testi-card">
                <p>"{quote}"</p>
                <div className="as-testi-name">— {name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
