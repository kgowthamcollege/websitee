import React from "react";

export default function Splash({ hidden, onSkip }) {
  if (hidden) return null;
  return (
    <div className="as-splash">
      <div className="as-splash-title">
        <h2>Amman Studios Gifts</h2>
        <p>Your Photos, Turned Into Keepsakes</p>
      </div>
      <button className="as-splash-skip" onClick={onSkip}>
        Enter Store →
      </button>
    </div>
  );
}
