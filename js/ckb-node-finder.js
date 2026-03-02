/**
 * ckb-node-finder.js
 * Discovers a local CKB RPC node in the browser.
 *
 * Strategy (in order):
 *   1. Saved URL from localStorage
 *   2. Try known local defaults (localhost ports)
 *   3. Fall back to a clean UI prompt
 *
 * Usage:
 *   const finder = new CKBNodeFinder({ onFound, onPrompt });
 *   finder.discover();
 *
 * Emits:
 *   onFound(info)  — { url, nodeType, version, tipBlock }
 *   onPrompt()     — show your "enter URL" UI, then call finder.tryUrl(url)
 *   onError(msg)   — connection tested but node returned an unexpected response
 */

'use strict';

const CKB_DEFAULTS = [
  { url: 'http://localhost:8114', label: 'CKB full node (default)' },
  { url: 'http://127.0.0.1:8114', label: 'CKB full node (127.0.0.1)' },
  { url: 'http://localhost:8117', label: 'CKB light client' },
  { url: 'http://localhost:9000',  label: 'CKB alt port' },
];

const STORAGE_KEY = 'ckb_node_finder_url';
const TIMEOUT_MS  = 3000;

class CKBNodeFinder {
  constructor({ onFound = null, onPrompt = null, onError = null, storageKey = STORAGE_KEY } = {}) {
    this.onFound     = onFound;
    this.onPrompt    = onPrompt;
    this.onError     = onError;
    this.storageKey  = storageKey;
    this._resolving  = false;
  }

  /**
   * discover() — start the auto-discovery sequence.
   * Call this on page load.
   */
  async discover() {
    if (this._resolving) return;
    this._resolving = true;

    // 1. Try saved URL first
    const saved = this._load();
    if (saved) {
      const info = await this._probe(saved);
      if (info) { this._emit(info); return; }
      // Saved URL is stale — clear it and continue
      this._clear();
    }

    // 2. Try known defaults sequentially
    for (const candidate of CKB_DEFAULTS) {
      const info = await this._probe(candidate.url);
      if (info) {
        this._save(candidate.url);
        this._emit(info);
        return;
      }
    }

    // 3. Nothing found — prompt user
    this._resolving = false;
    if (this.onPrompt) this.onPrompt();
  }

  /**
   * tryUrl(url) — called by your UI when the user submits a custom URL.
   * Returns true if successful, false otherwise.
   */
  async tryUrl(url) {
    url = url.trim().replace(/\/$/, '');
    const info = await this._probe(url);
    if (info) {
      this._save(url);
      this._emit(info);
      return true;
    }
    if (this.onError) this.onError(`Could not connect to ${url}`);
    return false;
  }

  /**
   * forget() — clear saved URL and re-run discovery.
   */
  forget() {
    this._clear();
    this._resolving = false;
    this.discover();
  }

  // ── Internal ──────────────────────────────────────────────────────

  async _probe(url) {
    try {
      const ctrl   = new AbortController();
      const timer  = setTimeout(() => ctrl.abort(), TIMEOUT_MS);

      const res = await fetch(url, {
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

      // Also grab local node info for richer metadata
      const infoRes = await fetch(url, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'local_node_info', params: [] }),
      }).catch(() => null);

      let version = 'unknown', nodeType = 'full';
      if (infoRes?.ok) {
        const infoData = await infoRes.json().catch(() => null);
        if (infoData?.result) {
          version  = infoData.result.version || 'unknown';
          const protocols = (infoData.result.protocols || []).map(p => p.name);
          if (protocols.some(p => p.toLowerCase().includes('light'))) nodeType = 'light';
        }
      }

      return { url, nodeType, version, tipBlock };

    } catch (e) {
      // AbortError = timeout, TypeError = connection refused — both mean not available
      return null;
    }
  }

  _emit(info) {
    this._resolving = false;
    if (this.onFound) this.onFound(info);
  }

  _save(url)   { try { localStorage.setItem(this.storageKey, url); } catch {} }
  _load()      { try { return localStorage.getItem(this.storageKey); } catch { return null; } }
  _clear()     { try { localStorage.removeItem(this.storageKey); } catch {} }
}

// ── Drop-in UI widget ─────────────────────────────────────────────────────────
/**
 * CKBNodeWidget — a self-contained UI component.
 * Injects a small status bar + prompt into a container element.
 *
 * Usage:
 *   const widget = new CKBNodeWidget('#node-status');
 *   widget.start();
 *   widget.on('connected', ({ url, tipBlock }) => { ... });
 */
class CKBNodeWidget {
  constructor(containerSelector, opts = {}) {
    this.container = typeof containerSelector === 'string'
      ? document.querySelector(containerSelector)
      : containerSelector;
    this._callbacks = {};
    this._opts = opts;

    this.finder = new CKBNodeFinder({
      onFound:  info => this._onFound(info),
      onPrompt: ()   => this._showPrompt(),
      onError:  msg  => this._showError(msg),
      storageKey: opts.storageKey,
    });
  }

  start() {
    this._render();
    this.finder.discover();
    return this;
  }

  on(event, cb) { this._callbacks[event] = cb; return this; }
  emit(event, data) { if (this._callbacks[event]) this._callbacks[event](data); }

  _render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="cnf-wrap" style="font-family:system-ui,sans-serif;font-size:14px;">
        <div class="cnf-status" style="display:flex;align-items:center;gap:8px;padding:8px 12px;
          background:#111318;border:1px solid #1e2430;border-radius:8px;color:#64748b;">
          <span class="cnf-dot" style="width:8px;height:8px;border-radius:50%;background:#64748b;flex-shrink:0;
            animation:cnf-pulse 1.5s infinite;"></span>
          <span class="cnf-msg">Scanning for local CKB node…</span>
          <button class="cnf-change" style="display:none;margin-left:auto;background:none;border:none;
            color:#00c8ff;cursor:pointer;font-size:12px;padding:0;">change</button>
        </div>
        <div class="cnf-prompt" style="display:none;margin-top:8px;">
          <div style="color:#e2e8f0;margin-bottom:6px;font-size:13px;">
            No node found on localhost. Enter your CKB RPC URL:
          </div>
          <div style="display:flex;gap:6px;">
            <input class="cnf-input" type="text" placeholder="http://192.168.1.x:8114"
              style="flex:1;background:#0a0c0f;border:1px solid #1e2430;border-radius:6px;
              padding:7px 10px;color:#e2e8f0;font-size:13px;outline:none;">
            <button class="cnf-connect" style="background:#00c8ff;color:#0a0c0f;border:none;
              border-radius:6px;padding:7px 14px;font-weight:600;cursor:pointer;font-size:13px;">
              Connect
            </button>
          </div>
          <div style="color:#64748b;font-size:11px;margin-top:5px;">
            Common: <code style="color:#94a3b8">localhost:8114</code> (full node) · 
            <code style="color:#94a3b8">localhost:8117</code> (light client)
          </div>
        </div>
        <style>
          @keyframes cnf-pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
        </style>
      </div>`;

    const btn = this.container.querySelector('.cnf-connect');
    if (btn) btn.addEventListener('click', () => {
      const url = this.container.querySelector('.cnf-input').value;
      if (url) this.finder.tryUrl(url);
    });

    const inp = this.container.querySelector('.cnf-input');
    if (inp) inp.addEventListener('keydown', e => {
      if (e.key === 'Enter') this.finder.tryUrl(inp.value);
    });

    const change = this.container.querySelector('.cnf-change');
    if (change) change.addEventListener('click', () => {
      this.finder.forget();
      this._showPrompt();
    });
  }

  _onFound(info) {
    const dot = this.container?.querySelector('.cnf-dot');
    const msg = this.container?.querySelector('.cnf-msg');
    const btn = this.container?.querySelector('.cnf-change');
    const prm = this.container?.querySelector('.cnf-prompt');

    if (dot) { dot.style.background = '#00e5a0'; dot.style.animation = 'none'; }
    if (msg) msg.innerHTML = `<strong style="color:#00e5a0">Connected</strong>
      &nbsp;·&nbsp;<span style="color:#94a3b8">${info.url}</span>
      &nbsp;·&nbsp;block <strong style="color:#e2e8f0">#${info.tipBlock.toLocaleString()}</strong>
      &nbsp;·&nbsp;<span style="color:#64748b">${info.nodeType} · ${info.version}</span>`;
    if (btn) btn.style.display = 'block';
    if (prm) prm.style.display = 'none';

    this.emit('connected', info);
  }

  _showPrompt() {
    const prm = this.container?.querySelector('.cnf-prompt');
    const dot = this.container?.querySelector('.cnf-dot');
    const msg = this.container?.querySelector('.cnf-msg');
    if (prm) prm.style.display = 'block';
    if (dot) { dot.style.background = '#ff8c42'; dot.style.animation = 'none'; }
    if (msg) msg.textContent = 'No local node found';
  }

  _showError(errMsg) {
    const dot = this.container?.querySelector('.cnf-dot');
    const msg = this.container?.querySelector('.cnf-msg');
    if (dot) { dot.style.background = '#ff4560'; dot.style.animation = 'none'; }
    if (msg) msg.textContent = errMsg;
  }
}

// Export for both module and browser globals
if (typeof module !== 'undefined') module.exports = { CKBNodeFinder, CKBNodeWidget };
else { window.CKBNodeFinder = CKBNodeFinder; window.CKBNodeWidget = CKBNodeWidget; }
