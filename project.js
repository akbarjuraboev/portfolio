document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("galleryTrack");
  if (!track) return;

  const slides = Array.from(track.querySelectorAll(".gallery-slide"));
  const thumbs = Array.from(document.querySelectorAll(".thumb"));
  const currentEl = document.getElementById("galleryCurrent");
  const total = slides.length;
  let index = 0;

  function pad(n) { return String(n + 1).padStart(2, "0"); }

  function show(newIndex) {
    index = (newIndex + total) % total;
    slides.forEach((s, i) => s.classList.toggle("is-active", i === index));
    thumbs.forEach((t, i) => t.classList.toggle("is-active", i === index));
    currentEl.textContent = pad(index);
    thumbs[index].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  document.getElementById("galleryPrev").addEventListener("click", () => show(index - 1));
  document.getElementById("galleryNext").addEventListener("click", () => show(index + 1));

  thumbs.forEach((t) => {
    t.addEventListener("click", () => show(Number(t.dataset.index)));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });

  // Swipe support
  let touchStartX = null;
  const stage = document.querySelector(".gallery-stage");
  stage.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; });
  stage.addEventListener("touchend", (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) show(dx > 0 ? index - 1 : index + 1);
    touchStartX = null;
  });
});
