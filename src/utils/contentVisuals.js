const photo = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`;

export const CONTENT_VISUALS = {
  technology: { image: photo("photo-1518770660439-4636190af475"), position: "center", label: "TECHNOLOGY", layout: "imageHero", treatment: "electric" },
  ai: { image: photo("photo-1677442136019-21780ecad995"), position: "center", label: "ARTIFICIAL INTELLIGENCE", layout: "split", treatment: "electric" },
  education: { image: photo("photo-1503676260728-1c00da094a0b"), position: "center", label: "EDUCATION", layout: "clean", treatment: "academic" },
  healthcare: { image: photo("photo-1576091160399-112ba8d25d1d"), position: "center", label: "HEALTHCARE", layout: "clean", treatment: "clinical" },
  climate: { image: photo("photo-1470071459604-3b5ec3a7fe05"), position: "center", label: "CLIMATE", layout: "imageHero", treatment: "earth" },
  environment: { image: photo("photo-1448375240586-882707db888b"), position: "center", label: "ENVIRONMENT", layout: "imageHero", treatment: "earth" },
  finance: { image: photo("photo-1460925895917-afdab827c52f"), position: "center", label: "FINANCE", layout: "split", treatment: "market" },
  business: { image: photo("photo-1486406146926-c627a92ad1ab"), position: "center", label: "BUSINESS", layout: "editorial", treatment: "market" },
  startup: { image: photo("photo-1486406146926-c627a92ad1ab"), position: "center", label: "STARTUP", layout: "split", treatment: "market" },
  science: { image: photo("photo-1532094349884-543bc11b234d"), position: "center", label: "SCIENCE", layout: "infographic", treatment: "academic" },
  research: { image: photo("photo-1581093458791-9d42e3c7d7d1"), position: "center", label: "RESEARCH", layout: "infographic", treatment: "academic" },
  space: { image: photo("photo-1446776811953-b23d57bd21aa"), position: "center", label: "SPACE", layout: "fullBleed", treatment: "cosmic" },
  sports: { image: photo("photo-1574629810360-7efbbe195018"), position: "center", label: "SPORTS", layout: "split", treatment: "motion" },
  cybersecurity: { image: photo("photo-1550751827-4bd374c3f58b"), position: "center", label: "CYBERSECURITY", layout: "fullBleed", treatment: "digital" },
  politics: { image: photo("photo-1529107386315-e1a2ed48a620"), position: "center", label: "POLITICS", layout: "editorial", treatment: "editorial" },
  entertainment: { image: photo("photo-1517604931442-7e0c8ed2963c"), position: "center", label: "ENTERTAINMENT", layout: "imageHero", treatment: "cinematic" },
  travel: { image: photo("photo-1464822759023-fed622ff2c3b"), position: "center", label: "TRAVEL", layout: "imageHero", treatment: "earth" },
  food: { image: photo("photo-1504674900247-0877df9cc836"), position: "center", label: "FOOD", layout: "imageHero", treatment: "warm" },
  culture: { image: photo("photo-1518998053901-5348d3961a04"), position: "center", label: "CULTURE", layout: "editorial", treatment: "editorial" },
  general: { image: photo("photo-1495020689067-958852a7765e"), position: "center", label: "TOP STORY", layout: "editorial", treatment: "editorial" }
};

export function getContentVisual(category) {
  return CONTENT_VISUALS[category] || CONTENT_VISUALS.general;
}
