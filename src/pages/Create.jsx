import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import {
  Upload,
  Link as LinkIcon,
  Sparkles,
  Download,
  Save,
  Copy,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Check
} from "lucide-react";

import PostDesign from "../components/PostDesign";
import {
  extractArticle,
  generateCarousel,
  generateContent,
  savePost,
  uploadFile
} from "../services/api";
import { generateTopicContent } from "../utils/topicGenerator";
import { analyzeContent } from "../utils/contentAnalyzer";
import { getContentVisual } from "../utils/contentVisuals";
import { waitForPosterImages } from "../utils/waitForImages";

const POSTER_STYLES = ["Modern", "Minimal", "News", "Research", "Bold"];
const DEFAULT_POSTER_STYLE = POSTER_STYLES[0];

function Create() {

  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");
  const [inputMode, setInputMode] = useState("content");
  const [variations, setVariations] = useState([]);

  const [url, setUrl] = useState("");

  const [format, setFormat] = useState("Social Post");

  const [platform, setPlatform] = useState("Instagram");

  const [tone, setTone] = useState("Professional");

  const [selectedStyle, setSelectedStyle] = useState(DEFAULT_POSTER_STYLE);

  const [theme, setTheme] = useState("purple");

  const [generated, setGenerated] = useState(false);

  const [slide, setSlide] = useState(0);

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [articleSource, setArticleSource] = useState("");

  const designRef = useRef(null);

  const [design, setDesign] = useState({
    title: "AI IS CHANGING HOW WE FIND INFORMATION",
    summary:
      "Artificial intelligence is transforming how people discover, understand and create information.",
    points: [
      "Faster research and information discovery",
      "Smarter summaries and insights",
      "More accessible content creation"
    ],
    category: "TECHNOLOGY",
    source: "News2Posts",
    platform: "Instagram",
    format: "Social Post",
    style: DEFAULT_POSTER_STYLE,
    theme: "purple",
    slides: [
      {
        title: "AI IS CHANGING HOW WE FIND INFORMATION",
        summary:
          "Artificial intelligence is transforming how people discover, understand and create information.",
        points: [
          "Faster research and information discovery",
          "Smarter summaries and insights",
          "More accessible content creation"
        ]
      }
    ]
  });

  const createDesign = async () => {
    const articleText = inputMode === "topic" ? topic.trim() : content.trim();
    if (!articleText) {
      setError(inputMode === "topic" ? "Enter a topic to get started." : "Enter article content or extract content from a URL or file first.");
      return;
    }

    setError("");
    setMessage("");
    setLoading(inputMode === "topic" ? "Analyzing topic..." : "generate");
    const options = {
      content: articleText,
      format,
      platform,
      tone,
      style: selectedStyle,
      theme: theme.charAt(0).toUpperCase() + theme.slice(1)
    };

    try {
      if (inputMode === "topic") {
        const phases = ["Analyzing topic...", "Creating content...", "Selecting visuals...", "Designing poster..."];
        for (const phase of phases) {
          setLoading(phase);
          await new Promise((resolve) => window.setTimeout(resolve, 350));
        }
        const generatedDesign = generateTopicContent(articleText, options);
        setDesign({ ...generatedDesign, posterLayout: format === "Carousel" ? "" : generatedDesign.suggestedLayout, variation: "" });
        setGenerated(true);
        setSlide(0);
        setSaved(false);
        setVariations([]);
        setMessage("Poster ready!");
        return;
      }
      const result =
        format === "Carousel"
          ? await generateCarousel(options)
          : await generateContent(options);

      const slides = result.slides?.map((item) => ({
        title: item.title,
        summary: item.summary || item.content || "",
        points: item.points || []
      }));
      const firstSlide = slides?.[0];
      const generatedDesign = {
        id: String(Date.now()),
        title: result.title || firstSlide?.title || "",
        summary: result.summary || firstSlide?.summary || "",
        points: result.points || firstSlide?.points || [],
        caption: result.caption || "",
        category: format === "Reel Script" ? "TRENDING" : "NEWS & RESEARCH",
        source: result.source || articleSource || "User Input",
        platform: result.platform || platform,
        format: result.format || format,
        tone: result.tone || tone,
        style: selectedStyle,
        theme,
        originalContent: articleText,
        slides: slides?.length
          ? slides
          : [{
              title: result.title,
              summary: result.summary,
              points: result.points || []
            }]
      };

      setDesign(generatedDesign);
      setGenerated(true);
      setSlide(0);
      setSaved(false);
      setVariations([]);
    } catch (requestError) {
      setError(requestError.message || "Content generation failed. Please try again.");
    } finally {
      setLoading("");
    }
  };

  const generateVariations = () => {
    const options = [
      { id: "image-led", label: "Image-led", layout: "imageHero" },
      { id: "editorial", label: "Editorial", layout: "editorial" },
      { id: "infographic", label: "Infographic", layout: "infographic" }
    ];
    setVariations(options);
    setDesign((current) => ({ ...current, variation: options[0].id, posterLayout: options[0].layout }));
    setSaved(false);
  };

  const selectVariation = (variation) => {
    setDesign((current) => ({ ...current, variation: variation.id, posterLayout: variation.layout }));
    setSaved(false);
  };

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setMessage("");
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (!["txt", "md", "csv"].includes(extension)) {
      setError("Unsupported file. Choose a .txt, .md, or .csv file.");
      return;
    }

    setError("");
    setMessage("");
    setLoading("upload");
    try {
      const result = await uploadFile(file);
      setContent(result.content || "");
      setArticleSource(result.filename || file.name);
    } catch (requestError) {
      setError(requestError.message || "File upload failed. Please try again.");
    } finally {
      setLoading("");
    }
  };

  const handleExtractUrl = async () => {
    setMessage("");
    if (!url.trim()) {
      setError("Enter an article URL to extract.");
      return;
    }

    setError("");
    setMessage("");
    setLoading("extract");
    try {
      const result = await extractArticle(url.trim());
      if (!result.content?.trim()) {
        setError("No article content was found at that URL.");
        return;
      }
      setContent(result.content);
      setArticleSource(result.source || result.url || url.trim());
    } catch (requestError) {
      setError(requestError.message || "Article extraction failed. Check the URL and try again.");
    } finally {
      setLoading("");
    }
  };

  const exportImage = async (type = "png") => {

    if (!designRef.current) return;

    try {
      await waitForPosterImages(designRef.current);
      const canvas = await html2canvas(designRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
        allowTaint: false
      });

      const mime = type === "jpg" ? "image/jpeg" : "image/png";
      const extension = type === "jpg" ? "jpg" : "png";
      const link = document.createElement("a");
      link.download = `news2posts-poster-${Date.now()}.${extension}`;
      link.href = canvas.toDataURL(mime, 0.95);
      link.click();
    } catch {
      setError("The poster could not be downloaded. Please try again.");
    }
  };

  const copyCaption = async () => {

    try {
      await navigator.clipboard.writeText(
        design.caption ||
        `${design.title}\n\n${design.summary}\n\n${design.points
          .map((item, index) => `${index + 1}. ${item}`)
          .join("\n")}`
      );
      setError("");
      setMessage("Caption copied to clipboard.");
    } catch {
      setError("The caption could not be copied to the clipboard.");
      setMessage("");
    }
  };

  const saveDesign = async () => {
    if (!generated) return;

    setError("");
    setMessage("");
    setLoading("save");
    const contentAnalysis = analyzeContent({ title: design.title, summary: design.summary, points: design.points, content: design.originalContent });
    const selectedVisual = design.selectedVisual?.startsWith("http")
      ? design.selectedVisual
      : getContentVisual(design.selectedVisual || contentAnalysis.categoryKey).image;
    const post = {
      id: design.id || String(Date.now()),
      title: design.title,
      summary: design.summary,
      points: design.points || [],
      caption: design.caption || "",
      source: design.source || "User Input",
      platform: design.platform,
      format: design.format,
      tone: design.tone,
      style: design.style,
      theme: design.theme.charAt(0).toUpperCase() + design.theme.slice(1),
      category: contentAnalysis.category,
      visual_keywords: design.visualKeywords || contentAnalysis.visualKeywords,
      selected_visual: selectedVisual,
      layout: design.posterLayout || design.suggestedLayout || contentAnalysis.suggestedLayout,
      variation: design.variation || "",
      original_content: design.originalContent || "",
      created_at: new Date().toISOString(),
      slides: design.slides.map((item, index) => ({
        slide_number: index + 1,
        title: item.title,
        content: item.summary || "",
        points: item.points || []
      }))
    };

    try {
      await savePost(post);
      setSaved(true);
    } catch (requestError) {
      setError(requestError.message || "Could not save this post. Please try again.");
    } finally {
      setLoading("");
    }
  };

  const nextSlide = () => {

    if (
      design.slides &&
      slide < design.slides.length - 1
    ) {
      setSlide(slide + 1);
    }
  };

  const previousSlide = () => {

    if (slide > 0) {
      setSlide(slide - 1);
    }
  };

  return (
    <main className="create-page">

      {/* HEADER */}
      <div className="page-header">

        <div>
          <div className="eyebrow">
            CREATE CONTENT
          </div>

          <h1>
            Turn information into a
            <span> ready-to-post poster.</span>
          </h1>

          <p>
            Add your news or research, customize the design
            and generate a finished social media visual.
          </p>
        </div>

        <div className="size-badge">
          <div>POSTER SIZE</div>
          <strong>1080 × 1350 px</strong>
        </div>

      </div>

      {/* MAIN */}
      <div className="create-layout">

        {/* LEFT */}
        <section className="control-panel">

          <div className="panel-title">
            <Sparkles size={20} />
            Create Your Poster
          </div>

          {error && (
            <div className="form-error" role="alert">
              {error}
            </div>
          )}
          {message && (
            <div className="form-success" role="status">
              {message}
            </div>
          )}

          {/* CONTENT */}
          <div className="form-group">

            <div className="input-mode-tabs" role="tablist" aria-label="Input mode">
              <button type="button" role="tab" aria-selected={inputMode === "content"} className={inputMode === "content" ? "active" : ""} onClick={() => { setInputMode("content"); setError(""); }}>Paste Content</button>
              <button type="button" role="tab" aria-selected={inputMode === "topic"} className={inputMode === "topic" ? "active" : ""} onClick={() => { setInputMode("topic"); setError(""); }}>Enter Topic</button>
            </div>

            <label>{inputMode === "topic" ? "Topic" : "News / Research Content"}</label>

            <textarea
              value={inputMode === "topic" ? topic : content}
              onChange={(e) => inputMode === "topic" ? setTopic(e.target.value) : setContent(e.target.value)}
              placeholder={inputMode === "topic" ? "Example: Latest AI technologies in 2026" : "Paste your news article, research summary or important information here..."}
            />

            {inputMode === "content" && <div className="input-actions">

              <label className="upload-button">

                <Upload size={16} />

                Upload File

                <input
                  type="file"
                  accept=".txt,.md,.csv"
                  onChange={handleFile}
                  disabled={loading === "upload"}
                  hidden
                />

              </label>

              <span>
                {loading === "upload" ? "Uploading..." : "TXT, MD or CSV"}
              </span>

            </div>}

          </div>

          {/* URL */}
          {inputMode === "content" && <div className="form-group">

            <label>
              Article URL
            </label>

            <div className="input-icon">

              <LinkIcon size={17} />

              <input
                value={url}
                onChange={(e) =>
                  setUrl(e.target.value)
                }
                placeholder="https://example.com/news"
              />

            </div>

            <button
              className="secondary-button extract-button"
              onClick={handleExtractUrl}
              disabled={Boolean(loading)}
            >
              {loading === "extract" ? "Extracting..." : "Extract Article"}
            </button>

          </div>}

          {/* FORMAT */}
          <div className="form-group">

            <label>
              Content Format
            </label>

            <div className="choice-grid">

              {[
                "Social Post",
                "Carousel",
                "Thread",
                "Reel Script"
              ].map((item) => (

                <button
                  key={item}
                  className={
                    format === item
                      ? "choice active"
                      : "choice"
                  }
                  onClick={() =>
                    setFormat(item)
                  }
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

          {/* PLATFORM */}
          <div className="form-row">

            <div className="form-group">

              <label>
                Platform
              </label>

              <select
                value={platform}
                onChange={(e) =>
                  setPlatform(e.target.value)
                }
              >
                <option>Instagram</option>
                <option>LinkedIn</option>
                <option>X</option>
                <option>Facebook</option>
              </select>

            </div>

            <div className="form-group">

              <label>
                Tone
              </label>

              <select
                value={tone}
                onChange={(e) =>
                  setTone(e.target.value)
                }
              >
                <option>Professional</option>
                <option>Casual</option>
                <option>Educational</option>
                <option>Newsroom</option>
              </select>

            </div>

          </div>

          {/* STYLE */}
          <div className="form-group">

            <label>
              Poster Style
            </label>

            <div className="choice-grid">

              {POSTER_STYLES.map((item) => (

                <button
                  key={item}
                  className={
                    selectedStyle === item
                      ? "choice active"
                      : "choice"
                  }
                  onClick={() => {
                    setSelectedStyle(item);
                    setDesign((current) => ({
                      ...current,
                      style: item
                    }));
                    setSaved(false);
                  }}
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

          {/* THEME */}
          <div className="form-group">

            <label>
              Theme
            </label>

            <div className="theme-grid">

              {[
                ["purple", "Purple"],
                ["blue", "Blue"],
                ["green", "Green"],
                ["orange", "Orange"],
                ["dark", "Dark"]
              ].map(([value, label]) => (

                <button
                  key={value}
                  className={
                    theme === value
                      ? `theme-button theme-${value} selected`
                      : `theme-button theme-${value}`
                  }
                  onClick={() => {
                    setTheme(value);
                    setDesign((current) => ({
                      ...current,
                      theme: value
                    }));
                    setSaved(false);
                  }}
                >
                  {label}

                  {theme === value && (
                    <Check size={15} />
                  )}
                </button>

              ))}

            </div>

          </div>

          {/* GENERATE */}
          {inputMode === "topic" && loading && loading !== "generate" && <div className="topic-progress" role="status">{loading}</div>}
          <button
            className="generate-button"
            onClick={createDesign}
            disabled={Boolean(loading)}
          >
            <Sparkles size={19} />
            {inputMode === "topic" && loading ? loading : loading === "generate" ? format === "Carousel" ? "Generating Carousel..." : "Generating..." : inputMode === "topic" ? "Generate from Topic" : "Generate Poster"}
          </button>

        </section>

        {/* RIGHT */}
        <section className="preview-panel">

          <div className="preview-header">

            <div>
              <div className="preview-label">
                POSTER PREVIEW
              </div>

              <h2>
                Ready to Publish
              </h2>
            </div>

            <div className="preview-status">
              {generated ? "Generated" : "Preview"}
            </div>

          </div>

          <div className="poster-stage">

            <PostDesign
              design={design}
              selectedStyle={selectedStyle}
              slide={slide}
              designRef={designRef}
            />

          </div>
          <div className="design-indicator" aria-live="polite">
            DESIGN: {selectedStyle.toUpperCase()} / {design.posterLayout || design.suggestedLayout || "EDITORIAL"}
          </div>

          <div className="variation-controls">
            <button type="button" className="secondary-button" onClick={generateVariations} disabled={!generated || Boolean(loading)}>Generate Variations</button>
            {variations.length > 0 && <div className="variation-options">{variations.map((variation) => <button key={variation.id} type="button" className={design.variation === variation.id ? "choice active" : "choice"} onClick={() => selectVariation(variation)}>{variation.label}</button>)}</div>}
          </div>

          {/* SLIDES */}
          {design.slides?.length > 1 && (

            <div className="slide-controls">

              <button
                onClick={previousSlide}
                disabled={slide === 0}
              >
                <ChevronLeft />
              </button>

              <span>
                Slide {slide + 1} of{" "}
                {design.slides.length}
              </span>

              <button
                onClick={nextSlide}
                disabled={
                  slide === design.slides.length - 1
                }
              >
                <ChevronRight />
              </button>

            </div>

          )}

          {/* ACTIONS */}
          <div className="preview-actions">

            <button
              onClick={() =>
                exportImage("png")
              }
              className="download-button"
              disabled={Boolean(loading)}
            >
              <Download size={17} />
              PNG
            </button>

            <button
              onClick={() =>
                exportImage("jpg")
              }
              className="download-button"
              disabled={Boolean(loading)}
            >
              <Download size={17} />
              JPG
            </button>

            <button
              onClick={copyCaption}
              className="secondary-button"
              disabled={Boolean(loading)}
            >
              <Copy size={17} />
              Caption
            </button>

            <button
              onClick={saveDesign}
              className={
                saved
                  ? "save-button saved"
                  : "save-button"
              }
              disabled={!generated || Boolean(loading)}
            >
              {loading === "save" ? (
                "Saving..."
              ) : saved ? (
                <>
                  <Check size={17} />
                  Saved
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save
                </>
              )}
            </button>

            <button
              onClick={createDesign}
              className="regenerate-button"
              disabled={Boolean(loading)}
            >
              <RefreshCw size={17} />
              Regenerate
            </button>

          </div>

          <div className="publish-note">
            ✓ Downloaded poster is ready to upload directly
            to your social media platform.
          </div>

          {generated && (
            <div className="generated-details">
              <div>
                <strong>Caption</strong>
                <p>{design.caption}</p>
              </div>
              <p className="generated-metadata">
                Tone: {design.tone} · Style: {design.style} · Theme: {design.theme}
              </p>
            </div>
          )}

        </section>

      </div>

    </main>
  );
}

export default Create;
