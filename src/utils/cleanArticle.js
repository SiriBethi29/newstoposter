const instructionNoise = /(?:here(?:'|’)?s? a sample article|here is a sample|you can paste|paste (?:this|the following)|sample content|article content:|write a (?:social|poster)|generate a poster)/i;
const genericHeading = /^(?:sample article|article|example|news article|sample)$/i;

export function cleanText(value = "") {
  return String(value)
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/^\s{0,3}#{1,6}\s*/gm, "")
    .replace(/\*{1,3}([^*]+)\*{1,3}/g, "$1")
    .replace(/^\s*(?:---+|___+|\*\*\*+)\s*$/gm, "")
    .replace(/\s+/g, " ").trim();
}

export function cleanPosterTitle(title = "", content = "") {
  const cleaned = cleanText(title).replace(/^title\s*:\s*/i, "");
  if (cleaned && !instructionNoise.test(cleaned) && !genericHeading.test(cleaned) && cleaned.length < 115) return cleaned;
  const lines = String(content).split(/\r?\n/).map((line) => cleanText(line)).filter(Boolean);
  const labeled = lines.find((line) => /^(?:title|headline)\s*:/i.test(line));
  if (labeled) {
    const value = labeled.replace(/^(?:title|headline)\s*:\s*/i, "");
    if (!genericHeading.test(value) && !instructionNoise.test(value)) return value;
  }
  const heading = String(content).split(/\r?\n/).find((line) => {
    if (!/^\s{0,3}#{1,6}\s+/.test(line)) return false;
    const candidate = cleanText(line);
    return candidate.length <= 115 && !genericHeading.test(candidate) && !instructionNoise.test(candidate);
  });
  if (heading) return cleanText(heading);
  const candidate = lines.find((line) => line.length >= 12 && line.length <= 110 && !instructionNoise.test(line) && !genericHeading.test(line) && !/^(?:summary|points|key takeaways)\s*:/i.test(line));
  if (candidate) return candidate.replace(/[.!?]+$/, "");
  const sentence = cleanText(content).split(/(?<=[.!?])\s+/)[0];
  return sentence.length > 100 ? `${sentence.slice(0, 97).trim()}…` : sentence || "News update";
}
