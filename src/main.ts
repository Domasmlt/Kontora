import './styles.css';
import { initTerminal } from './terminal';
import { initServices } from './services';
import { initTestimonials } from './testimonials';

/* ── Sections ───────────────────────────────────────────────── */
initTerminal();
initServices();
initTestimonials();

/* ── Navbar scroll effect ───────────────────────────────────── */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ── Scroll reveal ──────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
);

document.querySelectorAll<HTMLElement>('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.04}s`;
  revealObserver.observe(el);
});

/* ── Contact form validation ────────────────────────────────── */
interface FieldConfig {
  el: HTMLInputElement | HTMLTextAreaElement;
  err: HTMLElement;
  validate: (v: string) => boolean;
}

type FieldKey = 'name' | 'email' | 'message';

const form = document.getElementById('contact-form') as HTMLFormElement | null;

if (form) {
  const fields: Record<FieldKey, FieldConfig> = {
    name: {
      el: document.getElementById('name') as HTMLInputElement,
      err: document.getElementById('name-error') as HTMLElement,
      validate: (v) => v.trim().length >= 2,
    },
    email: {
      el: document.getElementById('email') as HTMLInputElement,
      err: document.getElementById('email-error') as HTMLElement,
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    },
    message: {
      el: document.getElementById('message') as HTMLTextAreaElement,
      err: document.getElementById('message-error') as HTMLElement,
      validate: (v) => v.trim().length >= 10,
    },
  };

  function validateField(key: FieldKey): boolean {
    const { el, err, validate } = fields[key];
    const ok = validate(el.value);
    el.classList.toggle('error', !ok);
    err.classList.toggle('visible', !ok);
    return ok;
  }

  (Object.keys(fields) as FieldKey[]).forEach((key) => {
    fields[key].el.addEventListener('blur', () => validateField(key));
    fields[key].el.addEventListener('input', () => {
      if (fields[key].el.classList.contains('error')) validateField(key);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const allValid = (Object.keys(fields) as FieldKey[]).map(validateField).every(Boolean);
    if (!allValid) return;

    const btn = form.querySelector<HTMLButtonElement>('[type="submit"]');
    if (!btn) return;
    btn.textContent = 'Siunčiama…';
    btn.disabled = true;

    // TODO: replace setTimeout with a real fetch() to your backend/email service
    setTimeout(() => {
      form.reset();
      btn.textContent = 'Siųsti žinutę';
      btn.disabled = false;
      const successEl = document.getElementById('form-success');
      if (successEl) {
        successEl.classList.add('visible');
        setTimeout(() => successEl.classList.remove('visible'), 5000);
      }
    }, 1200);
  });
}
