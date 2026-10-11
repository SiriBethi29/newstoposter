export function waitForPosterImages(root, timeoutMs = 8000) {
  const images = [...root.querySelectorAll("img")];
  return Promise.all(images.map((image) => {
    if (image.complete) {
      if (!image.naturalWidth) image.dispatchEvent(new Event("error"));
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      let timeout;
      const finish = () => { window.clearTimeout(timeout); image.removeEventListener("load", finish); image.removeEventListener("error", finish); resolve(); };
      image.addEventListener("load", finish, { once: true });
      image.addEventListener("error", finish, { once: true });
      timeout = window.setTimeout(() => {
        if (!image.complete) image.dispatchEvent(new Event("error"));
        finish();
      }, timeoutMs);
    });
  })).then(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}
