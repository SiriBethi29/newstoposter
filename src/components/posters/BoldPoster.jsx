import React from "react";
import TopicArtwork from "./TopicArtwork";

function BoldPoster({ design }) {
  const { points, currentSlide, totalSlides, isCarousel } = design;
  const isCover = !isCarousel || currentSlide === 0;
  const isFacts = isCarousel && currentSlide === 1;
  const isInsight = isCarousel && currentSlide === 2;
  const isTakeaway = isCarousel && currentSlide === totalSlides - 1;

  return (
    <div className={`poster-layout bold-layout poster-variant-${design.contentAnalysis?.layoutVariant || "lead-led"} ${isCover ? "bold-cover" : ""}`}>
      <TopicArtwork design={design} variant="bold" />
      <div className="bold-geometry bold-geometry-one" />
      <div className="bold-geometry bold-geometry-two" />
      <header className="bold-header">
        <span>{design.category || "NEWS / IDEAS"}</span>
        <span>{design.platform} · {design.format}</span>
      </header>
      <div className="bold-number">{String(currentSlide + 1).padStart(2, "0")}</div>
      <h1 className="bold-title">
        {isTakeaway ? "REMEMBER THIS." : design.title}
      </h1>
      <div className="bold-cutline" />
      <section className="bold-takeaway">
        <span>{isTakeaway ? "THE CONCLUSION" : "KEY TAKEAWAY"}</span>
        <p>{isCover ? (points[0] || design.summary) : design.summary}</p>
      </section>
      {isFacts && (
        <div className="bold-fact">
          <span>0{currentSlide + 1}</span>
          <p>{points[0] || design.summary}</p>
        </div>
      )}
      {isInsight && (
        <section className="bold-analysis">
          <span className="bold-analysis-label">THE IMPLICATION</span>
          <p>{design.summary}</p>
          <div>
            {points.slice(0, 2).map((point, index) => (
              <article key={`${point}-${index}`}><b>0{index + 1}</b>{point}</article>
            ))}
          </div>
        </section>
      )}
      <footer className="bold-footer">
        <span>{design.source || "News2Posts"}</span>
        <b>@news2posts</b>
      </footer>
      {isCarousel && <span className="bold-slide-count">{currentSlide + 1} / {totalSlides}</span>}
    </div>
  );
}

export default BoldPoster;
