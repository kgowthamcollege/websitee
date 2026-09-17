import React from "react";

export default function Footer({ onLogoClick }) {
  return (
    <footer className="as-footer">
      <div className="as-logo" onClick={onLogoClick}>Amman Studios Gifts</div>
      <div>Pazhavanthangal, Chennai · +91 86820 01729 · © 2026 Amman Studios</div>
      <div style={{ marginTop: 10, fontSize: 13, letterSpacing: "0.04em", opacity: 0.8 }}>
        <a href="https://asteroic.com" target="_blank" rel="noreferrer" style={{ color: "#C99A47", textDecoration: "none" }}>
          powered by asteroic
        </a>
      </div>
    </footer>
  );
}
