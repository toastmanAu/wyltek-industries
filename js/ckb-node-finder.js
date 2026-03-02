/**
 * ckb-node-finder.js  v0.2
 * Discovers a CKB RPC node from a browser.
 *
 * Strategy:
 *   1. Saved URL from localStorage
 *   2. localhost ports (same machine as browser)
 *   3. LAN scan — common gateway subnets on ports 8114 + 28114
 *      (covers nodes on other devices on the same network)
 *   4. Fall back to URL prompt
 *
 * LAN scan note: Chrome may show a one-time Local Network Access permission
 * prompt. User clicks Allow once, browser remembers it.
 *
 * Usage:
 *   const finder = new CKBNodeFinder({ onFound, onPrompt, onProgress });
 *   finder.discover();
 *
 *   const widget = new CKBNodeWidget('#container');
 *   widget.start().on('connected', info => { ... });
 */

'use strict';

// ── Defaults ──────────────────────────────────────────────────────────────────

const LOCALHOST_CANDIDATES = [
  'http://localhost:8114',
  'http://127.0.0.1:8114',
  'http://localhost:8117',   // light client
  'http://localhost:9000',   // alt port
  'http://localhost:28114',  // some setups use 28114 for external
];

// LAN ranges to scan. We try .1 (gateway), and common SBC IPs (.87–.110)
// across the most common home subnet prefixes.
// Each attempt has a 1.5s timeout — parallel batches of 8 keep total time ~3s.
const LAN_PORTS    = [8114, 28114];
const LAN_PREFIXES = ['192.168.68', '192.168.1', '192.168.0', '10.0.0', '10.0.1'];
const LAN_SUFFIXES = [1, 2, 50, 87, 88, 91, 93, 100, 105, 200, 254];
const BATCH_SIZE   = 10;

const TIMEOUT_LOCAL_MS = 2500;
const TIMEOUT_LAN_MS   = 1500;
const STORAGE_KEY      = 'ckb_node_finder_url';

// ── CKBNodeFinder (logic only, no UI) ────────────────────────────────────────

class CKBNodeFinder {
  constructor({ onFound = null, onPrompt = null, onProgress = null, onError = null, storageKey = STORAGE_KEY } = {}) {
    this.onFound     = onFound;
    this.onPrompt    = onPrompt;
    this.onProgress  = onProgress || (() => {});
    this.onError     = onError;
    this.storageKey  = storageKey;
    this._resolving  = false;
    this._cancelled  = false;
  }

  async discover() {
    if (this._resolving) return;
    this._resolving  = true;
    this._cancelled  = false;

    // 1. Saved URL
    const saved = this._load();
    if (saved) {
      this.onProgress('Checking saved node…');
      const info = await this._probe(saved, TIMEOUT_LOCAL_MS);
      if (info) { this._emit(info); return; }
      this._clear(); // stale
    }

    // 2. Localhost
    this.onProgress('Scanning localhost…');
    for (const url of LOCALHOST_CANDIDATES) {
      if (this._cancelled) return;
      const info = await this._probe(url, TIMEOUT_LOCAL_MS);
      if (info) { this._save(url); this._emit(info); return; }
    }

    // 3. LAN scan (Chrome/Edge only — Brave blocks cross-origin LAN requests)
    // Detect Brave: it exposes navigator.brave
    const isBrave = !!(navigator.brave && await navigator.brave.isBrave().catch(() => false));

    if (!isBrave) {
      this.onProgress('Scanning local network…');
      const lanCandidates = [];
      for (const prefix of LAN_PREFIXES) {
        for (const suffix of LAN_SUFFIXES) {
          for (const port of LAN_PORTS) {
            lanCandidates.push(`http://${prefix}.${suffix}:${port}`);
          }
        }
      }

      for (let i = 0; i < lanCandidates.length; i += BATCH_SIZE) {
        if (this._cancelled) return;
        const batch   = lanCandidates.slice(i, i + BATCH_SIZE);
        const results = await Promise.allSettled(
          batch.map(url => this._probe(url, TIMEOUT_LAN_MS))
        );
        for (let j = 0; j < results.length; j++) {
          const info = results[j].value;
          if (info) {
            this._save(batch[j]);
            this._emit(info);
            return;
          }
        }
      }
    }

    // 4. Nothing found (or Brave — skip straight to prompt)
    this._resolving = false;
    if (this.onPrompt) this.onPrompt(isBrave);
  }

  async tryUrl(url) {
    url = url.trim().replace(/\/$/, '');
    if (!url.startsWith('http')) url = 'http://' + url;
    const info = await this._probe(url, TIMEOUT_LOCAL_MS);
    if (info) { this._save(url); this._emit(info); return true; }
    if (this.onError) this.onError(`Could not connect to ${url}`);
    return false;
  }

  cancel() { this._cancelled = true; this._resolving = false; }

  forget() { this._clear(); this._resolving = false; this._cancelled = false; this.discover(); }

  // ── Internal ──────────────────────────────────────────────────────

  async _probe(url, timeoutMs = TIMEOUT_LAN_MS) {
    try {
      const ctrl  = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), timeoutMs);
      const res   = await fetch(url, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'get_tip_block_number', params: [] }),
        signal:  ctrl.signal,
      });
      clearTimeout(timer);
      if (!res.ok) return null;
      const data = await res.json();
      if (!data.result) return null;
      const tipBlock = parseInt(data.result, 16);

      // Try to get version + type
      let version = 'unknown', nodeType = 'full';
      try {
        const ir = await fetch(url, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'local_node_info', params: [] }),
        });
        if (ir.ok) {
          const id = await ir.json();
          version  = id.result?.version || 'unknown';
          const protos = (id.result?.protocols || []).map(p => p.name);
          if (protos.some(p => p.toLowerCase().includes('light'))) nodeType = 'light';
        }
      } catch {}

      return { url, tipBlock, version, nodeType, isLocal: url.includes('localhost') || url.includes('127.0.0.1') };
    } catch { return null; }
  }

  _emit(info) { this._resolving = false; if (this.onFound) this.onFound(info); }
  _save(url)  { try { localStorage.setItem(this.storageKey, url); } catch {} }
  _load()     { try { return localStorage.getItem(this.storageKey); } catch { return null; } }
  _clear()    { try { localStorage.removeItem(this.storageKey); } catch {} }
}

// ── CKBNodeWidget (drop-in UI) ────────────────────────────────────────────────

class CKBNodeWidget {
  constructor(containerSelector, opts = {}) {
    this.container  = typeof containerSelector === 'string'
      ? document.querySelector(containerSelector)
      : containerSelector;
    this._callbacks = {};
    this._opts      = opts;
    this.finder     = new CKBNodeFinder({
      onFound:    info => this._onFound(info),
      onPrompt:   ()   => this._showPrompt(),
      onProgress: msg  => this._setMsg(msg),
      onError:    msg  => this._showError(msg),
      storageKey: opts.storageKey,
    });
  }

  start() { this._render(); this.finder.discover(); return this; }

  on(event, cb) { this._callbacks[event] = cb; return this; }

  emit(event, data) { if (this._callbacks[event]) this._callbacks[event](data); }

  _render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="cnf-wrap" style="font-family:system-ui,sans-serif;font-size:14px;">
        <div class="cnf-bar" style="display:flex;align-items:center;gap:8px;padding:10px 14px;
          background:#111318;border:1px solid #1e2430;border-radius:10px;color:#64748b;flex-wrap:wrap;">
          <span class="cnf-dot" style="width:9px;height:9px;border-radius:50%;background:#ff8c42;
            flex-shrink:0;animation:cnf-pulse 1.5s infinite;"></span>
          <span class="cnf-msg" style="flex:1;min-width:0;">Scanning…</span>
          <button class="cnf-change" style="display:none;background:none;border:1px solid #1e2430;
            color:#64748b;cursor:pointer;font-size:12px;padding:3px 9px;border-radius:6px;">change</button>
        </div>
        <div class="cnf-prompt" style="display:none;margin-top:10px;">
          <div style="color:#94a3b8;margin-bottom:6px;font-size:13px;">
            No node found automatically. Enter your CKB node RPC URL:
          </div>
          <div style="display:flex;gap:6px;margin-bottom:6px;">
            <input class="cnf-input" type="text" placeholder="http://192.168.x.x:8114 or localhost:8114"
              style="flex:1;background:#0a0c0f;border:1px solid #1e2430;border-radius:7px;
              padding:8px 11px;color:#e2e8f0;font-size:13px;outline:none;min-width:0;">
            <button class="cnf-btn" style="background:#00c8ff;color:#0a0c0f;border:none;
              border-radius:7px;padding:8px 14px;font-weight:700;cursor:pointer;font-size:13px;
              white-space:nowrap;">Connect</button>
          </div>
          <div class="cnf-brave-note" style="display:none;background:rgba(255,140,66,.08);
            border:1px solid rgba(255,140,66,.3);border-radius:6px;padding:8px 10px;
            font-size:12px;color:#ff8c42;margin-bottom:6px;line-height:1.5;">
            🦁 <strong>Brave blocks LAN scanning</strong> — enter your node's IP directly below.
          </div>
          <div style="color:#64748b;font-size:12px;line-height:1.6;">
            Tried: <code style="color:#94a3b8">localhost:8114</code>, <code style="color:#94a3b8">:8117</code>.<br>
            Node on another machine? Enter its IP:
            e.g. <code style="color:#00c8ff">http://192.168.68.87:8114</code>
          </div>
        </div>
        <style>@keyframes cnf-pulse{0%,100%{opacity:1}50%{opacity:.3}}</style>
      </div>`;

    this.container.querySelector('.cnf-btn')
      ?.addEventListener('click', () => {
        const url = this.container.querySelector('.cnf-input').value;
        if (url) this.finder.tryUrl(url);
      });

    this.container.querySelector('.cnf-input')
      ?.addEventListener('keydown', e => {
        if (e.key === 'Enter') this.finder.tryUrl(e.target.value);
      });

    this.container.querySelector('.cnf-change')
      ?.addEventListener('click', () => {
        this.finder.cancel();
        this.finder.forget();
        this._showPrompt();
      });
  }

  _setMsg(msg) {
    const el = this.container?.querySelector('.cnf-msg');
    if (el) el.textContent = msg;
  }

  _onFound(info) {
    const dot = this.container?.querySelector('.cnf-dot');
    const msg = this.container?.querySelector('.cnf-msg');
    const btn = this.container?.querySelector('.cnf-change');
    const prm = this.container?.querySelector('.cnf-prompt');
    if (dot) { dot.style.background = '#00e5a0'; dot.style.animation = 'none'; }
    if (msg) msg.innerHTML =
      `<strong style="color:#00e5a0">${info.isLocal ? '⚡ Local' : '🌐 LAN'}</strong>`
      + `&nbsp;·&nbsp;<code style="color:#94a3b8">${info.url}</code>`
      + `&nbsp;·&nbsp;<strong style="color:#e2e8f0">block #${info.tipBlock.toLocaleString()}</strong>`
      + `&nbsp;·&nbsp;<span style="color:#64748b">${info.nodeType} · ${info.version}</span>`;
    if (btn) btn.style.display = 'inline-block';
    if (prm) prm.style.display = 'none';
    this.emit('connected', info);
  }

  _showPrompt(isBrave = false) {
    const prm = this.container?.querySelector('.cnf-prompt');
    const dot = this.container?.querySelector('.cnf-dot');
    const msg = this.container?.querySelector('.cnf-msg');
    const note = this.container?.querySelector('.cnf-brave-note');
    if (prm) prm.style.display = 'block';
    if (dot) { dot.style.background = '#ff8c42'; dot.style.animation = 'none'; }
    if (msg) msg.textContent = 'No node found on localhost — enter your node URL';
    if (note) note.style.display = isBrave ? 'block' : 'none';
  }

  _showError(msg) {
    const dot = this.container?.querySelector('.cnf-dot');
    const el  = this.container?.querySelector('.cnf-msg');
    if (dot) { dot.style.background = '#ff4560'; dot.style.animation = 'none'; }
    if (el) el.textContent = msg;
  }
}

// Export
if (typeof module !== 'undefined') module.exports = { CKBNodeFinder, CKBNodeWidget };
else { window.CKBNodeFinder = CKBNodeFinder; window.CKBNodeWidget = CKBNodeWidget; }
