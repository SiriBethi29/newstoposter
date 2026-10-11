import React from "react";
import ContentAwarePoster from "./posters/ContentAwarePoster";
import { analyzeContent } from "../utils/contentAnalyzer";
import { cleanPosterTitle, cleanText } from "../utils/cleanArticle";

const themes = {
  purple: { background: "linear-gradient(145deg, #17122b 0%, #3c2473 50%, #7c3aed 100%)", accent: "#7c3aed", accentText: "#ffffff", soft: "#ede9fe", surface: "#f5f0ff" },
  blue: { background: "linear-gradient(145deg, #071a32 0%, #0e4c81 50%, #2563eb 100%)", accent: "#2563eb", accentText: "#ffffff", soft: "#dbeafe", surface: "#eff6ff" },
  green: { background: "linear-gradient(145deg, #071f18 0%, #12634b 50%, #16a34a 100%)", accent: "#16a34a", accentText: "#102018", soft: "#dcfce7", surface: "#eff8f1" },
  orange: { background: "linear-gradient(145deg, #32150a 0%, #9a3412 50%, #f97316 100%)", accent: "#ea580c", accentText: "#20130d", soft: "#ffedd5", surface: "#fff4e8" },
  dark: { background: "linear-gradient(145deg, #09090b 0%, #18181b 50%, #27272a 100%)", accent: "#d4d4d8", accentText: "#18181b", soft: "#f4f4f5", surface: "#e4e4e7" }
};

function PostDesign({ design, selectedStyle, slide = 0, designRef, preview = false }) {
  const styleName = String(selectedStyle || design.style || "Modern").trim().toLowerCase();
  const slides = design.slides?.length ? design.slides : [{ title: design.title, summary: design.summary, points: design.points }];
  const currentSlide = slides[slide] || slides[0];
  const theme = themes[String(design.theme || "purple").toLowerCase()] || themes.purple;
  const articleContent = cleanText(design.originalContent || design.original_content || design.content || "");
  const title = cleanPosterTitle(currentSlide.title || design.title, articleContent);
  const summary = cleanText(currentSlide.summary || currentSlide.content || design.summary);
  const points = (currentSlide.points || design.points || []).map(cleanText).filter(Boolean);
  const contentAnalysis = analyzeContent({ title, summary, points, content: articleContent });
  const statistic = design.statistic || [articleContent, title, summary, ...points].join(" ").match(/(?:\$\s?\d[\d,.]*(?:\s?(?:%|percent|million|billion|trillion|years?|months?|days?))?|\b\d[\d,.]*\s?(?:%|percent|million|billion|trillion|years?|months?|days?)\b)/i)?.[0] || "";
  const posterDesign = {
    ...design,
    style: styleName,
    category: contentAnalysis.category.toUpperCase(),
    contentCategory: contentAnalysis.categoryKey,
    contentAnalysis,
    title,
    summary,
    points,
    posterLayout: design.posterLayout || (slides.length > 1 ? ["imageHero", "infographic", "split", "editorial"][slide] || contentAnalysis.suggestedLayout : contentAnalysis.suggestedLayout),
    statistic,
    currentSlide: slide,
    totalSlides: slides.length,
    isCarousel: design.format?.toLowerCase() === "carousel" || slides.length > 1
  };

  return (
    <div
      ref={designRef}
      className={`poster poster-${styleName} poster-design-${styleName} poster-topic-${contentAnalysis.categoryKey} poster-variant-${styleName}`}
      style={{
        "--poster-background": theme.background,
        "--poster-accent": theme.accent,
        "--poster-soft": theme.soft,
        "--poster-surface": theme.surface,
        "--poster-accent-contrast": theme.accentText
      }}
      data-poster-style={styleName}
      data-poster-topic={contentAnalysis.categoryKey}
      data-content-confidence={contentAnalysis.confidence}
      data-preview={preview ? "true" : undefined}
    >
      <ContentAwarePoster key={`${contentAnalysis.categoryKey}-${slide}`} design={posterDesign} />
    </div>
  );
}

export default PostDesign;
