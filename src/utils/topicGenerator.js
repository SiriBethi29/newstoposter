import { analyzeContent } from "./contentAnalyzer.js";
import { cleanText } from "./cleanArticle.js";

// Provider boundary: a future research/LLM provider can replace this deterministic local draft.
export function generateTopicContent(topicInput, options = {}) {
  const topic = cleanText(topicInput).replace(/[.!?]+$/, "");
  if (!topic) throw new Error("Enter a topic to get started.");
  const analysis = analyzeContent({ title: topic, content: topic });
  const categorySlug = analysis.categoryKey.replace(/[^a-z0-9]+/g, "");
  const headline = /^(?:how|why|what|when|where|who)\b/i.test(topic) ? topic : `Understanding ${topic}`;
  const title = headline.length > 82 ? `${headline.slice(0, 79).trim()}…` : headline;
  const summary = `A concise explainer on ${topic}. This draft frames the subject and highlights useful angles to explore; it does not include live research.`;
  const points = [
    `Core idea: clarify the concepts and technologies behind ${topic}.`,
    "Why it matters: connect the topic to its audience and practical context.",
    "What to explore next: compare use cases, trade-offs, and open questions."
  ];
  const tags = [...new Set([categorySlug, ...analysis.visualKeywords.slice(0, 2).map((word) => word.replace(/\s+/g, ""))])]
    .filter(Boolean).slice(0, 3).map((word) => `#${word}`);
  const caption = `${title}\n\n${summary}\n\n${points.map((point, index) => `${index + 1}. ${point}`).join("\n")}\n\n${tags.join(" ")}`;
  const slides = [
    { title, summary, points: [] },
    { title: "The core idea", summary: points[0], points: [points[0]] },
    { title: "Why it matters", summary: points[1], points: [points[1]] },
    { title: "A useful takeaway", summary: points[2], points: [points[2]] }
  ];
  return {
    id: String(Date.now()), title, summary, points, caption, hashtags: tags,
    category: analysis.category, visualKeywords: analysis.visualKeywords,
    suggestedLayout: analysis.suggestedLayout, selectedVisual: analysis.suggestedVisual,
    source: "Topic draft (no live research)", originalContent: topic,
    platform: options.platform || "Instagram", format: options.format || "Social Post",
    tone: options.tone || "Professional", style: options.style || "Modern", theme: options.theme || "purple",
    slides: options.format === "Carousel" ? slides : [slides[0]]
  };
}
