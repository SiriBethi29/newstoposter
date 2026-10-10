import React from "react";
import ModernPoster from "./posters/ModernPoster";
import MinimalPoster from "./posters/MinimalPoster";
import NewsPoster from "./posters/NewsPoster";
import ResearchPoster from "./posters/ResearchPoster";
import BoldPoster from "./posters/BoldPoster";

const themes = {
  purple: {
    background: "linear-gradient(145deg, #17122b 0%, #3c2473 50%, #7c3aed 100%)",
    accent: "#7c3aed",
    accentText: "#ffffff",
    soft: "#ede9fe"
  },
  blue: {
    background: "linear-gradient(145deg, #071a32 0%, #0e4c81 50%, #2563eb 100%)",
    accent: "#2563eb",
    accentText: "#ffffff",
    soft: "#dbeafe"
  },
  green: {
    background: "linear-gradient(145deg, #071f18 0%, #12634b 50%, #16a34a 100%)",
    accent: "#16a34a",
    accentText: "#102018",
    soft: "#dcfce7"
  },
  orange: {
    background: "linear-gradient(145deg, #32150a 0%, #9a3412 50%, #f97316 100%)",
    accent: "#ea580c",
    accentText: "#20130d",
    soft: "#ffedd5"
  },
  dark: {
    background: "linear-gradient(145deg, #09090b 0%, #18181b 50%, #27272a 100%)",
    accent: "#d4d4d8",
    accentText: "#18181b",
    soft: "#f4f4f5"
  }
};

const renderers = {
  modern: ModernPoster,
  minimal: MinimalPoster,
  news: NewsPoster,
  research: ResearchPoster,
  bold: BoldPoster
};

function PostDesign({ design, slide = 0, designRef, preview = false }) {
  const styleName = String(design.style || "Modern").toLowerCase();
  const Renderer = renderers[styleName] || ModernPoster;
  const slides = design.slides?.length
    ? design.slides
    : [{
        title: design.title,
        summary: design.summary,
        points: design.points
      }];
  const currentSlide = slides[slide] || slides[0];
  const theme = themes[String(design.theme || "purple").toLowerCase()] || themes.purple;
  const posterDesign = {
    ...design,
    title: currentSlide.title || design.title,
    summary: currentSlide.summary || currentSlide.content || design.summary,
    points: currentSlide.points || design.points || [],
    currentSlide: slide,
    totalSlides: slides.length,
    isCarousel: design.format?.toLowerCase() === "carousel" || slides.length > 1
  };

  return (
    <div
      ref={designRef}
      className={`poster poster-${styleName} poster-design-${styleName}`}
      style={{
        "--poster-background": theme.background,
        "--poster-accent": theme.accent,
        "--poster-soft": theme.soft,
        "--poster-accent-contrast": theme.accentText
      }}
      data-poster-style={styleName}
      data-preview={preview ? "true" : undefined}
    >
      <Renderer design={posterDesign} />
    </div>
  );
}

export default PostDesign;
