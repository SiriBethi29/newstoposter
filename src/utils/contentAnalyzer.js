const CATEGORIES = [
  ["ai", "Artificial Intelligence", ["artificial intelligence", "generative ai", "machine learning", "neural network", "chatbot", "large language model", "llm", " ai "], "ai"],
  ["education", "Education", ["education", "student", "school", "teacher", "classroom", "university", "learning", "exam"], "education"],
  ["healthcare", "Healthcare", ["healthcare", "hospital", "doctor", "medical", "disease", "patient", "medicine", "cancer", "treatment", "diagnosis"], "healthcare"],
  ["climate", "Climate", ["climate change", "climate", "global warming", "carbon", "pollution", "renewable energy", "emission", "warming"], "climate"],
  ["environment", "Environment", ["environment", "environmental", "ecosystem", "forest", "wildlife", "biodiversity", "glacier", "nature"], "environment"],
  ["finance", "Finance", ["finance", "stock", "stocks", "market", "markets", "investment", "investor", "investors", "banking", "money", "economy", "economic", "rupee", "dollar"], "finance"],
  ["business", "Business", ["business", "company", "companies", "startup", "revenue", "corporate", "industry"], "business"],
  ["startup", "Startup", ["startup", "start-up", "founder", "venture capital", "seed funding", "early-stage company"], "business"],
  ["science", "Science", ["science", "scientific", "experiment", "biology", "physics", "chemistry"], "research"],
  ["research", "Research", ["research", "researcher", "researchers", "study", "scientist", "scientists", "experiment", "discovery", "laboratory", "findings", "journal"], "research"],
  ["space", "Space", ["space", "nasa", "rocket", "satellite", "mars", "moon", "lunar", "astronaut", "galaxy", "chandrayaan", "orbit"], "space"],
  ["sports", "Sports", ["sports", "football", "cricket", "tennis", "olympics", "athlete", "match", "tournament", "championship", "stadium"], "sports"],
  ["cybersecurity", "Cybersecurity", ["cybersecurity", "cyber attack", "cyber attacks", "cyberattack", "hacking", "hacker", "malware", "ransomware", "password", "security", "phishing"], "cybersecurity"],
  ["politics", "Politics", ["politics", "election", "government", "parliament", "president", "policy"], "politics"],
  ["entertainment", "Entertainment", ["entertainment", "film", "movie", "music", "actor", "streaming"], "entertainment"],
  ["travel", "Travel", ["travel", "tourism", "tourist", "destination", "flight", "hotel"], "travel"],
  ["food", "Food", ["food", "restaurant", "cuisine", "recipe", "cooking", "chef"], "food"],
  ["culture", "Culture", ["culture", "cultural", "heritage", "language", "tradition", "museum", "literature"], "culture"],
  ["technology", "Technology", ["technology", "software", "smartphone", "computer", "digital", "internet", "innovation", "robotics"], "technology"]
];

const FIELD_WEIGHTS = { title: 4, summary: 2, points: 1.5, content: 1 };
const NORMALIZE = (value) => ` ${String(value || "").toLowerCase().replace(/[^a-z0-9+#]+/g, " ").replace(/\s+/g, " ").trim()} `;
const LAYOUTS = {
  ai: "split", space: "fullBleed", cybersecurity: "fullBleed", sports: "split",
  research: "infographic", science: "infographic", finance: "split", business: "editorial",
  startup: "split", politics: "editorial", education: "imageHero", healthcare: "imageHero",
  climate: "imageHero", environment: "imageHero", technology: "imageHero", culture: "editorial",
  entertainment: "fullBleed", travel: "imageHero", food: "imageHero", general: "editorial"
};

export function analyzeContent({ title = "", summary = "", points = [], content = "" } = {}) {
  const fields = {
    title: NORMALIZE(title), summary: NORMALIZE(summary),
    points: NORMALIZE(Array.isArray(points) ? points.join(" ") : points), content: NORMALIZE(content)
  };
  const ranked = CATEGORIES.map(([key, category, terms, visual], order) => {
    let score = 0;
    const hits = new Set();
    for (const term of terms) {
      for (const [field, text] of Object.entries(fields)) {
        if (text.includes(NORMALIZE(term))) {
          score += FIELD_WEIGHTS[field];
          if (FIELD_WEIGHTS[field] >= 1) hits.add(term.trim());
        }
      }
    }
    return { key, category, terms, visual, order, score, keywords: [...hits] };
  }).sort((a, b) => b.score - a.score || a.order - b.order);
  const winner = ranked[0];
  const confidence = winner?.score ? Math.min(1, winner.score / 12) : 0;
  const category = confidence >= 0.075 ? winner : { key: "general", category: "General", visual: "news", keywords: [] };
  const visualKeywords = [...new Set([...(category.terms || []), ...(winner?.key === category.key ? winner?.keywords || [] : [])])].slice(0, 8);
  return {
    category: category.category,
    categoryKey: category.key,
    confidence,
    keywords: category.keywords || [],
    visualKeywords,
    suggestedLayout: LAYOUTS[category.key] || "editorial",
    suggestedVisual: category.visual
  };
}

export default analyzeContent;
