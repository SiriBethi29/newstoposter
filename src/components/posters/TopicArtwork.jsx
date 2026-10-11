import React from "react";
import {
  BrainCircuit, Cpu, Shield, HeartPulse, GraduationCap, TrendingUp,
  Briefcase, FlaskConical, Microscope, Rocket, Leaf, Thermometer,
  Trophy, Landmark, Clapperboard, Plane, Utensils, Sparkles, Car, Newspaper
} from "lucide-react";

const ICONS = {
  brain: BrainCircuit,
  technology: Cpu,
  shield: Shield,
  health: HeartPulse,
  education: GraduationCap,
  finance: TrendingUp,
  business: Briefcase,
  science: FlaskConical,
  research: Microscope,
  space: Rocket,
  environment: Leaf,
  climate: Thermometer,
  sports: Trophy,
  politics: Landmark,
  entertainment: Clapperboard,
  travel: Plane,
  food: Utensils,
  lifestyle: Sparkles,
  automotive: Car,
  news: Newspaper
};

function TopicArtwork({ design, variant }) {
  const analysis = design.contentAnalysis || {};
  const Icon = ICONS[analysis.icon] || Newspaper;

  return (
    <div className={`topic-art topic-art-${variant} topic-art-${analysis.topicKey || "general-news"}`} aria-hidden="true">
      <span className="topic-art-ring" />
      <span className="topic-art-ring topic-art-ring-inner" />
      <span className="topic-art-spark topic-art-spark-one" />
      <span className="topic-art-spark topic-art-spark-two" />
      <Icon className="topic-art-icon" strokeWidth={1.35} />
      <span className="topic-art-label">{analysis.topic || "General News"}</span>
      <span className="topic-art-concept">{analysis.concept || "The latest report"}</span>
      {analysis.characteristics?.hasStats && <span className="topic-art-data">{analysis.characteristics.statCount} DATA POINTS</span>}
    </div>
  );
}

export default TopicArtwork;
