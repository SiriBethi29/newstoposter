const TOPICS = [
  { name: "Artificial Intelligence", icon: "brain", concept: "Learning machines", keywords: { "artificial intelligence": 7, "machine learning": 7, "generative ai": 8, "neural network": 7, "large language model": 7, " llm ": 6, chatbot: 5, algorithm: 3, "deep learning": 6, "computer vision": 5, "natural language processing": 6, " ai ": 4 } },
  { name: "Cybersecurity", icon: "shield", concept: "Digital defense", keywords: { cybersecurity: 8, cyberattack: 8, ransomware: 8, phishing: 6, malware: 6, encryption: 5, "data breach": 7, hacker: 5, firewall: 4, "zero-day": 6 } },
  { name: "Healthcare", icon: "health", concept: "Health & care", keywords: { healthcare: 8, hospital: 6, patient: 5, doctor: 5, physician: 5, clinical: 5, treatment: 5, diagnosis: 5, disease: 4, medical: 4, vaccine: 5, therapy: 4, nursing: 4 } },
  { name: "Education", icon: "education", concept: "Learning systems", keywords: { education: 8, classroom: 6, student: 4, teacher: 5, school: 4, university: 5, curriculum: 5, learning: 3, literacy: 4, "higher education": 6 } },
  { name: "Finance", icon: "finance", concept: "Markets & capital", keywords: { finance: 7, financial: 6, stock: 5, stocks: 5, investment: 6, investor: 5, banking: 6, bank: 4, market: 4, markets: 4, inflation: 5, cryptocurrency: 6, bitcoin: 6, interest: 2, economy: 3 } },
  { name: "Business", icon: "business", concept: "Enterprise & work", keywords: { business: 7, company: 4, companies: 4, startup: 6, entrepreneur: 5, revenue: 5, commerce: 5, corporate: 5, workplace: 4, leadership: 4, retail: 4, industry: 3 } },
  { name: "Science", icon: "science", concept: "Scientific discovery", keywords: { science: 6, scientific: 6, experiment: 5, laboratory: 5, physics: 5, chemistry: 5, biology: 5, genome: 5, particle: 4, discovery: 3 } },
  { name: "Research", icon: "research", concept: "Evidence & findings", keywords: { research: 7, study: 5, studies: 5, researchers: 5, researcher: 5, findings: 4, dataset: 4, "peer-reviewed": 6, survey: 4, evidence: 3, analysis: 2, paper: 2 } },
  { name: "Space", icon: "space", concept: "Beyond Earth", keywords: { space: 6, nasa: 7, astronaut: 7, satellite: 5, orbit: 5, planet: 5, lunar: 5, moon: 4, mars: 5, spacecraft: 6, telescope: 4, galaxy: 5, rocket: 4 } },
  { name: "Climate", icon: "climate", concept: "A changing climate", keywords: { climate: 8, "climate change": 9, carbon: 6, emission: 6, emissions: 6, warming: 6, pollution: 5, renewable: 5, "greenhouse gas": 7, drought: 4, wildfire: 4, "sea level": 5 } },
  { name: "Environment", icon: "environment", concept: "Living ecosystems", keywords: { environment: 7, environmental: 6, ecosystem: 6, biodiversity: 7, conservation: 6, wildlife: 5, forest: 4, ocean: 4, habitat: 4, nature: 3, sustainability: 4, renewable: 3 } },
  { name: "Sports", icon: "sports", concept: "The competition", keywords: { sports: 7, football: 6, soccer: 6, basketball: 6, cricket: 6, tennis: 5, athlete: 5, tournament: 5, championship: 6, league: 4, match: 3, olympics: 6, goal: 2 } },
  { name: "Politics", icon: "politics", concept: "Public affairs", keywords: { politics: 7, political: 6, election: 7, parliament: 6, congress: 5, senator: 5, president: 4, government: 4, policy: 3, legislation: 5, vote: 3, campaign: 4 } },
  { name: "Entertainment", icon: "entertainment", concept: "Culture & screen", keywords: { entertainment: 7, film: 5, movie: 5, cinema: 5, actor: 4, actress: 4, celebrity: 5, streaming: 4, television: 4, music: 4, album: 4, artist: 3, festival: 3 } },
  { name: "Travel", icon: "travel", concept: "Places & journeys", keywords: { travel: 7, tourism: 6, tourist: 5, destination: 5, flight: 4, airline: 5, hotel: 4, vacation: 5, journey: 3, itinerary: 4, airport: 4 } },
  { name: "Food", icon: "food", concept: "Food & culture", keywords: { food: 6, restaurant: 6, cuisine: 5, recipe: 5, cooking: 4, chef: 4, nutrition: 5, agriculture: 4, farming: 4, ingredient: 3, meal: 3 } },
  { name: "Automotive", icon: "automotive", concept: "The future of mobility", keywords: { automotive: 7, automobile: 6, vehicle: 4, car: 4, cars: 4, "electric vehicle": 7, ev: 3, battery: 3, "self-driving": 6, automaker: 5, mobility: 3 } },
  { name: "Lifestyle", icon: "lifestyle", concept: "Everyday life", keywords: { lifestyle: 7, wellness: 5, fashion: 5, fitness: 4, home: 2, sleep: 3, relationship: 3, relationships: 3, wellbeing: 5, "mental health": 5, habits: 3 } },
  { name: "Technology", icon: "technology", concept: "Technology in motion", keywords: { technology: 6, tech: 5, software: 4, hardware: 4, device: 3, digital: 2, smartphone: 5, internet: 3, app: 2, computing: 4, robotics: 5, innovation: 2 } },
  { name: "General News", icon: "news", concept: "The latest report", keywords: { news: 1, report: 1, update: 1, latest: 1, announced: 1, announcement: 1 } }
];

const FIELD_WEIGHTS = { title: 5, summary: 3, points: 2, content: 1, source: 0.15 };

function normalize(value) {
  return ` ${String(value || "").toLowerCase().replace(/[^a-z0-9+#.-]+/g, " ").replace(/\s+/g, " ").trim()} `;
}

function scoreField(text, keywords, weight) {
  let score = 0;
  const hits = [];
  Object.entries(keywords).forEach(([phrase, value]) => {
    const query = normalize(phrase);
    const count = text.split(query).length - 1;
    if (count > 0) {
      score += value * weight * Math.min(count, 3);
      hits.push(phrase.trim());
    }
  });
  return { score, hits };
}

export function analyzeContent({ title = "", summary = "", points = [], source = "", content = "" } = {}) {
  const fields = {
    title: normalize(title),
    summary: normalize(summary),
    points: normalize(Array.isArray(points) ? points.join(" ") : points),
    content: normalize(content),
    source: normalize(source)
  };

  const ranked = TOPICS.map((topic, order) => {
    let score = 0;
    const hits = new Set();
    Object.entries(fields).forEach(([field, text]) => {
      const result = scoreField(text, topic.keywords, FIELD_WEIGHTS[field]);
      score += result.score;
      result.hits.forEach((hit) => hits.add(hit));
    });
    return { topic, order, score, hits: [...hits] };
  }).sort((a, b) => b.score - a.score || a.order - b.order);

  const winner = ranked[0]?.score > 0 ? ranked[0] : ranked.find(({ topic }) => topic.name === "General News");
  const allText = Object.values(fields).join(" ");
  const statCount = (allText.match(/\b\d+(?:\.\d+)?\s?(?:%|percent|million|billion|trillion|years?|months?|days?)?\b/g) || []).length;
  const hasQuote = /[“”"]/.test(`${content} ${summary}`);
  const pointCount = Array.isArray(points) ? points.length : 0;
  const layoutVariant = statCount >= 2 ? "data-led" : hasQuote ? "quote-led" : pointCount >= 3 ? "list-led" : "lead-led";
  const titleLength = String(title || "").trim().length;
  const wordCount = allText.trim().split(/\s+/).filter(Boolean).length;
  const topic = winner?.topic || TOPICS[TOPICS.length - 1];

  return {
    topic: topic.name,
    topicKey: topic.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    icon: topic.icon,
    concept: topic.concept,
    matchedKeywords: winner?.hits || [],
    confidence: winner?.score ? Math.min(1, winner.score / 60) : 0,
    layoutVariant,
    characteristics: { hasStats: statCount > 0, statCount, hasQuote, pointCount, titleLength, wordCount, source: Boolean(source) }
  };
}

export default analyzeContent;
