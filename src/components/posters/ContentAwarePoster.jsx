import React, { useState } from "react";
import { getContentVisual } from "../../utils/contentVisuals";

function ContentAwarePoster({ design }) {
  const [imageFailed, setImageFailed] = useState(false);
  const visual = getContentVisual(design.contentCategory);
  const points = (Array.isArray(design.points) ? design.points : []).slice(0, 3);
  const title = design.title || "News update";
  const shortTitle = title.length > 112 ? `${title.slice(0, 109).trim()}…` : title;
  const treatment = `visual-${visual.treatment}`;
  const layout = design.posterLayout || visual.layout;

  return (
    <article className={`aware-poster aware-layout-${layout} aware-${String(design.style || "modern").toLowerCase()} ${treatment} ${design.isCarousel ? `aware-carousel aware-slide-${design.currentSlide}` : ""}`}>
      <header className="aware-header">
        <span className="aware-logo"><b>N2P</b><i>NEWS2POSTS</i></span>
        <span className="aware-badge">{visual.label}</span>
      </header>
      <div className="aware-title-block">
        <span className="aware-kicker">{design.platform || "SOCIAL"} / {design.format || "NEWS BRIEFING"}</span>
        <h1>{shortTitle}</h1>
      </div>
      <figure className={`aware-visual ${imageFailed ? "is-fallback" : ""}`} data-category={design.contentCategory}>
        {!imageFailed && <img src={visual.image} alt={`${visual.label.toLowerCase()} editorial visual`} crossOrigin="anonymous" onError={() => setImageFailed(true)} style={{ objectPosition: visual.position }} />}
        <div className="aware-image-shade" />
        {imageFailed && <div className="aware-fallback-art"><span>{visual.label}</span><b>{design.contentCategory?.slice(0, 2).toUpperCase() || "N2"}</b></div>}
        <figcaption>{visual.label} <span>•</span> NEWS2POSTS</figcaption>
        {design.summary && <p className="aware-summary">{design.summary}</p>}
        {design.statistic && <strong className="aware-statistic">{design.statistic}</strong>}
      </figure>
      <section className="aware-facts">
        <div className="aware-facts-heading"><span>KEY POINTS</span><i>{design.currentSlide + 1}/{design.totalSlides}</i></div>
        {points.map((point, index) => (
          <div className="aware-point" key={`${point}-${index}`}><b>{String(index + 1).padStart(2, "0")}</b><p>{point}</p></div>
        ))}
      </section>
      <footer className="aware-footer"><span><small>SOURCE</small>{design.source || "News2Posts"}</span><b>@NEWS2POSTS</b></footer>
    </article>
  );
}

export default ContentAwarePoster;
