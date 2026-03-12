/**
 * Cloudflare Worker: wyltek-fiberquest
 * Receives game JSON submissions from the FiberQuest page,
 * validates schema, opens a GitHub PR on toastmanAu/ram-viewer.
 *
 * Env vars needed (Cloudflare dashboard → Workers → Settings):
 *   GITHUB_TOKEN   — PAT with repo:write scope (toastmanAu/ram-viewer)
 *   GITHUB_OWNER   — toastmanAu
 *   GITHUB_REPO    — ram-viewer
 */

const ALLOWED_CONSOLES = ['NES','SNES','Genesis','Mega Drive','Game Boy','GBC','GBA','N64','PS1','Arcade','FBNeo','MAME'];
const REQUIRED_FIELDS  = ['name','console','core','addresses'];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return cors(new Response(null, { status: 204 }));
    }

    if (url.pathname === '/submit' && request.method === 'POST') {
      return cors(await handleSubmit(request, env));
    }

    return cors(new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404, headers: { 'Content-Type': 'application/json' }
    }));
  }
};

function cors(resp) {
  const headers = new Headers(resp.headers);
  headers.set('Access-Control-Allow-Origin', 'https://wyltekindustries.com');
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return new Response(resp.body, { status: resp.status, headers });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status, headers: { 'Content-Type': 'application/json' }
  });
}

async function handleSubmit(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid JSON body' }, 400);
  }

  const { game, submitter, notes } = body;

  // ── Schema validation ────────────────────────────────────────────────────────
  if (!game || typeof game !== 'object') {
    return json({ ok: false, error: 'Missing game object' }, 400);
  }
  for (const f of REQUIRED_FIELDS) {
    if (!game[f]) return json({ ok: false, error: `Missing field: ${f}` }, 400);
  }
  if (!Array.isArray(game.addresses) || game.addresses.length === 0) {
    return json({ ok: false, error: 'addresses must be a non-empty array' }, 400);
  }
  for (const addr of game.addresses) {
    if (!addr.address || !addr.label) {
      return json({ ok: false, error: 'Each address needs address + label fields' }, 400);
    }
    if (!/^0x[0-9a-fA-F]+$/.test(addr.address)) {
      return json({ ok: false, error: `Invalid address format: ${addr.address} (must be 0xNNNN)` }, 400);
    }
  }
  if (game.addresses.length > 64) {
    return json({ ok: false, error: 'Too many addresses (max 64)' }, 400);
  }

  // ── Create PR on GitHub ──────────────────────────────────────────────────────
  const safeName = game.name.toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50);
  const timestamp = Date.now();
  const branch = `game-submission/${safeName}-${timestamp}`;
  const filePath = `games/${safeName}.json`;
  const fileContent = JSON.stringify(game, null, 2);
  const fileContentB64 = btoa(fileContent);

  const OWNER = env.GITHUB_OWNER || 'toastmanAu';
  const REPO  = env.GITHUB_REPO  || 'ram-viewer';
  const TOKEN = env.GITHUB_TOKEN;

  if (!TOKEN) {
    return json({ ok: false, error: 'Worker not configured (missing GITHUB_TOKEN)' }, 500);
  }

  const ghHeaders = {
    Authorization: `Bearer ${TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
    'User-Agent': 'wyltek-fiberquest-worker'
  };

  try {
    // Get default branch SHA
    const refResp = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/git/ref/heads/main`,
      { headers: ghHeaders }
    );
    const refData = await refResp.json();
    const sha = refData.object?.sha;
    if (!sha) return json({ ok: false, error: 'Could not get repo SHA' }, 500);

    // Create branch
    await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/git/refs`, {
      method: 'POST',
      headers: ghHeaders,
      body: JSON.stringify({ ref: `refs/heads/${branch}`, sha })
    });

    // Create file
    const createResp = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: ghHeaders,
        body: JSON.stringify({
          message: `game submission: ${game.name}`,
          content: fileContentB64,
          branch
        })
      }
    );
    if (!createResp.ok) {
      const err = await createResp.json();
      return json({ ok: false, error: `GitHub file create failed: ${err.message}` }, 500);
    }

    // Open PR
    const prBody = [
      `### Game Submission: ${game.name}`,
      '',
      `**Console:** ${game.console}  `,
      `**Core:** ${game.core}  `,
      `**Addresses:** ${game.addresses.length}  `,
      submitter ? `**Submitted by:** \`${submitter}\`` : '',
      notes ? `**Notes:** ${notes}` : '',
      '',
      '---',
      '🤖 *This PR will be automatically validated by the FiberQuest local inference validator.*',
      '',
      '**Addresses:**',
      game.addresses.map(a => `- \`${a.address}\` — ${a.label}${a.description ? ': ' + a.description : ''}`).join('\n')
    ].filter(Boolean).join('\n');

    const prResp = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/pulls`, {
      method: 'POST',
      headers: ghHeaders,
      body: JSON.stringify({
        title: `Game submission: ${game.name}`,
        body: prBody,
        head: branch,
        base: 'main',
        maintainer_can_modify: true
      })
    });
    const prData = await prResp.json();
    if (!prData.html_url) {
      return json({ ok: false, error: `PR creation failed: ${prData.message}` }, 500);
    }

    return json({ ok: true, prUrl: prData.html_url, prNumber: prData.number });

  } catch (e) {
    return json({ ok: false, error: e.message }, 500);
  }
}