import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Image,
  Newspaper,
  Download,
  Layers,
  Zap
} from "lucide-react";

function Home() {
  return (
    <main>

      {/* HERO */}
      <section className="hero">

        <div className="hero-badge">
          <Sparkles size={16} />
          AI-powered social content creation
        </div>

        <h1>
          Turn News & Research
          <br />
          Into <span>Ready-to-Post</span> Content
        </h1>

        <p>
          Transform articles, research and news into professional
          social media posters, carousels, threads and reel scripts.
        </p>

        <Link to="/create" className="primary-button hero-button">
          Start Creating
          <ArrowRight size={19} />
        </Link>

        <div className="hero-note">
          Create • Design • Download • Publish
        </div>
      </section>

      {/* FEATURES */}
      <section className="section">

        <div className="section-heading">
          <span>WHY NEWS2POSTS?</span>
          <h2>More than just a content generator.</h2>
          <p>
            We turn information into visually attractive content
            that is ready to publish.
          </p>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">
              <Newspaper />
            </div>

            <h3>Paste Your News</h3>

            <p>
              Add a news article, research content or upload a file.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Sparkles />
            </div>

            <h3>Generate Content</h3>

            <p>
              Convert the information into concise social media content.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Image />
            </div>

            <h3>Get a Real Poster</h3>

            <p>
              Your content becomes a professionally designed poster.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Download />
            </div>

            <h3>Download & Publish</h3>

            <p>
              Download PNG or JPG and directly upload it to social media.
            </p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">

        <div className="section-heading">
          <span>HOW IT WORKS</span>
          <h2>From article to poster in seconds.</h2>
        </div>

        <div className="steps">

          <div className="step">
            <div className="step-number">01</div>
            <h3>Input</h3>
            <p>
              Paste news, research or upload content.
            </p>
          </div>

          <div className="step-line"></div>

          <div className="step">
            <div className="step-number">02</div>
            <h3>Customize</h3>
            <p>
              Choose platform, style, tone and theme.
            </p>
          </div>

          <div className="step-line"></div>

          <div className="step">
            <div className="step-number">03</div>
            <h3>Generate</h3>
            <p>
              News2Posts creates your poster.
            </p>
          </div>

          <div className="step-line"></div>

          <div className="step">
            <div className="step-number">04</div>
            <h3>Publish</h3>
            <p>
              Download and directly post it online.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bottom-cta">

        <Layers size={35} />

        <h2>
          Your next post starts with a story.
        </h2>

        <p>
          Turn that story into a professional visual post.
        </p>

        <Link to="/create" className="primary-button">
          Create Your Poster
          <Zap size={18} />
        </Link>

      </section>

    </main>
  );
}

export default Home;