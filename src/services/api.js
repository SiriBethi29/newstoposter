const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

async function request(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, options);
  } catch (error) {
    if (error.name === "AbortError") {
      throw error;
    }
    throw new Error("The backend is unavailable. Please try again shortly.");
  }

  if (response.status === 204) {
    return null;
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("The server returned an invalid response. Please try again.");
  }

  if (!response.ok) {
    const detail = Array.isArray(data?.detail)
      ? data.detail.map((item) => item.msg).filter(Boolean).join(" ")
      : data?.detail;
    const message =
      response.status >= 500
        ? "The server could not complete the request. Please try again."
        : detail || data?.message || "The request could not be completed.";
    throw new Error(message);
  }

  return data;
}

function postJson(path, body) {
  return request(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
}

export function generateContent(options) {
  return postJson("/api/generate", options);
}

export function generateCarousel(options) {
  return postJson("/api/generate/carousel", options);
}

export function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  return request("/api/upload", {
    method: "POST",
    body: formData
  });
}

export function extractArticle(url) {
  return postJson("/api/article/extract", { url });
}

export function savePost(post) {
  return postJson("/api/saved", post);
}

export function getSavedPosts(search = "", options = {}) {
  const query = new URLSearchParams();
  if (search.trim()) {
    query.set("search", search.trim());
  }
  const queryString = query.toString();
  const suffix = queryString ? `?${queryString}` : "";
  return request(`/api/saved${suffix}`, options);
}

export function getSavedPost(postId) {
  return request(`/api/saved/${encodeURIComponent(postId)}`);
}

export function deletePost(postId) {
  return request(`/api/saved/${encodeURIComponent(postId)}`, {
    method: "DELETE"
  });
}
