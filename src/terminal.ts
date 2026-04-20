/* Live terminal animation — types realistic SRE/deploy commands */

type ScriptEntry =
  | { type: 'cmd'; text: string }
  | { type: 'out'; text: string; cls?: 'ok' | 'warn' | 'dim'; delay?: number };

const script: ScriptEntry[] = [
  { type: 'cmd', text: 'ssh ops@sintakse.prod' },
  { type: 'out', text: 'Authenticated via ed25519 key', cls: 'dim', delay: 300 },
  { type: 'cmd', text: 'kubectl rollout status deploy/api --watch' },
  { type: 'out', text: 'Waiting for rollout...', cls: 'dim', delay: 400 },
  { type: 'out', text: '3 of 3 replicas updated', cls: 'ok', delay: 800 },
  { type: 'out', text: 'deployment "api" successfully rolled out', cls: 'ok', delay: 300 },
  { type: 'cmd', text: 'terraform apply -auto-approve' },
  { type: 'out', text: 'Plan: 7 to add, 2 to change, 0 to destroy', cls: 'dim', delay: 600 },
  { type: 'out', text: 'aws_lambda_function.ingest: Creating...', cls: 'dim', delay: 500 },
  { type: 'out', text: 'Apply complete. Resources: 9 added.', cls: 'ok', delay: 700 },
  { type: 'cmd', text: 'curl -s https://api.sintakse.lt/health | jq .status' },
  { type: 'out', text: '"ok"', cls: 'ok', delay: 500 },
  { type: 'cmd', text: 'tail -f /var/log/nginx/access.log' },
  { type: 'out', text: 'GET /api/v1/users 200 · 24ms', cls: 'dim', delay: 350 },
  { type: 'out', text: 'GET /api/v1/orders 200 · 41ms', cls: 'dim', delay: 420 },
  { type: 'out', text: 'POST /api/v1/invoice 201 · 88ms', cls: 'dim', delay: 380 },
  { type: 'out', text: 'GET /api/v1/metrics 200 · 12ms', cls: 'dim', delay: 400 },
];

const TYPING_SPEED = 28;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function initTerminal(): void {
  const body = document.getElementById('termBody');
  const statusEl = document.getElementById('termStatus');
  if (!body) return;

  let cursor: HTMLSpanElement | null = null;

  function addCursor(line: HTMLElement): void {
    if (cursor) cursor.remove();
    cursor = document.createElement('span');
    cursor.className = 'term-cursor';
    line.appendChild(cursor);
  }

  async function typeInto(line: HTMLElement, text: string): Promise<void> {
    let content = line.querySelector<HTMLSpanElement>('.__content');
    if (!content) {
      content = document.createElement('span');
      content.className = '__content';
      line.insertBefore(content, cursor);
    }
    for (const ch of text) {
      content.textContent += ch;
      if (cursor) line.appendChild(cursor);
      await sleep(TYPING_SPEED + Math.random() * 35);
    }
  }

  async function appendLine(entry: ScriptEntry): Promise<void> {
    if (!body) return;
    const line = document.createElement('div');
    line.className = 'term-line';

    if (entry.type === 'cmd') {
      const prompt = document.createElement('span');
      prompt.className = 'prompt';
      prompt.textContent = '➜ ';
      const path = document.createElement('span');
      path.className = 'arg';
      path.textContent = 'sintakse ';
      line.appendChild(prompt);
      line.appendChild(path);
      body.appendChild(line);
      addCursor(line);

      await typeInto(line, entry.text);
      await sleep(320);
    } else {
      const span = document.createElement('span');
      if (entry.cls) span.className = entry.cls;
      span.textContent = entry.text;
      line.appendChild(span);
      body.appendChild(line);
      if (cursor) { cursor.remove(); cursor = null; }
      await sleep(entry.delay ?? 300);
    }

    while (
      body.scrollHeight > body.clientHeight &&
      body.firstChild &&
      body.children.length > 2
    ) {
      body.removeChild(body.firstChild);
    }
  }

  async function run(): Promise<void> {
    if (!body) return;
    while (true) {
      for (const entry of script) {
        await appendLine(entry);
      }
      await sleep(1500);
      body.innerHTML = '';
      cursor = null;
    }
  }

  if (statusEl) {
    let uptime = 99.99;
    setInterval(() => {
      const jitter = (Math.random() - 0.5) * 0.002;
      uptime = Math.max(99.95, Math.min(99.999, uptime + jitter));
      statusEl.textContent = `UPTIME · ${uptime.toFixed(3)}%`;
    }, 1400);
  }

  void run();
}
