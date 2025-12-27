const startBtn = document.getElementById('startBtn');
const book = document.getElementById('book');
const toFirst = document.getElementById('toFirst');
const backToStart = document.getElementById('backToStart');
const pagesContainer = document.getElementById('pages');

// Render pages from REASONS
function renderPages() {
  pagesContainer.innerHTML = '';
  (window.REASONS || []).forEach((item, i) => {
    const card = document.createElement('article');
    card.className = 'page';
    card.innerHTML = `
      <div class="page-number">Причина ${i+1}</div>
      <h3 class="page-title">${item.title}</h3>
      <p class="page-text">${item.text}</p>
    `;
    pagesContainer.appendChild(card);
  });
}

// Reveal on scroll (Intersection Observer)
function setupReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.page').forEach(el => observer.observe(el));
}

// Soft scroll to first page
function scrollToFirst() {
  const first = document.querySelector('.page');
  if (first) {
    first.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Ambient floating particles (simple, cheap)
function setupParticles() {
  // Gentle parallax on mouse / device tilt
  const backdrop = document.getElementById('particles');
  let tx = 0, ty = 0;
  window.addEventListener('mousemove', (e) => {
    const { innerWidth: w, innerHeight: h } = window;
    const x = (e.clientX / w - 0.5) * 6;
    const y = (e.clientY / h - 0.5) * 6;
    tx = x; ty = y;
  });
  setInterval(() => {
    backdrop.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
  }, 50);
}

// Navigation
startBtn.addEventListener('click', () => {
  book.classList.remove('hidden');
  document.querySelector('.hero').scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(scrollToFirst, 300);
});

toFirst.addEventListener('click', scrollToFirst);
backToStart.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Init
renderPages();
setupReveal();
setupParticles();
