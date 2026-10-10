import React, { useEffect, useRef, useState } from "react";
import {
  Download,
  Trash2,
  ExternalLink,
  Search,
  Image as ImageIcon
} from "lucide-react";

import PostDesign from "../components/PostDesign";
import html2canvas from "html2canvas";
import {
  deletePost,
  getSavedPost,
  getSavedPosts
} from "../services/api";

function Saved() {

  const [items, setItems] = useState([]);

  const [search, setSearch] = useState("");

  const [selected, setSelected] = useState(null);

  const [slide, setSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const selectedPosterRef = useRef(null);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const result = await getSavedPosts(search, {
          signal: controller.signal
        });
        if (active) {
          setItems((result.posts || []).map(normalizeSavedPost));
        }
      } catch (requestError) {
        if (active && requestError.name !== "AbortError") {
          setError(requestError.message || "Could not load saved posts.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }, 250);

    return () => {
      active = false;
      clearTimeout(timer);
      controller.abort();
    };
  }, [search]);

  const deleteItem = async (item) => {
    if (!window.confirm(`Delete "${item.title}"? This cannot be undone.`)) {
      return;
    }

    setDeletingId(item.id);
    setError("");
    try {
      await deletePost(item.id);
      const result = await getSavedPosts(search);
      setItems((result.posts || []).map(normalizeSavedPost));
      if (selected?.id === item.id) setSelected(null);
    } catch (requestError) {
      setError(requestError.message || "Could not delete this post.");
    } finally {
      setDeletingId(null);
    }
  };

  const downloadPoster = async (item) => {
    const element =
      selected?.id === item.id && selectedPosterRef.current
        ? selectedPosterRef.current
        : document.getElementById(`saved-poster-${item.id}`);

    if (!element) {
      setError("The poster preview is not available for download.");
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: null
      });
      const link = document.createElement("a");
      link.download = `news2posts-${item.id}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      setError("The poster could not be downloaded. Please try again.");
    }
  };

  const openPost = async (item) => {
    setError("");
    try {
      const post = await getSavedPost(item.id);
      setSelected(normalizeSavedPost(post));
      setSlide(0);
    } catch (requestError) {
      setError(requestError.message || "Could not open this saved post.");
    }
  };

  return (
    <main className="saved-page">

      <div className="page-header">

        <div>
          <div className="eyebrow">
            YOUR CONTENT
          </div>

          <h1>
            Saved <span>Posters</span>
          </h1>

          <p>
            Access the posters you created and saved.
          </p>
        </div>

        <div className="saved-count">
          {items.length} posters
        </div>

      </div>

      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}

      {/* SEARCH */}
      <div className="saved-search">

        <Search size={18} />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search saved posters..."
          aria-label="Search saved posts"
        />

      </div>

      {/* EMPTY */}
      {loading ? (
        <div className="empty-state">
          <p>Loading saved posts...</p>
        </div>
      ) : items.length === 0 ? (

        <div className="empty-state">

          <ImageIcon size={45} />

          <h2>
            No saved posters yet
          </h2>

          <p>
            Create your first poster and save it here.
          </p>

        </div>

      ) : (

        <div className="saved-grid">

          {items.map((item) => (

            <div
              className="saved-card"
              key={item.id}
            >

              <div
                id={`saved-poster-${item.id}`}
                className="saved-preview"
              >
                <PostDesign
                  design={item}
                  slide={0}
                />
              </div>

              <div className="saved-info">

                <div>
                  <h3>
                    {item.title}
                  </h3>

                  <p>{item.summary}</p>

                  <p>
                    {item.platform} •{" "}
                    {item.format}
                  </p>
                  <p>
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString()
                      : "Date unavailable"}
                  </p>
                </div>

                <div className="saved-actions">

                  <button
                    onClick={() => openPost(item)}
                    title="Open"
                  >
                    <ExternalLink size={16} />
                  </button>

                  <button
                    onClick={() =>
                      downloadPoster(item)
                    }
                    title="Download"
                  >
                    <Download size={16} />
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => deleteItem(item)}
                    disabled={deletingId === item.id}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* MODAL */}
      {selected && (

        <div
          className="modal-overlay"
          onClick={() => setSelected(null)}
        >

          <div
            className="modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <h2>
                Poster Preview
              </h2>

              <button
                onClick={() =>
                  setSelected(null)
                }
              >
                ×
              </button>

            </div>

            <div className="modal-poster">

              <PostDesign
                design={selected}
                slide={slide}
                designRef={selectedPosterRef}
              />

            </div>

            <div className="modal-footer">

              {selected.slides?.length > 1 && (

                <div className="modal-slide-controls">

                  <button
                    disabled={slide === 0}
                    onClick={() =>
                      setSlide(slide - 1)
                    }
                  >
                    ←
                  </button>

                  <span>
                    {slide + 1} /{" "}
                    {selected.slides.length}
                  </span>

                  <button
                    disabled={
                      slide ===
                      selected.slides.length - 1
                    }
                    onClick={() =>
                      setSlide(slide + 1)
                    }
                  >
                    →
                  </button>

                </div>

              )}

              <button
                className="download-button"
                onClick={() =>
                  downloadPoster(selected)
                }
              >
                <Download size={17} />
                Download PNG
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

export default Saved;

function normalizeSavedPost(post) {
  const slides = (post.slides || []).map((item) => ({
    ...item,
    summary: item.summary || item.content || "",
    points: item.points || []
  }));

  return {
    ...post,
    theme: (post.theme || "purple").toLowerCase(),
    points: post.points || [],
    slides: slides.length
      ? slides
      : [{
          title: post.title,
          summary: post.summary || "",
          points: post.points || []
        }]
  };
}