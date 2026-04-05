'use strict';

/* ── Navbar scroll effect ─────────────────────────────────── */
const navbar = document.getElementById('navbar');
if (navbar && !navbar.classList.contains('scrolled')) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ── Scroll reveal ────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.04}s`;
  revealObserver.observe(el);
});

/* ── Testimonials carousel ────────────────────────────────── */
const track   = document.getElementById('testimonials-track');
const dotsWrap = document.getElementById('carousel-dots');
const btnPrev  = document.getElementById('carousel-prev');
const btnNext  = document.getElementById('carousel-next');

if (track) {
  const cards     = Array.from(track.children);
  const total     = cards.length;
  let   current   = 0;
  let   autoTimer;

  // Build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(index) {
    current = (index + total) % total;
    const cardWidth = cards[0].offsetWidth + 24; // gap = 1.5rem = 24px
    track.style.transform = `translateX(-${current * cardWidth}px)`;
    dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  function stopAuto() {
    clearInterval(autoTimer);
  }

  btnPrev.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  btnNext.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });

  // Touch / swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      stopAuto();
      goTo(delta > 0 ? current + 1 : current - 1);
      startAuto();
    }
  });

  // Recalculate on resize
  window.addEventListener('resize', () => goTo(current), { passive: true });

  startAuto();
}

/* ── Contact form validation ──────────────────────────────── */
const form = document.getElementById('contact-form');

if (form) {
  const fields = {
    name:    { el: document.getElementById('name'),    err: document.getElementById('name-error'),    validate: v => v.trim().length >= 2 },
    email:   { el: document.getElementById('email'),   err: document.getElementById('email-error'),   validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
    message: { el: document.getElementById('message'), err: document.getElementById('message-error'), validate: v => v.trim().length >= 10 },
  };

  function validateField(key) {
    const { el, err, validate } = fields[key];
    const ok = validate(el.value);
    el.classList.toggle('error', !ok);
    err.classList.toggle('visible', !ok);
    return ok;
  }

  Object.keys(fields).forEach(key => {
    fields[key].el.addEventListener('blur', () => validateField(key));
    fields[key].el.addEventListener('input', () => {
      if (fields[key].el.classList.contains('error')) validateField(key);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const allValid = Object.keys(fields).map(validateField).every(Boolean);
    if (!allValid) return;

    const btn = form.querySelector('[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Simulate async submission — replace with real fetch() to a backend
    setTimeout(() => {
      form.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
      document.getElementById('form-success').classList.add('visible');
      setTimeout(() => document.getElementById('form-success').classList.remove('visible'), 5000);
    }, 1200);
  });
}
