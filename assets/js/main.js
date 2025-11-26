// ===============================
// Run everything after DOM loads
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // Update year
  // ===============================
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ===============================
  // Desktop & Mobile Image Sets
  // ===============================
  const desktopSlides = [
    "images/community.png",
    "images/cooks.png",
    "images/bus.png"
  ];

  const mobileSlides = [
    "images/community-mobile.png",
    "images/cooks-mobile.png",
    "images/bus-mobile.png"
  ];

  // ===============================
  // Preload both sets
  // ===============================
  let loaded = 0;
  const totalImages = desktopSlides.length + mobileSlides.length;
  const cache = [];

  [...desktopSlides, ...mobileSlides].forEach(src => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      loaded++;
      if (loaded === totalImages) startSlideshowsAndFade();
    };
    cache.push(img);
  });

  // ===============================
  // Start slideshows and fade overlay
  // ===============================
  function startSlideshowsAndFade() {
    const bg = document.querySelector(".bg-slideshow");          // desktop
    const mobileImg = document.getElementById("mobile-slide-img"); // mobile
    const loader = document.getElementById("site-loader");        // overlay

    let index = 0;

    // Initialize first images
    if (bg) bg.style.backgroundImage = `url('${desktopSlides[0]}')`;
    if (mobileImg) mobileImg.src = mobileSlides[0];

    // ==========================
    // Fade out the overlay
    // ==========================
    if (loader) {
      loader.classList.add("fade-out");
      setTimeout(() => loader.remove(), 700);
    }

    // ==========================
    // Slideshow function
    // ==========================
    function next() {
      index = (index + 1) % desktopSlides.length;

      // DESKTOP fade
      if (bg) {
        bg.style.opacity = 0;
        setTimeout(() => {
          bg.style.backgroundImage = `url('${desktopSlides[index]}')`;
          bg.style.opacity = 1;
        }, 400);
      }

      // MOBILE fade
      if (mobileImg) {
        mobileImg.style.opacity = 0;
        setTimeout(() => {
          mobileImg.src = mobileSlides[index];
          mobileImg.style.opacity = 1;
        }, 200);
      }
    }

    // Start slideshow interval
    setInterval(next, 6000);
  }

  // ===============================
  // Fallback: if images take too long
  // ===============================
  setTimeout(() => {
    if (loaded < totalImages) startSlideshowsAndFade();
  }, 3000); // 3s max wait
});
