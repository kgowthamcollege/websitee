import React from "react";
import { NAV_LINKS, CATEGORIES } from "../data/constants";

export default function Sidebar({ open, onClose, onNavClick, onCategoryClick }) {
  return (
    <>
      {open && <div className="as-sidebar-overlay" onClick={onClose} />}
      <div className={`as-sidebar-panel ${open ? "open" : ""}`}>
        <div className="as-sb-header">
          <div className="as-sb-logo-icon">A</div>
          <div className="as-sb-logo-text">
            Amman Studios
            <small>Personalized Gifts</small>
          </div>
        </div>
        <nav className="as-sb-nav">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href="#"
              className="as-sb-link"
              onClick={(e) => {
                e.preventDefault();
                onNavClick(l.id);
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="as-sb-divider" />
        <div className="as-sb-section-label">Categories</div>
        {CATEGORIES.map((c) => (
          <a
            key={c}
            href="#"
            className="as-sb-cat-link"
            onClick={(e) => {
              e.preventDefault();
              onCategoryClick(c);
            }}
          >
            <span className="as-sb-cat-dot" /> {c}
          </a>
        ))}
        <div className="as-sb-footer">
          <div className="as-sb-contact">+91 86820 01729 · Mon–Sat 10am–7:30pm</div>
        </div>
      </div>
    </>
  );
}
