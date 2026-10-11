import React from "react";
import TopicArtwork from "./TopicArtwork";

function ModernPoster({ design }) {
  const { points, currentSlide, totalSlides, isCarousel } = design;
  const isCover = !isCarousel || currentSlide === 0;
  const isFacts = isCarousel && currentSlide === 1;
  const isInsight = isCarousel && currentSlide === 2;
  const isTakeaway = isCarousel && currentSlide === totalSlides - 1;

  return (
    <div className={`poster-layout modern-layout poster-variant-${design.contentAnalysis?.layoutVariant || "lead-led"} ${isCover ? "modern-cover" : ""}`}>
      <TopicArtwork design={design} variant="modern" />
      <header className="modern-header">
        <span className="modern-brand">N2P</span>
        <span className="modern-category">{design.category || "NEWS & RESEARCH"}</span>
      </header>

      <div className="modern-meta">{design.platform} · {design.format}</div>

      {isTakeaway ? (
        <section className="modern-takeaway">
          <span className="modern-kicker">THE TAKEAWAY</span>
          <h1>{design.title}</h1>
          <div className="modern-summary-card">{design.summary}</div>
          <div className="modern-takeaway-points">
            {points.slice(0, 2).map((point, index) => (
              <p key={`${point}-${index}`}><b>0{index + 1}</b>{point}</p>
            ))}
          </div>
        </section>
      ) : (
        <>
          <h1 className={`modern-title ${isCover ? "" : "modern-secondary-title"}`}>
            {design.title}
          </h1>
          {isCover ? (
            <section className="modern-summary-card">
              <span className="modern-kicker">IN BRIEF</span>
              <p>{design.summary}</p>
            </section>
          ) : isFacts ? (
            <section className="modern-carousel-facts">
              <span className="modern-kicker">THE FACTS</span>
              {points.slice(0, 3).map((point, index) => (
                <article key={`${point}-${index}`}>
                  <b>0{index + 1}</b>
                  <p>{point}</p>
                </article>
              ))}
            </section>
          ) : isInsight ? (
            <section className="modern-carousel-insight">
              <div className="modern-insight-card">
                <span className="modern-kicker">WHAT IT MEANS</span>
                <p>{design.summary}</p>
              </div>
              <div className="modern-insight-stack">
                {points.slice(0, 2).map((point, index) => (
                  <p key={`${point}-${index}`}><b>0{index + 1}</b>{point}</p>
                ))}
              </div>
            </section>
          ) : (
            <section className="modern-insight-split">
              <div className="modern-insight-tag">INSIGHT <b>0{currentSlide + 1}</b></div>
              <p>{design.summary}</p>
            </section>
          )}
          {!isFacts && !isInsight && <section className={`modern-points ${isCover ? "" : "modern-point-cards"}`}>
            {points.slice(0, isCover ? 3 : 4).map((point, index) => (
              <div className="modern-point" key={`${point}-${index}`}>
                <span>0{index + 1}</span>
                <p>{point}</p>
              </div>
            ))}
          </section>}
        </>
      )}

      <footer className="modern-footer">
        <span><small>SOURCE</small>{design.source || "News2Posts"}</span>
        <b>@news2posts</b>
      </footer>
      {isCarousel && <span className="modern-slide-count">{currentSlide + 1} / {totalSlides}</span>}
    </div>
  );
}

export default ModernPoster;
