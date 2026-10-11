import React from "react";
import TopicArtwork from "./TopicArtwork";

function MinimalPoster({ design }) {
  const { points, currentSlide, totalSlides, isCarousel } = design;
  const isCover = !isCarousel || currentSlide === 0;
  const isFacts = isCarousel && currentSlide === 1;
  const isInsight = isCarousel && currentSlide === 2;
  const isTakeaway = isCarousel && currentSlide === totalSlides - 1;
  const insight = points[Math.min(currentSlide, points.length - 1)] || design.summary;

  return (
    <div className={`poster-layout minimal-layout poster-variant-${design.contentAnalysis?.layoutVariant || "lead-led"}`}>
      <TopicArtwork design={design} variant="minimal" />
      <header className="minimal-header">
        <span>{design.category || "EDITORIAL / INSIGHT"}</span>
        <span>{design.platform} / {design.format}</span>
      </header>
      <div className="minimal-number">{String(currentSlide + 1).padStart(2, "0")}</div>
      <h1 className="minimal-title">{isTakeaway ? "A CLOSER LOOK" : design.title}</h1>
      <div className="minimal-rule" />
      {isFacts ? (
        <section className="minimal-carousel-facts">
          <span>KEY FACTS</span>
          {points.slice(0, 3).map((point, index) => (
            <article key={`${point}-${index}`}><b>0{index + 1}</b><p>{point}</p></article>
          ))}
        </section>
      ) : isInsight ? (
        <section className="minimal-carousel-analysis">
          <p>{design.summary}</p>
          <div>
            <span>THE INSIGHT</span>
            <strong>{insight}</strong>
          </div>
          {points.slice(1, 3).map((point, index) => (
            <p className="minimal-analysis-point" key={`${point}-${index}`}>{point}</p>
          ))}
        </section>
      ) : (
        <>
          <p className="minimal-summary">{design.summary}</p>
          <section className="minimal-insight">
            <span>{isTakeaway ? "CONCLUSION" : "KEY INSIGHT"}</span>
            <p>{isTakeaway ? (points.at(-1) || insight) : insight}</p>
          </section>
        </>
      )}
      {!isTakeaway && !isFacts && !isInsight && points.length > 1 && (
        <div className="minimal-secondary-points">
          {points.slice(0, 3).map((point, index) => (
            <p key={`${point}-${index}`}><span>0{index + 1}</span>{point}</p>
          ))}
        </div>
      )}
      <div className="minimal-bottom-rule" />
      <footer className="minimal-footer">
        <span><small>SOURCE</small>{design.source || "News2Posts"}</span>
        <b>@news2posts</b>
      </footer>
      {isCarousel && <span className="minimal-slide-count">{currentSlide + 1} / {totalSlides}</span>}
    </div>
  );
}

export default MinimalPoster;
