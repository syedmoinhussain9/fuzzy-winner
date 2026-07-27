// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// ---- Gallery carousel ----
const TOTAL_ILLUSTRATIONS = 19; // update this if you add/remove images from assets/images/

const illustrations = Array.from({ length: TOTAL_ILLUSTRATIONS }, (_, i) => {
  const n = i + 1;
  return {
    src: `assets/images/image%20${n}.png`,
    alt: `Chipku illustration ${n}`
  };
});

const carouselImg = document.getElementById('carouselImg');
const carouselCount = document.getElementById('carouselCount');
const carouselThumbs = document.getElementById('carouselThumbs');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const carouselViewport = document.getElementById('carouselViewport');

let currentIndex = 0;

function renderThumbs() {
  carouselThumbs.innerHTML = '';
  illustrations.forEach((item, i) => {
    const btn = document.createElement('button');
    btn.className = 'carousel-thumb' + (i === currentIndex ? ' active' : '');
    btn.setAttribute('aria-label', `Go to illustration ${i + 1}`);
    btn.innerHTML = `<img src="${item.src}" alt="" loading="lazy">`;
    btn.addEventListener('click', () => goTo(i));
    carouselThumbs.appendChild(btn);
  });
}

function goTo(index) {
  currentIndex = (index + illustrations.length) % illustrations.length;
  const current = illustrations[currentIndex];
  carouselImg.src = current.src;
  carouselImg.alt = current.alt;
  carouselCount.textContent = `${currentIndex + 1} / ${illustrations.length}`;

  document.querySelectorAll('.carousel-thumb').forEach((el, i) => {
    el.classList.toggle('active', i === currentIndex);
  });

  const activeThumb = carouselThumbs.children[currentIndex];
  if (activeThumb) activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

if (carouselImg) {
  renderThumbs();
  prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

  // Keyboard navigation when gallery is in view
  document.addEventListener('keydown', (e) => {
    if (lightboxIsOpen()) return; // let lightbox own the keys while open
    const gallerySection = document.getElementById('gallery');
    const rect = gallerySection.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;
    if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
    if (e.key === 'ArrowRight') goTo(currentIndex + 1);
  });

  // Clicking the main image zooms it into the lightbox
  carouselViewport.addEventListener('click', () => {
    openLightbox(carouselImg.src, carouselImg.alt);
  });
}

// ---- Lightbox (zoomed view of current slide) ----
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

function lightboxIsOpen() {
  return lightbox && !lightbox.hidden;
}

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.hidden = false;
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.src = '';
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightboxIsOpen()) closeLightbox();
});

// Typed terminal line in hero
const phrases = [
  "SELECT craft FROM me WHERE passion = true;",
  "git commit -m \"chapter one, take three\"",
  "whoami --> programmer, author, illustrator"
];

const typeTarget = document.getElementById('typeTarget');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (typeTarget) {
  if (prefersReducedMotion) {
    // Skip animation, just show the first phrase statically
    typeTarget.textContent = phrases[0];
  } else {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const current = phrases[phraseIndex];

      if (!deleting) {
        typeTarget.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1800); // pause at full phrase
          return;
        }
      } else {
        typeTarget.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }

      setTimeout(tick, deleting ? 30 : 55);
    }

    tick();
  }
}