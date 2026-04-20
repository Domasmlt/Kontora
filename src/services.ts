/* Services — editor-style tab panel with code snippets */

interface ServicePanel {
  h3: string;
  body: string;
  bullets: string[];
  code: string;
}

const services: ServicePanel[] = [
  {
    h3: 'Svetainių kūrimas',
    body: 'Žiniatinklio programos, kurios yra greitos, prieinamos ir malonios naudoti — nuo pirmojo piešinio iki paleidimo.',
    bullets: [
      'Nuo 92 balų Lighthouse našumo vidurkio',
      'SEO ir prieinamumas nuo pirmos dienos',
      'Tipizuoti API, testai, CI/CD',
    ],
    code: `<span class="c">// kiekvieno puslapio pagrindai</span>
<span class="k">export</span> <span class="k">async</span> <span class="k">function</span> <span class="p">get</span>Page<span class="p">(</span>slug<span class="p">) {</span>
  <span class="k">const</span> data <span class="p">=</span> <span class="k">await</span> db<span class="p">.</span>page<span class="p">.</span>find<span class="p">(</span><span class="s">{ slug }</span><span class="p">)</span>
  <span class="k">return</span> <span class="p">{</span> data<span class="p">,</span> revalidate<span class="p">: </span><span class="s">60</span> <span class="p">}</span>
<span class="p">}</span>`,
  },
  {
    h3: 'Debesijos infrastruktūra',
    body: 'Projektuojame, migruojame ir valdome debesijos platformas taip, kad jos būtų atsparios, pigios ir numatomos.',
    bullets: [
      'AWS, Azure, GCP — multi-cloud, jei reikia',
      'Infrastruktūra kaip kodas nuo pradžios',
      'Kaštų stebėsena ir biudžeto sargai',
    ],
    code: `<span class="c"># production.tf</span>
<span class="k">resource</span> <span class="s">"aws_ecs_cluster"</span> <span class="s">"prod"</span> <span class="p">{</span>
  name <span class="p">=</span> <span class="s">"sintakse-prod"</span>
  capacity_providers <span class="p">=</span> <span class="p">[</span><span class="s">"FARGATE"</span><span class="p">]</span>
<span class="p">}</span>`,
  },
  {
    h3: 'IT konsultacijos',
    body: 'Strateginis partneris, kuris gali mąstyti tiek techniškai, tiek verslo kalba. Jūsų valdybai, jūsų komandai.',
    bullets: [
      'Audito ataskaita su konkrečiais sprendimais',
      '3-, 6- ir 12-mėnesių veiksmų planas',
      'Pristatymas valdybai',
    ],
    code: `<span class="c"># Roadmap · Q2 2026</span>

<span class="p">##</span> <span class="k">Prioritetai</span>
<span class="p">1.</span> Debesijos migracija <span class="p">→</span> <span class="s">AWS</span>
<span class="p">2.</span> SSO ir RBAC konsolidacija
<span class="p">3.</span> Duomenų saugyklos restruktūrizacija`,
  },
  {
    h3: 'Kibernetinis saugumas',
    body: 'Įsiskverbimo testavimas, atitiktis ir nuolatinė stebėsena. Kad jūsų sistemos būtų saugios, o miegas — geras.',
    bullets: [
      'Juodosios ir baltosios dėžės testai',
      'SOC 2 / ISO 27001 parengtis',
      'SIEM ir 24/7 stebėsena',
    ],
    code: `<span class="c"># hardening-checks.yml</span>
<span class="k">checks</span><span class="p">:</span>
  <span class="p">-</span> <span class="k">id</span><span class="p">:</span> tls-1.3-only
    <span class="k">severity</span><span class="p">:</span> <span class="s">critical</span>
  <span class="p">-</span> <span class="k">id</span><span class="p">:</span> mfa-enforced
    <span class="k">severity</span><span class="p">:</span> <span class="s">high</span>`,
  },
  {
    h3: 'Duomenys ir analitika',
    body: 'Neapdoroti duomenys → patikimos ataskaitos → sprendimai, kuriuos galima priimti be spėjimų.',
    bullets: [
      'dbt + Snowflake / BigQuery',
      'Patikimos ataskaitos, be copy-paste',
      'Semantinis sluoksnis komandoms',
    ],
    code: `<span class="c">-- revenue_daily.sql</span>
<span class="k">select</span>
  date_trunc<span class="p">(</span><span class="s">'day'</span><span class="p">,</span> created_at<span class="p">)</span> <span class="k">as</span> day<span class="p">,</span>
  <span class="k">sum</span><span class="p">(</span>total<span class="p">)</span> <span class="k">as</span> revenue
<span class="k">from</span> orders
<span class="k">where</span> status <span class="p">=</span> <span class="s">'paid'</span>
<span class="k">group by</span> <span class="s">1</span>`,
  },
  {
    h3: 'IT pagalba ir priežiūra',
    body: 'Stebime, reaguojame, taisome — kol jūsų komanda dirba savo darbą. Aiškūs SLA, jokių pradingusių bilietų.',
    bullets: [
      '&lt;15min vidutinis atkūrimo laikas',
      'PagerDuty + Datadog + Linear',
      'Mėnesinės veiklos ataskaitos',
    ],
    code: `<span class="c"># incident · 2026-04-18 14:22</span>
<span class="p">[</span><span class="k">INFO</span><span class="p">]</span>  api-p99 <span class="p">=</span> <span class="s">820ms</span> <span class="p">(</span>threshold <span class="s">500ms</span><span class="p">)</span>
<span class="p">[</span><span class="k">PAGE</span><span class="p">]</span>  on-call: tomas@sintakse.lt
<span class="p">[</span><span class="k">ACK</span><span class="p">]</span>   8<span class="s">s</span>
<span class="p">[</span><span class="k">FIX</span><span class="p">]</span>   11<span class="s">m</span> <span class="p">—</span> rolled back deploy <span class="s">#4182</span>`,
  },
];

export function initServices(): void {
  const tabsEl = document.getElementById('svcCTabs');
  const panelsEl = document.getElementById('svcCPanels');
  if (!tabsEl || !panelsEl) return;

  panelsEl.innerHTML = services
    .map(
      (d, i) => `
      <div class="svc-c-panel ${i === 0 ? 'active' : ''}" data-idx="${i}">
        <div class="body">
          <h3>${d.h3}</h3>
          <p>${d.body}</p>
          <ul class="bullets">${d.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
        </div>
        <pre class="code">${d.code}</pre>
      </div>`,
    )
    .join('');

  const tabs = tabsEl.querySelectorAll<HTMLElement>('.svc-c-tab');
  const panels = panelsEl.querySelectorAll<HTMLElement>('.svc-c-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const idx = Number(tab.dataset.idx);
      tabs.forEach((t) => t.classList.toggle('active', t === tab));
      panels.forEach((p) => p.classList.toggle('active', Number(p.dataset.idx) === idx));
    });
  });
}
