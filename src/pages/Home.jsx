import React from "react";

export default function Home({ onExploreClick }) {
  return (
    <header id="section-home" className="as-hero">
      <video
        className="as-hero-video"
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/photo-mug.jpeg"
      >
        <source src="/assets/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="as-hero-overlay" />
      <div className="as-hero-cta-wrap">
        <a
          href="#"
          className="as-hero-explore-btn"
          onClick={(e) => {
            e.preventDefault();
            onExploreClick();
          }}
        >
          <span>🎁</span> Explore Products <span>→</span>
        </a>
      </div>
      <div className="as-scroll-cue">Scroll down</div>
    </header>
  );
}
