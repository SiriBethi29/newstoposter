import React from "react";

function ResearchPoster({ design }) {
  const { points, currentSlide, totalSlides, isCarousel } = design;
  const isCover = !isCarousel || currentSlide === 0;
  const isFacts = isCarousel && currentSlide === 1;
  const isInsight = isCarousel && currentSlide === 2;
  const isTakeaway = isCarousel && currentSlide === totalSlides - 1;

  return (
    <div className="poster-layout research-layout">
      <header className="research-header">
        <span className="research-symbol">N<span>2</span>P</span>
        <span>RESEARCH INSIGHT</span>
      </header>
      <div className="research-meta">
        <span>FIELD NOTE / {design.category || "KNOWLEDGE"}</span>
        <span>{String(currentSlide + 1).padStart(2, "0")}</span>
      </div>
      <h1 className="research-title">{isTakeaway ? "KEY TAKEAWAY" : design.title}</h1>
      {isCover && <p className="research-intro">{design.summary}</p>}
      <div className="research-divider"><span>KEY FINDINGS</span></div>
      {isFacts ? (
        <section className="research-facts-list">
          {points.slice(0, 3).map((point, index) => (
            <article key={`${point}-${index}`}>
              <b>0{index + 1}</b>
              <p>{point}</p>
              <span>FINDING</span>
            </article>
          ))}
        </section>
      ) : isInsight ? (
        <section className="research-analysis">
          <div className="research-analysis-lead">
            <span>INTERPRETATION</span>
            <p>{design.summary}</p>
          </div>
          <div className="research-analysis-grid">
            {points.slice(0, 2).map((point, index) => (
              <article key={`${point}-${index}`}><b>0{index + 1}</b><p>{point}</p></article>
            ))}
          </div>
        </section>
      ) : (
        <section className={`research-findings ${isCover ? "research-findings-cover" : ""}`}>
          {points.slice(0, 3).map((point, index) => (
            <article className="research-finding" key={`${point}-${index}`}>
              <span className="research-finding-number">0{index + 1}</span>
              <p>{point}</p>
              <span className="research-finding-mark">↗</span>
            </article>
          ))}
        </section>
      )}
      {!isCover && !isFacts && !isInsight && (
        <aside className="research-takeaway">
          <span>{isTakeaway ? "CONCLUSION" : "ANALYSIS"}</span>
          <p>{design.summary}</p>
        </aside>
      )}
      <footer className="research-footer">
        <span><small>SOURCE</small>{design.source || "News2Posts"}</span>
        <b>@news2posts</b>
      </footer>
      {isCarousel && <span className="research-slide-count">{currentSlide + 1} / {totalSlides}</span>}
    </div>
  );
}

export default ResearchPoster;
