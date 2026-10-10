import React from "react";

function NewsPoster({ design }) {
  const { points, currentSlide, totalSlides, isCarousel } = design;
  const isCover = !isCarousel || currentSlide === 0;
  const isInsight = isCarousel && currentSlide === 2;
  const isTakeaway = isCarousel && currentSlide === totalSlides - 1;

  return (
    <div className="poster-layout news-layout">
      <header className="news-masthead">
        <span className="news-wordmark">NEWS2POSTS</span>
        <span className="news-edition">{design.platform} EDITION</span>
      </header>
      <div className="news-heavy-rule" />
      <div className="news-section-label">
        <span>{isTakeaway ? "THE BOTTOM LINE" : isCover ? "LATEST / EXPLAINED" : "KEY FACTS"}</span>
        <span>NO. {String(currentSlide + 1).padStart(2, "0")}</span>
      </div>
      <h1 className="news-headline">{isTakeaway ? "THE BIG PICTURE" : design.title}</h1>
      {isCover && <p className="news-deck">{design.summary}</p>}
      <div className="news-thin-rule" />
      {isInsight ? (
        <section className="news-analysis-grid">
          <div className="news-analysis-lead">
            <span>ANALYSIS</span>
            <p>{design.summary}</p>
          </div>
          <div className="news-analysis-points">
            {points.slice(0, 3).map((point, index) => (
              <p key={`${point}-${index}`}><b>0{index + 1}</b>{point}</p>
            ))}
          </div>
        </section>
      ) : (
        <>
          <div className="news-facts-heading">{isTakeaway ? "WHAT TO REMEMBER" : "KEY FACTS"}</div>
          <section className="news-facts">
            {points.slice(0, 3).map((point, index) => (
              <article className="news-fact" key={`${point}-${index}`}>
                <b>0{index + 1}</b>
                <p>{point}</p>
              </article>
            ))}
          </section>
          {!isCover && <p className="news-summary-column">{design.summary}</p>}
        </>
      )}
      <div className="news-heavy-rule news-bottom-rule" />
      <footer className="news-footer">
        <span><small>SOURCE</small>{design.source || "News2Posts"}</span>
        <span><small>DATE</small>{design.created_at ? new Date(design.created_at).toLocaleDateString() : design.category || "TODAY"}</span>
      </footer>
      {isCarousel && <span className="news-slide-count">PAGE {currentSlide + 1} / {totalSlides}</span>}
    </div>
  );
}

export default NewsPoster;
