/* Testimonials — vertical ticker with auto-advance and per-entry metrics */

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  metrics: [string, string][];
}

const testimonials: Testimonial[] = [
  {
    name: 'Marius Kazlauskas',
    role: 'CTO — NordFlow UAB',
    quote:
      'Sintaksė per mažiau nei tris savaites atnaujino visą mūsų debesijos infrastruktūrą. Išlaidos sumažėjo 40%, o veikimo laikas nuo tada buvo nepriekaištingas. Tikrai įspūdingas darbas.',
    metrics: [
      ['−40%', 'Infra kaštų'],
      ['99.99%', 'Uptime'],
      ['3 sav.', 'Migracija'],
    ],
  },
  {
    name: 'Laura Šimkutė',
    role: 'CEO — Ember Digital',
    quote:
      'Mums reikėjo partnerio, kuris galėtų mąstyti tiek techniškai, tiek strategiškai. Jie pateikė visą IT veiksmų planą, kurį mūsų valdyba suprato ir patvirtino per vieną susitikimą.',
    metrics: [
      ['1', 'Susitikimas'],
      ['18 mėn.', 'Roadmap'],
      ['3', 'Scenarijai'],
    ],
  },
  {
    name: 'Tomas Petrauskas',
    role: 'IT vadovas — Baltijos Grupė',
    quote:
      'Jų saugumo auditas atskleidė kritinių pažeidžiamumų, kuriuos mūsų ankstesnis tiekėjas praleido dvejus metus. Profesionalūs, kruopštūs ir be jokio chaoso. Labai rekomenduoju.',
    metrics: [
      ['17', 'Kritinių radinių'],
      ['0', 'Chaoso'],
      ['2 sav.', 'Remediacija'],
    ],
  },
  {
    name: 'Ieva Jonaitytė',
    role: 'Produktų direktorė — Vanta Commerce',
    quote:
      'Jų sukurta žiniatinklio platforma apdoroja dešimt kartų daugiau srauto, nei tikėjomės per paleidimą. Veikimas ir dizainas — jie suderino abu, ir mums nereikėjo pateikti nė vieno pakeitimo prašymo.',
    metrics: [
      ['10×', 'Srauto'],
      ['0', 'Bug-o'],
      ['A+', 'SSL Labs'],
    ],
  },
];

const AUTO_INTERVAL = 6000;

export function initTestimonials(): void {
  const list = document.getElementById('testBList');
  const panel = document.getElementById('testBPanel');
  if (!list || !panel) return;

  let idx = 0;

  list.innerHTML = testimonials
    .map(
      (t, i) => `
      <div class="test-b-entry ${i === 0 ? 'active' : ''}" data-idx="${i}">
        <div class="name">${t.name}</div>
        <div class="org">${t.role}</div>
        <div class="progress"></div>
      </div>`,
    )
    .join('');

  const entries = list.querySelectorAll<HTMLElement>('.test-b-entry');

  function render(): void {
    const t = testimonials[idx];
    panel!.innerHTML = `
      <div class="metric-row">
        ${t.metrics
          .map(([v, l]) => `<div class="metric"><div class="v">${v}</div><div class="l">${l}</div></div>`)
          .join('')}
      </div>
      <blockquote>${t.quote}</blockquote>
    `;
    entries.forEach((el, i) => {
      el.classList.toggle('active', i === idx);
      const progress = el.querySelector<HTMLElement>('.progress');
      if (progress) {
        progress.style.animation = 'none';
        void progress.offsetWidth;
        progress.style.animation = '';
      }
    });
  }

  list.addEventListener('click', (e) => {
    const entry = (e.target as HTMLElement).closest<HTMLElement>('.test-b-entry');
    if (!entry) return;
    idx = Number(entry.dataset.idx);
    render();
  });

  render();
  setInterval(() => {
    idx = (idx + 1) % testimonials.length;
    render();
  }, AUTO_INTERVAL);
}
